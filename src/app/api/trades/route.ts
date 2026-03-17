import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/utils/auth';
import { calculateBrokerageCharges, validateTradeRequest } from '@/utils/trading';
import { createBlockchainRecord } from '@/utils/blockchain';
import { getIndianStocks } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Verify token
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { type, symbol, quantity, price } = await request.json();

    // Get portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: decoded.userId },
    });

    if (!portfolio) {
      return NextResponse.json(
        { success: false, error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    // Validate trade
    const validation = validateTradeRequest(
      quantity,
      price,
      portfolio.availableBalance,
      type as 'BUY' | 'SELL'
    );

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const tradeTotal = quantity * price;
    const brokerageCharges = calculateBrokerageCharges(tradeTotal);
    const totalAmount = type === 'BUY' ? tradeTotal + brokerageCharges : tradeTotal;

    // Create trade record
    const trade = await prisma.trade.create({
      data: {
        userId: decoded.userId,
        type,
        symbol,
        quantity,
        price,
        total: tradeTotal,
        brokerageCharges,
      },
    });

    // Create blockchain record
    const blockchainRecord = createBlockchainRecord(trade.id, {
      userId: decoded.userId,
      type,
      symbol,
      quantity,
      price,
      timestamp: new Date(),
    });

    await prisma.blockchainRecord.create({
      data: {
        tradeId: trade.id,
        hash: blockchainRecord.hash,
        prevHash: blockchainRecord.prevHash,
        timestamp: blockchainRecord.timestamp,
        userId: blockchainRecord.userId,
        type: blockchainRecord.type,
        symbol: blockchainRecord.symbol,
        quantity: blockchainRecord.quantity,
        price: blockchainRecord.price,
      },
    });

    // Update portfolio
    let newHoldings = { ...portfolio };

    if (type === 'BUY') {
      newHoldings.availableBalance -= totalAmount;
      newHoldings.investedValue += tradeTotal;
    } else {
      newHoldings.availableBalance += tradeTotal;
      newHoldings.investedValue -= tradeTotal;
    }

    await prisma.portfolio.update({
      where: { userId: decoded.userId },
      data: {
        availableBalance: newHoldings.availableBalance,
        investedValue: newHoldings.investedValue,
      },
    });

    // Update or create stock holding
    const existingHolding = await prisma.stockHolding.findUnique({
      where: {
        portfolioId_symbol: {
          portfolioId: portfolio.id,
          symbol,
        },
      },
    });

    if (type === 'BUY') {
      if (existingHolding) {
        const newQuantity = existingHolding.quantity + quantity;
        const newAvgPrice =
          (existingHolding.avgBuyPrice * existingHolding.quantity + price * quantity) /
          newQuantity;

        await prisma.stockHolding.update({
          where: { id: existingHolding.id },
          data: {
            quantity: newQuantity,
            avgBuyPrice: newAvgPrice,
            totalInvestment: newQuantity * newAvgPrice,
            currentValue: newQuantity * price,
          },
        });
      } else {
        await prisma.stockHolding.create({
          data: {
            portfolioId: portfolio.id,
            symbol,
            quantity,
            avgBuyPrice: price,
            currentPrice: price,
            totalInvestment: quantity * price,
            currentValue: quantity * price,
            gainLoss: 0,
            gainLossPercent: 0,
          },
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          trade,
          blockchainHash: blockchainRecord.hash,
          portfolio: {
            availableBalance: newHoldings.availableBalance,
            investedValue: newHoldings.investedValue,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Trade execution error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to execute trade' },
      { status: 500 }
    );
  }
}

// Get user trade history
export async function GET(request: NextRequest) {
  try {
    // Verify token
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const trades = await prisma.trade.findMany({
      where: { userId: decoded.userId },
      orderBy: { executedAt: 'desc' },
      take: 50,
    });

    return NextResponse.json(
      {
        success: true,
        data: trades,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get trades error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trades' },
      { status: 500 }
    );
  }
}
