import { DollarSign } from 'lucide-react';

interface HeaderProps {
  balance: number;
}

export default function Header({ balance }: HeaderProps) {
  return (
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
  );
}