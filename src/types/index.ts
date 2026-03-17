// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  panNumber?: string;
  createdAt: Date;
}

// Portfolio Types
export interface Portfolio {
  id: string;
  userId: string;
  totalBalance: number;
  availableBalance: number;
  investedValue: number;
  totalGain: number;
  totalGainPercent: number;
}

export interface StockHolding {
  id: string;
  symbol: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalInvestment: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

// Stock Types
export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  marketCap: string;
  pe: number;
  dividend?: number;
}

// Trade Types
export interface Trade {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  quantity: number;
  price: number;
  total: number;
  brokerageCharges: number;
  tdsAmount: number;
  blockchainHash?: string;
  executedAt: Date;
}

// Blockchain Types
export interface BlockchainRecord {
  id: string;
  tradeId: string;
  hash: string;
  prevHash?: string;
  timestamp: Date;
  userId: string;
  type: string;
  symbol: string;
  quantity: number;
  price: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface TradeRequest {
  type: 'BUY' | 'SELL';
  symbol: string;
  quantity: number;
  price: number;
}

// Chart Data
export interface ChartDataPoint {
  time: string;
  value: number;
  volume?: number;
}

// Session Types
export interface Session {
  user: {
    id: string;
    email: string;
    username: string;
  };
  token: string;
  expires: Date;
}
