'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import MarketOverview from '../components/MarketOverview';
import TradingPanel from '../components/TradingPanel';
import Portfolio from '../components/Portfolio';
import TradeHistory from '../components/TradeHistory';
import Watchlist from '../components/Watchlist';
import { Trade } from '../types';

export default function Home() {
  const [balance, setBalance] = useState(100000); // Virtual money
  const [niftyValue, setNiftyValue] = useState(22000);
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [quantity, setQuantity] = useState(10);
  const [holdings, setHoldings] = useState({});
  const [niftyChange, setNiftyChange] = useState(0);
  const [trades, setTrades] = useState<Trade[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('trades');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [chartData, setChartData] = useState([]);
  const [stockPrices, setStockPrices] = useState<Record<string, number>>({
    RELIANCE: 2500,
    TCS: 3200,
    INFY: 1400,
    HDFC: 1600,
    ICICIBANK: 900
  });
  const niftyRef = useRef(22000);

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 2;
      setNiftyChange(change);
      const newValue = niftyRef.current + change * 100;
      niftyRef.current = newValue;
      setNiftyValue(newValue);
      setChartData(prev => [...prev.slice(-19), { time: new Date().toLocaleTimeString(), value: newValue }]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate stock price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStockPrices(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(stock => {
          updated[stock] += (Math.random() - 0.5) * 50;
        });
        return updated;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const executeTrade = (type: 'buy' | 'sell') => {
    const trade = {
      id: Date.now(),
      type,
      stock: selectedStock,
      quantity,
      price,
      timestamp: new Date().toISOString(),
      hash: 'blockchain_hash_' + Math.random().toString(36).substr(2, 9) // Simulate blockchain hash
    };
    setTrades(prev => [...prev, trade]);
    // Update balance
    const cost = quantity * price;
    if (type === 'buy') {
      setBalance(prev => prev - cost);
      setHoldings(prev => ({
        ...prev,
        [selectedStock]: (prev[selectedStock] || 0) + quantity
      }));
    } else {
      setBalance(prev => prev + cost);
      setHoldings(prev => ({
        ...prev,
        [selectedStock]: (prev[selectedStock] || 0) - quantity
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header balance={balance} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MarketOverview niftyValue={niftyValue} niftyChange={niftyChange} chartData={chartData} />

          <div className="space-y-6">
            <TradingPanel
              selectedStock={selectedStock}
              setSelectedStock={setSelectedStock}
              quantity={quantity}
              setQuantity={setQuantity}
              price={price}
              setPrice={setPrice}
              executeTrade={executeTrade}
              currentPrice={stockPrices[selectedStock] || 0}
            />

            <Portfolio holdings={holdings} />

            <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
          </div>
        </div>

        <TradeHistory trades={trades} />
      </main>
    </div>
  );
}
