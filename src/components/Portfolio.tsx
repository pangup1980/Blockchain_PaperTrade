interface PortfolioProps {
  holdings: Record<string, number>;
}

export default function Portfolio({ holdings }: PortfolioProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
      {Object.keys(holdings).length === 0 ? (
        <p className="text-gray-600">No holdings</p>
      ) : (
        <ul>
          {Object.entries(holdings).map(([stock, qty]) => (
            <li key={stock} className="flex justify-between py-2 border-b">
              <span className="font-medium">{stock}</span>
              <span>{qty} shares</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}