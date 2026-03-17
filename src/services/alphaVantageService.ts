import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

interface TimeSeriesData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: string;
}

// Mock data for Indian stocks (fallback when API is rate limited)
const mockIndianStocks: Record<string, { symbol: string; name: string; price: number }> = {
  RELIANCE: { symbol: 'RELIANCE.BSE', name: 'Reliance Industries', price: 2750 },
  TCS: { symbol: 'TCS.BSE', name: 'Tata Consultancy Services', price: 3450 },
  INFY: { symbol: 'INFY.BSE', name: 'Infosys', price: 1650 },
  HDFC: { symbol: 'HDFC.BSE', name: 'HDFC Bank', price: 1850 },
  ICICIBANK: { symbol: 'ICICIBANK.BSE', name: 'ICICI Bank', price: 1050 },
};

export class AlphaVantageService {
  static async getStockQuote(symbol: string): Promise<StockQuote> {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: API_KEY,
        },
      });

      const data = response.data;
      
      if (data['Global Quote']) {
        const quote = data['Global Quote'];
        return {
          symbol: symbol,
          price: parseFloat(quote['05. price'] || '0'),
          change: parseFloat(quote['09. change'] || '0'),
          changePercent: parseFloat(quote['10. change percent']?.replace('%', '') || '0'),
          timestamp: new Date().toISOString(),
        };
      }

      // Fallback mock data
      return this.getMockQuote(symbol);
    } catch (error) {
      console.error('Error fetching stock quote:', error);
      return this.getMockQuote(symbol);
    }
  }

  static async getIntraday(symbol: string, interval: string = '5min'): Promise<TimeSeriesData[]> {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol: symbol,
          interval: interval,
          outputsize: 'compact',
          apikey: API_KEY,
        },
      });

      const data = response.data;
      const timeSeriesKey = `Time Series (${interval})`;
      
      if (data[timeSeriesKey]) {
        return Object.entries(data[timeSeriesKey])
          .slice(0, 100)
          .map(([time, values]: [string, any]) => ({
            time,
            open: parseFloat(values['1. open']),
            high: parseFloat(values['2. high']),
            low: parseFloat(values['3. low']),
            close: parseFloat(values['4. close']),
            volume: values['5. volume'],
          }))
          .reverse();
      }

      return this.getMockTimeSeriesData();
    } catch (error) {
      console.error('Error fetching intraday data:', error);
      return this.getMockTimeSeriesData();
    }
  }

  static async getDailyData(symbol: string): Promise<TimeSeriesData[]> {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'TIME_SERIES_DAILY',
          symbol: symbol,
          outputsize: 'compact',
          apikey: API_KEY,
        },
      });

      const data = response.data;
      
      if (data['Time Series (Daily)']) {
        return Object.entries(data['Time Series (Daily)'])
          .slice(0, 50)
          .map(([time, values]: [string, any]) => ({
            time,
            open: parseFloat(values['1. open']),
            high: parseFloat(values['2. high']),
            low: parseFloat(values['3. low']),
            close: parseFloat(values['4. close']),
            volume: values['5. volume'],
          }))
          .reverse();
      }

      return this.getMockTimeSeriesData();
    } catch (error) {
      console.error('Error fetching daily data:', error);
      return this.getMockTimeSeriesData();
    }
  }

  static getMockQuote(symbol: string): StockQuote {
    const stock = mockIndianStocks[symbol];
    const change = (Math.random() - 0.5) * 100;
    const changePercent = (change / stock!.price) * 100;

    return {
      symbol: symbol,
      price: stock!.price + change,
      change: change,
      changePercent: changePercent,
      timestamp: new Date().toISOString(),
    };
  }

  static getMockTimeSeriesData(): TimeSeriesData[] {
    const data: TimeSeriesData[] = [];
    let basePrice = 3000;

    for (let i = 100; i >= 0; i--) {
      const date = new Date();
      date.setHours(date.getHours() - i);
      const timeStr = date.toISOString().split('T')[0];
      
      const change = (Math.random() - 0.5) * 100;
      basePrice += change;

      data.push({
        time: timeStr,
        open: basePrice,
        high: basePrice + 50,
        low: basePrice - 50,
        close: basePrice,
        volume: (Math.random() * 10000000).toString(),
      });
    }

    return data;
  }

  static getSupportedIndianStocks() {
    return Object.keys(mockIndianStocks).map(key => ({
      symbol: key,
      name: mockIndianStocks[key].name,
    }));
  }
}