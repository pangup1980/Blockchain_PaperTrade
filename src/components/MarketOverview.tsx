'use client';

import { Stock } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketOverviewProps {
  stocks: Stock[];
  onStockSelect?: (symbol: string) => void;
  selectedSymbol?: string;
}

export default function MarketOverview({
  stocks,
  onStockSelect,
  selectedSymbol,
}: MarketOverviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Market Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => onStockSelect?.(stock.symbol)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition ${
              selectedSymbol === stock.symbol
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-lg">{stock.symbol}</p>
                <p className="text-xs text-gray-500">{stock.name}</p>
              </div>
              {stock.changePercent >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </div>

            <div className="mb-2">
              <p className="text-2xl font-bold">₹{stock.price.toFixed(2)}</p>
            </div>

            <div className="flex justify-between text-sm">
              <span className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                {stock.change >= 0 ? '+' : ''}
                {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </span>
            </div>

            <div className="mt-3 pt-3 border-t text-xs text-gray-600">
              <div className="flex justify-between mb-1">
                <span>High: ₹{stock.dayHigh.toFixed(2)}</span>
                <span>Low: ₹{stock.dayLow.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>P/E: {stock.pe.toFixed(2)}</span>
                <span>Div: {stock.dividend?.toFixed(2) || 'N/A'}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
