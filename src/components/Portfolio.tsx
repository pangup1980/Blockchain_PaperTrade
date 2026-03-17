interface PortfolioProps {
  holdings: Record<string, { quantity: number, avgPrice: number }>;
  stockPrices: Record<string, number>;
}

export default function Portfolio({ holdings, stockPrices }: PortfolioProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
      {Object.keys(holdings).length === 0 ? (
        <p className="text-gray-600">No holdings</p>
      ) : (
        <ul>
          {Object.entries(holdings).map(([stock, data]) => {
            if (data.quantity === 0) return null;
            const currentPrice = stockPrices[stock] || 0;
            const currentValue = data.quantity * currentPrice;
            const invested = data.quantity * data.avgPrice;
            const pnl = currentValue - invested;
            const pnlPercent = ((currentPrice - data.avgPrice) / data.avgPrice) * 100;
            return (
              <li key={stock} className="py-2 border-b">
                <div className="flex justify-between">
                  <span className="font-medium">{stock}</span>
                  <span>{data.quantity} shares</span>
                </div>
                <div className="text-sm text-gray-600">
                  Avg Price: ₹{data.avgPrice.toFixed(2)} | Current: ₹{currentPrice.toFixed(2)}
                </div>
                <div className={`text-sm ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  P&L: ₹{pnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}