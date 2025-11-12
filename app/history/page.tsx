'use client'

import { useState } from 'react'
import { Calendar, Download, TrendingUp, TrendingDown, Filter } from 'lucide-react'

export default function HistoryPage() {
  const [trades, setTrades] = useState([
    {
      id: 1,
      symbol: 'WIPRO',
      entryDate: '2025-10-15',
      exitDate: '2025-11-01',
      entryPrice: 445.30,
      exitPrice: 556.63,
      shares: 449,
      investment: 199939.70,
      exitValue: 249926.87,
      pnl: 49987.17,
      pnlPct: 25.0,
      daysHeld: 17,
      exitReason: 'Target',
    },
    {
      id: 2,
      symbol: 'NBCC',
      entryDate: '2025-10-20',
      exitDate: '2025-10-28',
      entryPrice: 102.45,
      exitPrice: 94.25,
      shares: 1951,
      investment: 199879.95,
      exitValue: 183879.75,
      pnl: -16000.20,
      pnlPct: -8.0,
      daysHeld: 8,
      exitReason: 'Stop',
    },
  ])

  const stats = {
    totalTrades: trades.length,
    winningTrades: trades.filter(t => t.pnl > 0).length,
    losingTrades: trades.filter(t => t.pnl < 0).length,
    totalPnL: trades.reduce((sum, t) => sum + t.pnl, 0),
    avgPnL: trades.reduce((sum, t) => sum + t.pnl, 0) / trades.length,
    winRate: (trades.filter(t => t.pnl > 0).length / trades.length) * 100,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Trade History</h1>
              <p className="text-sm text-gray-600">Review past trades and performance</p>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <StatCard title="Total Trades" value={stats.totalTrades.toString()} />
          <StatCard title="Win Rate" value={`${stats.winRate.toFixed(0)}%`} color="green" />
          <StatCard title="Winners" value={stats.winningTrades.toString()} color="green" />
          <StatCard title="Losers" value={stats.losingTrades.toString()} color="red" />
          <StatCard 
            title="Total P&L" 
            value={`₹${(stats.totalPnL / 1000).toFixed(0)}K`}
            color={stats.totalPnL >= 0 ? 'green' : 'red'}
          />
          <StatCard 
            title="Avg P&L" 
            value={`₹${(stats.avgPnL / 1000).toFixed(1)}K`}
            color={stats.avgPnL >= 0 ? 'green' : 'red'}
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-4 mb-6 flex flex-wrap gap-4 items-center">
          <button className="flex items-center px-3 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            All Trades
          </button>
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
            This Month
          </button>
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
            Last 3 Months
          </button>
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
            Winners Only
          </button>
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
            Losers Only
          </button>
        </div>

        {/* Trade List */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prices</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Investment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">P&L</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {trades.map(trade => (
                  <TradeRow key={trade.id} trade={trade} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, color = 'blue' }: { title: string, value: string, color?: string }) {
  const colorClasses: any = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
  }

  return (
    <div className="bg-white rounded-lg border p-4">
      <p className="text-xs text-gray-600 mb-1">{title}</p>
      <p className={`text-xl font-bold ${colorClasses[color]}`}>{value}</p>
    </div>
  )
}

function TradeRow({ trade }: { trade: any }) {
  const isProfitable = trade.pnl >= 0

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="font-semibold text-gray-900">{trade.symbol}</div>
        <div className="text-xs text-gray-500">{trade.shares} shares</div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{trade.entryDate}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{trade.exitDate}</td>
      <td className="px-6 py-4">
        <div className="text-sm">₹{trade.entryPrice.toFixed(2)}</div>
        <div className="text-sm">₹{trade.exitPrice.toFixed(2)}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">₹{(trade.investment / 1000).toFixed(0)}K</div>
      </td>
      <td className="px-6 py-4">
        <div className={`font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
          {isProfitable ? '+' : ''}₹{(trade.pnl / 1000).toFixed(1)}K
        </div>
        <div className={`text-xs ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
          {isProfitable ? '+' : ''}{trade.pnlPct.toFixed(2)}%
        </div>
      </td>
      <td className="px-6 py-4 text-sm">{trade.daysHeld}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          trade.exitReason === 'Target' ? 'bg-green-100 text-green-700' :
          trade.exitReason === 'Stop' ? 'bg-red-100 text-red-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {trade.exitReason}
        </span>
      </td>
    </tr>
  )
}

