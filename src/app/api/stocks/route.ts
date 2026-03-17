import { NextRequest, NextResponse } from 'next/server';
import { getIndianStocks } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const stocks = getIndianStocks();

    // Add real-time mock data
    const stocksWithChange = stocks.map((stock) => ({
      ...stock,
      change: stock.change + (Math.random() - 0.5) * 10,
      changePercent: stock.changePercent + (Math.random() - 0.5) * 2,
      price: stock.price + (Math.random() - 0.5) * 50,
    }));

    return NextResponse.json(
      {
        success: true,
        data: stocksWithChange,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get stocks error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
