'use client'

import { useState } from 'react'
import { Search, TrendingUp, Activity, Download, RefreshCw } from 'lucide-react'

export default function SignalsPage() {
  const [loading, setLoading] = useState(false)
  const [minConfidence, setMinConfidence] = useState(70)
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
  const [signals, setSignals] = useState<any[]>([])

  const TOP_STOCKS = [
    'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK',
    'HINDUNILVR', 'BHARTIARTL', 'KOTAKBANK', 'ITC', 'LT',
    'ASIANPAINT', 'BAJFINANCE', 'MARUTI', 'HCLTECH', 'TITAN',
    'SUNPHARMA', 'ULTRACEMCO', 'M&M', 'NTPC', 'TATASTEEL'
  ]

  const handleGenerateSignals = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/signals/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stocks: selectedStocks.length > 0 ? selectedStocks : TOP_STOCKS,
          minConfidence,
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        setSignals(data.signals || [])
      }
    } catch (error) {
      console.error('Error generating signals:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleStock = (stock: string) => {
    setSelectedStocks(prev => 
      prev.includes(stock) 
        ? prev.filter(s => s !== stock)
        : [...prev, stock]
    )
  }

  const selectAll = () => {
    setSelectedStocks(TOP_STOCKS)
  }

  const clearAll = () => {
    setSelectedStocks([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Signal Generation</h1>
          <p className="text-sm text-gray-600">AI-Powered Trading Signals with 70%+ Confidence</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Settings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-4">
              <h2 className="font-bold text-lg mb-4">Settings</h2>
              
              {/* Confidence Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Confidence: {minConfidence}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="90"
                  value={minConfidence}
                  onChange={(e) => setMinConfidence(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50%</span>
                  <span>90%</span>
                </div>
              </div>

              {/* Stock Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Stocks
                </label>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={selectAll}
                    className="flex-1 px-3 py-2 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearAll}
                    className="flex-1 px-3 py-2 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100"
                  >
                    Clear
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {TOP_STOCKS.map(stock => (
                    <label key={stock} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStocks.includes(stock)}
                        onChange={() => toggleStock(stock)}
                        className="mr-2"
                      />
                      <span className="text-sm">{stock}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {selectedStocks.length || TOP_STOCKS.length} stocks
                </p>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateSignals}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Generate Signals
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Content - Signals */}
          <div className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <StatsCard
                title="Signals Found"
                value={signals.length.toString()}
                icon={<Activity className="w-5 h-5 text-blue-600" />}
              />
              <StatsCard
                title="Avg Confidence"
                value={signals.length > 0 
                  ? `${(signals.reduce((acc, s) => acc + s.hybridConfidence, 0) / signals.length).toFixed(1)}%`
                  : '0%'
                }
                icon={<TrendingUp className="w-5 h-5 text-green-600" />}
              />
              <StatsCard
                title="Stocks Scanned"
                value={(selectedStocks.length || TOP_STOCKS.length).toString()}
                icon={<Search className="w-5 h-5 text-purple-600" />}
              />
            </div>

            {/* Signals List */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">High-Confidence Signals</h2>
                {signals.length > 0 && (
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                    <Download className="w-4 h-4 mr-1" />
                    Export CSV
                  </button>
                )}
              </div>

              {signals.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Signals Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Click "Generate Signals" to scan {selectedStocks.length || TOP_STOCKS.length} stocks
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {signals.map((signal, idx) => (
                    <SignalCard key={idx} signal={signal} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  )
}

function SignalCard({ signal }: { signal: any }) {
  const confidenceColor = signal.hybridConfidence >= 80 ? 'bg-green-100 text-green-700' :
                          signal.hybridConfidence >= 70 ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'

  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{signal.symbol}</h3>
          <p className="text-sm text-gray-600">₹{signal.currentPrice?.toFixed(2)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${confidenceColor}`}>
          {signal.hybridConfidence?.toFixed(1)}% Confidence
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-600">Entry</p>
          <p className="font-semibold">₹{signal.currentPrice?.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Target (+25%)</p>
          <p className="font-semibold text-green-600">₹{signal.targetPrice?.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Stop (-8%)</p>
          <p className="font-semibold text-red-600">₹{signal.stopPrice?.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Trend</p>
          <p className={`font-semibold ${signal.trend === 'Bullish' ? 'text-green-600' : 'text-red-600'}`}>
            {signal.trend}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">AI: {signal.aiConfidence?.toFixed(1)}%</span>
          <span className="text-gray-600">Tech: {signal.techScore?.toFixed(1)}%</span>
          <span className="text-gray-600">RSI: {signal.rsi?.toFixed(1)}</span>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm">
          Add to Portfolio
        </button>
      </div>
    </div>
  )
}

