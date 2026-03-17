import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface MarketOverviewProps {
  niftyValue: number;
  niftyChange: number;
  chartData: ChartDataPoint[];
}

export default function MarketOverview({ niftyValue, niftyChange, chartData }: MarketOverviewProps) {
  return (
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
  );
}