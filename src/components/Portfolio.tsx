interface PortfolioProps {
  holdings: Record<string, { quantity: number, avgPrice: number }>;
  stockPrices: Record<string, number>;
}

export default function Portfolio({ holdings, stockPrices }: PortfolioProps) {
  const totalValue = Object.entries(holdings).reduce((sum, [stock, data]) => {
    if (data.quantity === 0) return sum;
    const currentPrice = stockPrices[stock] || 0;
    return sum + (data.quantity * currentPrice);
  }, 0);

  const totalInvested = Object.entries(holdings).reduce((sum, [stock, data]) => {
    if (data.quantity === 0) return sum;
    return sum + (data.quantity * data.avgPrice);
  }, 0);

  const totalPnL = totalValue - totalInvested;
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-blue-900">Portfolio</h2>
        <div className="text-right">
          <p className="text-sm font-semibold text-blue-700">Total Value</p>
          <p className="text-lg font-bold text-blue-900">₹{totalValue.toFixed(2)}</p>
        </div>
      </div>

      {Object.keys(holdings).length === 0 ? (
        <div className="text-center py-8">
          <div className="text-blue-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-blue-600 font-medium">No holdings yet</p>
          <p className="text-sm text-blue-500 mt-1">Start trading to build your portfolio</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(holdings).map(([stock, data]) => {
            if (data.quantity === 0) return null;
            const currentPrice = stockPrices[stock] || 0;
            const currentValue = data.quantity * currentPrice;
            const invested = data.quantity * data.avgPrice;
            const pnl = currentValue - invested;
            const pnlPercent = ((currentPrice - data.avgPrice) / data.avgPrice) * 100;
            return (
              <div key={stock} className="bg-white rounded-lg p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-bold text-blue-900 text-lg">{stock}</span>
                    <span className="text-sm text-blue-600 ml-2">{data.quantity} shares</span>
                  </div>
                  <div className={`text-right ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <p className="font-bold">₹{pnl.toFixed(2)}</p>
                    <p className="text-sm">({pnlPercent.toFixed(2)}%)</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700 font-medium">Avg Price</p>
                    <p className="text-blue-900">₹{data.avgPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">Current</p>
                    <p className="text-blue-900">₹{currentPrice.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-100">
                  <p className="text-sm text-blue-700 font-medium">Current Value: <span className="font-bold text-blue-900">₹{currentValue.toFixed(2)}</span></p>
                </div>
              </div>
            );
          })}

          {totalInvested > 0 && (
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-4 border border-blue-300 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-blue-800">Total P&L</p>
                  <p className="text-sm text-blue-600">Invested: ₹{totalInvested.toFixed(2)}</p>
                </div>
                <div className={`text-right ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <p className="font-bold text-lg">₹{totalPnL.toFixed(2)}</p>
                  <p className="text-sm">({totalPnLPercent.toFixed(2)}%)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}