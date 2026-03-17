interface TradingPanelProps {
  selectedStock: string;
  setSelectedStock: (stock: string) => void;
  quantity: number;
  setQuantity: (qty: number) => void;
  price: number;
  setPrice: (price: number) => void;
  executeTrade: (type: 'buy' | 'sell') => void;
  currentPrice: number;
  orderType: 'market' | 'limit';
  setOrderType: (type: 'market' | 'limit') => void;
}

export default function TradingPanel({
  selectedStock,
  setSelectedStock,
  quantity,
  setQuantity,
  price,
  setPrice,
  executeTrade,
  currentPrice,
  orderType,
  setOrderType
}: TradingPanelProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-6 text-blue-900">Trade Panel</h2>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-2">Order Type</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as 'market' | 'limit')}
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          >
            <option value="market">Market Order</option>
            <option value="limit">Limit Order</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-2">Stock Symbol</label>
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          >
            <option>RELIANCE</option>
            <option>TCS</option>
            <option>INFY</option>
            <option>HDFC</option>
            <option>ICICIBANK</option>
          </select>
          <p className="text-sm text-blue-600 mt-2 font-medium">Current Price: ₹{currentPrice.toFixed(2)}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            disabled={orderType === 'market'}
            step="0.01"
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm disabled:bg-blue-50 disabled:text-blue-400"
          />
          {orderType === 'market' && <p className="text-sm text-blue-600 mt-2 font-medium">Will use current market price</p>}
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 shadow-sm">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Total Value</p>
          <p className="text-2xl font-bold text-blue-900">₹{(orderType === 'market' ? quantity * currentPrice : quantity * price).toFixed(2)}</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => executeTrade('buy')}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            BUY
          </button>
          <button
            onClick={() => executeTrade('sell')}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            SELL
          </button>
        </div>
      </div>
    </div>
  );
}