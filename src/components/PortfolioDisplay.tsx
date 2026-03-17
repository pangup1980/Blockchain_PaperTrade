'use client';

import { Portfolio, StockHolding } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PortfolioDisplayProps {
  portfolio?: Portfolio;
  holdings?: StockHolding[];
}

export default function PortfolioDisplay({ portfolio, holdings = [] }: PortfolioDisplayProps) {
  if (!portfolio) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">No portfolio data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Portfolio Summary</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Total Balance</p>
          <p className="text-2xl font-bold text-blue-600">₹{portfolio.totalBalance?.toFixed(2)}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Available Balance</p>
          <p className="text-2xl font-bold text-green-600">
            ₹{portfolio.availableBalance?.toFixed(2)}
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Invested Value</p>
          <p className="text-2xl font-bold text-purple-600">₹{portfolio.investedValue?.toFixed(2)}</p>
        </div>

        <div className={portfolio.totalGain >= 0 ? 'bg-green-50' : 'bg-red-50'} className="p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Total Gain</p>
          <p
            className={`text-2xl font-bold flex items-center gap-2 ${
              portfolio.totalGain >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {portfolio.totalGain >= 0 ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            ₹{Math.abs(portfolio.totalGain)?.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Holdings */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Holdings</h3>
        {holdings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No holdings yet. Start trading to build your portfolio!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Symbol</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Qty</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Avg Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Current Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Value</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">{holding.symbol}</td>
                    <td className="px-4 py-3">{holding.quantity}</td>
                    <td className="px-4 py-3">₹{holding.avgBuyPrice.toFixed(2)}</td>
                    <td className="px-4 py-3">₹{holding.currentPrice.toFixed(2)}</td>
                    <td className="px-4 py-3 font-semibold">₹{holding.currentValue?.toFixed(2)}</td>
                    <td
                      className={`px-4 py-3 font-semibold flex items-center gap-2 ${
                        holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {holding.gainLoss >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      ₹{holding.gainLoss?.toFixed(2)} ({holding.gainLossPercent?.toFixed(2)}%)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
