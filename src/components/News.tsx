import { Rss, TrendingUp } from 'lucide-react';

export default function News() {
  const newsItems = [
    { title: 'Nifty 50 hits new high', summary: 'Indian market surges amidst positive global cues...', time: '2 hours ago', category: 'Market' },
    { title: 'Reliance shares up 5%', summary: 'Strong quarterly results drive investor sentiment...', time: '4 hours ago', category: 'Stock' },
    { title: 'TCS announces buyback', summary: 'Company to return cash to shareholders...', time: '6 hours ago', category: 'Corporate' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
        <Rss className="h-6 w-6 mr-2 text-blue-600" />
        Market News
      </h2>
      <div className="space-y-4">
        {newsItems.map((news, index) => (
          <div key={index} className="p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-blue-900 text-sm line-clamp-2 flex-1">{news.title}</h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full whitespace-nowrap uppercase tracking-wide">
                {news.category}
              </span>
            </div>
            <p className="text-sm text-blue-700 line-clamp-2 mb-3">{news.summary}</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-blue-500 font-medium">{news.time}</p>
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline">
                Read more →
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
        <TrendingUp className="h-4 w-4" />
        View All News
      </button>
    </div>
  );
}