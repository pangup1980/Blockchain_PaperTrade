import { DollarSign, TrendingUp } from 'lucide-react';

interface HeaderProps {
  balance: number;
}

export default function Header({ balance }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-lg border-b-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <TrendingUp className="h-6 w-6 text-blue-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Blockchain Paper Trade</h1>
              <p className="text-xs text-blue-100">Real-time Indian Stock Market</p>
            </div>
            <span className="text-blue-200 text-sm ml-4 px-3 py-1 bg-blue-800 rounded-full">Paper Trading</span>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-right">
              <p className="text-blue-100 text-sm font-medium">Virtual Balance</p>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                <span className="text-2xl font-bold">₹{balance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}