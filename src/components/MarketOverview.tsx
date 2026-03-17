import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import AdvancedChart from './AdvancedChart';

interface MarketOverviewProps {
  niftyValue: number;
  niftyChange: number;
  chartData: any[];
  loading?: boolean;
}

export default function MarketOverview({ niftyValue, niftyChange, chartData, loading = false }: MarketOverviewProps) {
  const isPositive = niftyChange >= 0;

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-blue-900">NIFTY 50 Index</h3>
            <p className="text-sm text-blue-600 font-medium">National Stock Exchange</p>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
            <Activity className={`h-4 w-4 ${isPositive ? 'text-green-600' : 'text-red-600'} animate-pulse`} />
            <span className="text-xs font-semibold text-blue-700">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
            <p className="text-3xl font-bold text-blue-900">{loading ? '...' : niftyValue.toFixed(2)}</p>
            <p className="text-sm text-blue-600 mt-1 font-medium">Current Price</p>
          </div>
          <div className={`p-4 rounded-lg flex items-center justify-center shadow-sm ${isPositive ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="text-center">
              {isPositive ? <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-1" /> : <TrendingDown className="h-6 w-6 text-red-600 mx-auto mb-1" />}
              <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {loading ? '...' : `${isPositive ? '+' : ''}${niftyChange.toFixed(2)}%`}
              </p>
              <p className="text-xs text-gray-600 font-medium">24h Change</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-blue-800">Last Update</p>
            <p className="text-sm text-blue-600 mt-2 font-medium">{new Date().toLocaleTimeString('en-IN')}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-bold mb-4 text-blue-900">NIFTY 50 Candlestick Chart</h2>
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-4 border border-blue-100 shadow-inner">
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-blue-600 font-medium">Loading chart data...</p>
              </div>
            </div>
          ) : chartData && chartData.length > 0 ? (
            <AdvancedChart data={chartData} symbol="NIFTY" height={400} />
          ) : (
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <p className="text-blue-600 font-medium">No chart data available</p>
                <p className="text-sm text-blue-500 mt-2">Please check your connection</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}