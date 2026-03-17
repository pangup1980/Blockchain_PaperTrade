import { Newspaper } from 'lucide-react';

export default function News() {
  const newsItems = [
    { title: 'Nifty 50 hits new high', summary: 'Indian market surges...', time: '2 hours ago' },
    { title: 'Reliance shares up 5%', summary: 'Strong quarterly results...', time: '4 hours ago' },
    { title: 'TCS announces buyback', summary: 'Company to return cash to shareholders...', time: '6 hours ago' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Newspaper className="h-5 w-5 mr-2" />
        Market News
      </h2>
      <ul>
        {newsItems.map((news, index) => (
          <li key={index} className="mb-4 pb-4 border-b last:border-b-0">
            <h3 className="font-medium">{news.title}</h3>
            <p className="text-sm text-gray-600">{news.summary}</p>
            <p className="text-xs text-gray-500">{news.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}