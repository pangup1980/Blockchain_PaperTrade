import { History } from 'lucide-react';
import { Trade } from '../types';

interface TradeHistoryProps {
  trades: Trade[];
}

export default function TradeHistory({ trades }: TradeHistoryProps) {
  return (
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
  );
}