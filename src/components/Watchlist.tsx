import { Star } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
      <ul>
        {watchlist.map(stock => (
          <li key={stock} className="flex justify-between items-center py-2 border-b">
            <span>{stock}</span>
            <button onClick={() => removeFromWatchlist(stock)} className="text-red-500">
              <Star className="h-4 w-4 fill-current" />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <select onChange={(e) => addToWatchlist(e.target.value)} className="border rounded p-1">
          <option>Add stock</option>
          <option>INFY</option>
          <option>HDFC</option>
          <option>ICICIBANK</option>
        </select>
      </div>
    </div>
  );
}