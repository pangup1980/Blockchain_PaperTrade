'use client';

import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, History } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Trade {
  id: number;
  type: 'buy' | 'sell';
  stock: string;
  quantity: number;
  price: number;
  timestamp: string;
  hash: string;
}

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

  // Save trades to localStorage
  useEffect(() => {
    localStorage.setItem('trades', JSON.stringify(trades));
  }, [trades]);

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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Blockchain Paper Trade</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span className="ml-1 text-lg font-semibold">₹{balance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">NIFTY 50</h3>
                  <p className="text-3xl font-bold">{niftyValue.toFixed(2)}</p>
                  <p className={`flex items-center ${niftyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {niftyChange >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {niftyChange.toFixed(2)}%
                  </p>
                </div>
                <BarChart3 className="h-16 w-16 text-blue-500" />
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">NIFTY 50 Chart</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Trade</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <select value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    <option>RELIANCE</option>
                    <option>TCS</option>
                    <option>INFY</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => executeTrade('buy')}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => executeTrade('sell')}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Sell
                  </button>
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
              {Object.keys(holdings).length === 0 ? (
                <p className="text-gray-600">No holdings</p>
              ) : (
                <ul>
                  {Object.entries(holdings).map(([stock, qty]) => (
                    <li key={stock} className="flex justify-between">
                      <span>{stock}</span>
                      <span>{qty} shares</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Trade History */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <History className="h-5 w-5 mr-2" />
            Trade History (Blockchain Recorded)
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Stock</th>
                  <th className="text-left py-2">Quantity</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Blockchain Hash</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade: Trade) => (
                  <tr key={trade.id} className="border-b">
                    <td className={`py-2 ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>{trade.type.toUpperCase()}</td>
                    <td className="py-2">{trade.stock}</td>
                    <td className="py-2">{trade.quantity}</td>
                    <td className="py-2">₹{trade.price}</td>
                    <td className="py-2 text-xs font-mono">{trade.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
