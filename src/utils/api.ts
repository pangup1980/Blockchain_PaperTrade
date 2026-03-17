const API_KEY = 'LO4VHFB7211C8BHH';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

export interface TimeSeries {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Fetch real-time stock quote
export async function fetchStockQuote(symbol: string): Promise<StockQuote | null> {
  try {
    const response = await fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data['Global Quote'] && data['Global Quote']['05. price']) {
      const quote = data['Global Quote'];
      return {
        symbol,
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        timestamp: new Date().toISOString()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    return null;
  }
}

// Fetch intraday time series data
export async function fetchIntradayData(symbol: string): Promise<TimeSeries[]> {
  try {
    const response = await fetch(`${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`);
    const data = await response.json();

    const timeSeries = data['Time Series (5min)'];
    if (!timeSeries) return [];

    const result: TimeSeries[] = [];
    let count = 0;
    for (const timestamp in timeSeries) {
      if (count >= 20) break; // Get last 20 data points
      const point = timeSeries[timestamp];
      result.unshift({
        timestamp,
        open: parseFloat(point['1. open']),
        high: parseFloat(point['2. high']),
        low: parseFloat(point['3. low']),
        close: parseFloat(point['4. close']),
        volume: parseInt(point['5. volume'])
      });
      count++;
    }
    return result;
  } catch (error) {
    console.error('Error fetching intraday data:', error);
    return [];
  }
}

// Fetch daily time series data
export async function fetchDailyData(symbol: string): Promise<TimeSeries[]> {
  try {
    const response = await fetch(`${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();

    const timeSeries = data['Time Series (Daily)'];
    if (!timeSeries) return [];

    const result: TimeSeries[] = [];
    let count = 0;
    for (const timestamp in timeSeries) {
      if (count >= 30) break; // Get last 30 days
      const point = timeSeries[timestamp];
      result.unshift({
        timestamp,
        open: parseFloat(point['1. open']),
        high: parseFloat(point['2. high']),
        low: parseFloat(point['3. low']),
        close: parseFloat(point['4. close']),
        volume: parseInt(point['5. volume'])
      });
      count++;
    }
    return result;
  } catch (error) {
    console.error('Error fetching daily data:', error);
    return [];
  }
}

// Mock fallback data for development
export function getMockStockPrices(): Record<string, number> {
  return {
    RELIANCE: 2450 + Math.random() * 100,
    TCS: 3180 + Math.random() * 100,
    INFY: 1380 + Math.random() * 100,
    HDFC: 1580 + Math.random() * 100,
    ICICIBANK: 880 + Math.random() * 100
  };
}
