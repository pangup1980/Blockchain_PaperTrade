export interface Trade {
  id: number;
  type: 'buy' | 'sell';
  stock: string;
  quantity: number;
  price: number;
  timestamp: string;
  hash: string;
}

export interface ChartDataPoint {
  time: string;
  value: number;
}