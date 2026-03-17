'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import MarketOverview from '../components/MarketOverview';
import TradingPanel from '../components/TradingPanel';
import Portfolio from '../components/Portfolio';
import TradeHistory from '../components/TradeHistory';
import Watchlist from '../components/Watchlist';
import News from '../components/News';
import { Trade, ChartDataPoint } from '../types';
import { AlphaVantageService } from '../services/alphaVantageService';

export default function Home() {
  const [balance, setBalance] = useState(100000); // Virtual money
  const [niftyValue, setNiftyValue] = useState(22000);
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [quantity, setQuantity] = useState(10);
  const [price, setPrice] = useState(2500);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [holdings, setHoldings] = useState<Record<string, { quantity: number, avgPrice: number }>>({});
  const [niftyChange, setNiftyChange] = useState(0);
  const [trades, setTrades] = useState<Trade[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('trades');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [stockPrices, setStockPrices] = useState<Record<string, number>>({
    RELIANCE: 2500,
    TCS: 3200,
    INFY: 1400,
    HDFC: 1600,
    ICICIBANK: 900
  });
  const [watchlist, setWatchlist] = useState<string[]>(['RELIANCE', 'TCS']);
  const [loading, setLoading] = useState(true);
  const niftyRef = useRef(22000);

  // Fetch real-time data from Alpha Vantage
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        // Fetch NIFTY quote
        const quote = await AlphaVantageService.getStockQuote('NSE:NIFTYBEES');
        setNiftyValue(quote.price);
        setNiftyChange(quote.changePercent);
        
        // Fetch intraday data for chart
        const intradayData = await AlphaVantageService.getIntraday('NSE:NIFTYBEES', '1min');
        setChartData(intradayData);
        
        // Fetch stock prices
        const stocks = ['RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICIBANK'];
        const prices: Record<string, number> = {};
        for (const stock of stocks) {
          const stockQuote = await AlphaVantageService.getStockQuote(stock);
          prices[stock] = stockQuote.price;
        }
        setStockPrices(prices);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  const executeTrade = (type: 'buy' | 'sell') => {
    const actualPrice = orderType === 'market' ? stockPrices[selectedStock] : price;
    const trade = {
      id: Date.now(),
      type,
      stock: selectedStock,
      quantity,
      price: actualPrice,
      timestamp: new Date().toISOString(),
      hash: 'blockchain_hash_' + Math.random().toString(36).substr(2, 9) // Simulate blockchain hash
    };
    setTrades(prev => [...prev, trade]);
    // Update balance
    const cost = quantity * actualPrice;
    if (type === 'buy') {
      setBalance(prev => prev - cost);
      setHoldings(prev => {
        const current = prev[selectedStock] || { quantity: 0, avgPrice: 0 };
        const totalQuantity = current.quantity + quantity;
        const totalCost = current.quantity * current.avgPrice + cost;
        const newAvgPrice = totalCost / totalQuantity;
        return {
          ...prev,
          [selectedStock]: { quantity: totalQuantity, avgPrice: newAvgPrice }
        };
      });
    } else {
      setBalance(prev => prev + cost);
      setHoldings(prev => {
        const current = prev[selectedStock] || { quantity: 0, avgPrice: 0 };
        if (current.quantity >= quantity) {
          return {
            ...prev,
            [selectedStock]: { ...current, quantity: current.quantity - quantity }
          };
        }
        return prev;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header balance={balance} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <MarketOverview niftyValue={niftyValue} niftyChange={niftyChange} chartData={chartData} loading={loading} />

          <div className="lg:col-span-2 space-y-6">
            <TradingPanel
              selectedStock={selectedStock}
              setSelectedStock={setSelectedStock}
              quantity={quantity}
              setQuantity={setQuantity}
              price={price}
              setPrice={setPrice}
              executeTrade={executeTrade}
              currentPrice={stockPrices[selectedStock] || 0}
              orderType={orderType}
              setOrderType={setOrderType}
            />

            <Portfolio holdings={holdings} stockPrices={stockPrices} />
          </div>

          <div className="space-y-6">
            <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
            <News />
          </div>
        </div>

        <TradeHistory trades={trades} />
      </main>
    </div>
  );
}
