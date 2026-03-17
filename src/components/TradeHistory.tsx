'use client';

import { Trade } from '@/types';
import { ArrowUpRight, ArrowDownLeft, Shield } from 'lucide-react';

interface TradeHistoryProps {
  trades?: Trade[];
  loading?: boolean;
}

export default function TradeHistory({ trades = [], loading = false }: TradeHistoryProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-500">Loading trade history...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Trade History</h2>

      {trades.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No trades yet. Start trading to see your history!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Symbol</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Brokerage</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Blockchain</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <tr key={trade.id || index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {trade.type === 'BUY' ? (
                        <ArrowUpRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowDownLeft className="w-5 h-5 text-red-600" />
                      )}
                      <span className="font-semibold">
                        {trade.type === 'BUY' ? 'BUY' : 'SELL'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold">{trade.symbol}</td>
                  <td className="px-4 py-3">{trade.quantity}</td>
                  <td className="px-4 py-3">₹{trade.price.toFixed(2)}</td>
                  <td className="px-4 py-3 font-semibold">₹{trade.total.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    ₹{trade.brokerageCharges.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    {trade.blockchainHash ? (
                      <div
                        className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-xs"
                        title={`Hash: ${trade.blockchainHash}`}
                      >
                        <Shield className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-600 font-mono truncate max-w-xs">
                          {trade.blockchainHash.substring(0, 8)}...
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {trade.executedAt
                      ? new Date(trade.executedAt).toLocaleDateString()
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
