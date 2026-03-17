'use client';

import { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TradingPanelProps {
  symbol?: string;
  price?: number;
  balance?: number;
  onTrade?: (type: 'BUY' | 'SELL', quantity: number, price: number) => Promise<void>;
  loading?: boolean;
}

export default function TradingPanel({
  symbol = 'RELIANCE',
  price = 0,
  balance = 100000,
  onTrade,
  loading = false,
}: TradingPanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [customPrice, setCustomPrice] = useState(price);

  const totalCost = quantity * customPrice;
  const brokerage = totalCost * 0.001; // 0.1%
  const totalAmount = tradeType === 'BUY' ? totalCost + brokerage : totalCost - brokerage;

  const handleTrade = async () => {
    if (!onTrade) return;
    try {
      await onTrade(tradeType, quantity, customPrice);
      setQuantity(1);
    } catch (error) {
      console.error('Trade error:', error);
    }
  };

  const canTrade = tradeType === 'BUY' ? totalAmount <= balance : quantity > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Trade {symbol}</h2>

      {/* Trade Type Selector */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTradeType('BUY')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
            tradeType === 'BUY'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ArrowUpRight className="w-5 h-5" />
          BUY
        </button>
        <button
          onClick={() => setTradeType('SELL')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
            tradeType === 'SELL'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ArrowDownLeft className="w-5 h-5" />
          SELL
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price per Share
          </label>
          <input
            type="number"
            value={customPrice}
            onChange={(e) => setCustomPrice(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            step="0.01"
            min="0"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Value:</span>
          <span className="font-semibold">₹{totalCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Brokerage (0.1%):</span>
          <span className="font-semibold">₹{brokerage.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between">
          <span className="font-semibold">Total {tradeType === 'BUY' ? 'Cost' : 'Amount'}:</span>
          <span className="font-bold text-lg">₹{totalAmount.toFixed(2)}</span>
        </div>

        <div className="pt-2 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Available Balance:</span>
            <span className={balance >= totalAmount ? 'text-green-600' : 'text-red-600'}>
              ₹{balance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Trade Button */}
      <button
        onClick={handleTrade}
        disabled={loading || !canTrade}
        className={`w-full py-3 rounded-lg font-bold text-white transition ${
          tradeType === 'BUY'
            ? 'bg-green-500 hover:bg-green-600 disabled:bg-gray-400'
            : 'bg-red-500 hover:bg-red-600 disabled:bg-gray-400'
        }`}
      >
        {loading ? 'Processing...' : `${tradeType} ${symbol}`}
      </button>

      {!canTrade && (
        <p className="text-center text-red-600 text-sm mt-3">
          {tradeType === 'BUY'
            ? 'Insufficient balance'
            : 'Cannot sell more than available'}
        </p>
      )}
    </div>
  );
}
