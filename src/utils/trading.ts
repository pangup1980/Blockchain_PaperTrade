// Trading calculations utilities

const BROKERAGE_RATE = 0.001; // 0.1%
const TDS_RATE = 0.01; // 1%

export const calculateBrokerageCharges = (tradeAmount: number): number => {
  const charges = tradeAmount * BROKERAGE_RATE;
  return Math.round(charges * 100) / 100; // Round to 2 decimal places
};

export const calculateTDS = (profit: number): number => {
  if (profit <= 0) return 0;
  const tds = profit * TDS_RATE;
  return Math.round(tds * 100) / 100;
};

export const calculateTradeTotal = (quantity: number, price: number): number => {
  return quantity * price;
};

export const calculateGainLoss = (
  buyPrice: number,
  currentPrice: number,
  quantity: number
): { gainLoss: number; gainLossPercent: number } => {
  const gainLoss = (currentPrice - buyPrice) * quantity;
  const gainLossPercent = ((currentPrice - buyPrice) / buyPrice) * 100;
  
  return {
    gainLoss: Math.round(gainLoss * 100) / 100,
    gainLossPercent: Math.round(gainLossPercent * 100) / 100,
  };
};

export const calculatePortfolioMetrics = (
  holdings: Array<{
    quantity: number;
    avgBuyPrice: number;
    currentPrice: number;
  }>
) => {
  let totalInvestment = 0;
  let currentValue = 0;

  holdings.forEach((holding) => {
    totalInvestment += holding.quantity * holding.avgBuyPrice;
    currentValue += holding.quantity * holding.currentPrice;
  });

  const totalGain = currentValue - totalInvestment;
  const totalGainPercent = (totalGain / totalInvestment) * 100;

  return {
    totalInvestment: Math.round(totalInvestment * 100) / 100,
    currentValue: Math.round(currentValue * 100) / 100,
    totalGain: Math.round(totalGain * 100) / 100,
    totalGainPercent: Math.round(totalGainPercent * 100) / 100,
  };
};

export const validateTradeRequest = (
  quantity: number,
  price: number,
  availableBalance: number,
  type: 'BUY' | 'SELL'
): { valid: boolean; error?: string } => {
  if (quantity <= 0) {
    return { valid: false, error: 'Quantity must be greater than 0' };
  }

  if (price <= 0) {
    return { valid: false, error: 'Price must be greater than 0' };
  }

  if (type === 'BUY') {
    const totalCost = quantity * price + calculateBrokerageCharges(quantity * price);
    if (totalCost > availableBalance) {
      return { valid: false, error: 'Insufficient balance' };
    }
  }

  return { valid: true };
};
