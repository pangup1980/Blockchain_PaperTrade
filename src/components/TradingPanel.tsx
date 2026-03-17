import { useState } from 'react';

interface TradingPanelProps {
  selectedStock: string;
  setSelectedStock: (stock: string) => void;
  quantity: number;
  setQuantity: (qty: number) => void;
  price: number;
  setPrice: (price: number) => void;
  executeTrade: (type: 'buy' | 'sell') => void;
  currentPrice: number;
  orderType: 'market' | 'limit';
  setOrderType: (type: 'market' | 'limit') => void;
}

export default function TradingPanel({
  selectedStock,
  setSelectedStock,
  quantity,
  setQuantity,
  price,
  setPrice,
  executeTrade,
  currentPrice,
  orderType,
  setOrderType
}: TradingPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Trade</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Order Type</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as 'market' | 'limit')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="market">Market</option>
            <option value="limit">Limit</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option>RELIANCE</option>
            <option>TCS</option>
            <option>INFY</option>
            <option>HDFC</option>
            <option>ICICIBANK</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">Current Price: ₹{currentPrice}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            disabled={orderType === 'market'}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm disabled:bg-gray-100"
          />
          {orderType === 'market' && <p className="text-sm text-gray-500 mt-1">Will use current market price</p>}
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
  );
}