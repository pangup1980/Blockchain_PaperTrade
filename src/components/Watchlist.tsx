import { Star, Trash2 } from 'lucide-react';

interface WatchlistProps {
  watchlist: string[];
  setWatchlist: (list: string[]) => void;
}

export default function Watchlist({ watchlist, setWatchlist }: WatchlistProps) {
  const addToWatchlist = (stock: string) => {
    if (!watchlist.includes(stock)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  const removeFromWatchlist = (stock: string) => {
    setWatchlist(watchlist.filter(s => s !== stock));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
        <Star className="h-6 w-6 mr-2 text-amber-500" />
        Watchlist
      </h2>

      {watchlist.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-blue-400 mb-3">
            <Star className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </Star>
          </div>
          <p className="text-blue-600 font-medium">Your watchlist is empty</p>
          <p className="text-sm text-blue-500 mt-1">Add stocks to track their performance</p>
        </div>
      ) : (
        <ul className="space-y-3 mb-6">
          {watchlist.map(stock => (
            <li key={stock} className="flex justify-between items-center p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200">
              <span className="font-semibold text-blue-900">{stock}</span>
              <button
                onClick={() => removeFromWatchlist(stock)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                title="Remove from watchlist"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-blue-200 pt-4">
        <select
          onChange={(e) => {
            if (e.target.value) addToWatchlist(e.target.value);
            e.target.value = '';
          }}
          className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm text-blue-900 font-medium"
        >
          <option value="">+ Add stock to watchlist</option>
          {['RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICIBANK'].filter(s => !watchlist.includes(s)).map(stock => (
            <option key={stock} value={stock}>{stock}</option>
          ))}
        </select>
      </div>
    </div>
  );
}