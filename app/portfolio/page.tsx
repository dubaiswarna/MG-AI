'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, AlertCircle, Target, Shield } from 'lucide-react'

export default function PortfolioPage() {
  const [positions, setPositions] = useState([
    {
      id: 1,
      symbol: 'RELIANCE',
      entryDate: '2025-11-06',
      entryPrice: 2450.50,
      currentPrice: 2520.30,
      shares: 81,
      investment: 198480.50,
      targetPrice: 3063.13,
      stopPrice: 2254.46,
      pnl: 5663.80,
      pnlPct: 2.85,
      daysHeld: 5,
      status: 'Normal',
    },
    {
      id: 2,
      symbol: 'TCS',
      entryDate: '2025-11-08',
      entryPrice: 3680.20,
      currentPrice: 3720.50,
      shares: 54,
      investment: 198730.80,
      targetPrice: 4600.25,
      stopPrice: 3385.78,
      pnl: 2176.20,
      pnlPct: 1.09,
      daysHeld: 3,
      status: 'Normal',
    },
  ])

  const portfolio = {
    totalCapital: 2000000,
    investedCapital: 397211.30,
    availableCapital: 1602788.70,
    currentValue: 405051.30,
    totalPnL: 7840.00,
    totalPnLPct: 1.97,
    activePositions: 2,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Management</h1>
          <p className="text-sm text-gray-600">Track and manage your active positions</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <SummaryCard
            title="Total Capital"
            value={`₹${(portfolio.totalCapital / 100000).toFixed(1)}L`}
            color="blue"
          />
          <SummaryCard
            title="Invested"
            value={`₹${(portfolio.investedCapital / 100000).toFixed(1)}L`}
            subtitle={`${((portfolio.investedCapital / portfolio.totalCapital) * 100).toFixed(1)}%`}
            color="purple"
          />
          <SummaryCard
            title="Available"
            value={`₹${(portfolio.availableCapital / 100000).toFixed(1)}L`}
            subtitle={`${((portfolio.availableCapital / portfolio.totalCapital) * 100).toFixed(1)}%`}
            color="gray"
          />
          <SummaryCard
            title="Current Value"
            value={`₹${(portfolio.currentValue / 100000).toFixed(1)}L`}
            color="indigo"
          />
          <SummaryCard
            title="Total P&L"
            value={`₹${(portfolio.totalPnL / 1000).toFixed(1)}K`}
            subtitle={`${portfolio.totalPnLPct >= 0 ? '+' : ''}${portfolio.totalPnLPct.toFixed(2)}%`}
            color={portfolio.totalPnL >= 0 ? 'green' : 'red'}
          />
        </div>

        {/* Active Positions */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Active Positions</h2>
              <p className="text-sm text-gray-600">{positions.length} of 10 positions used</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
              + Add Position
            </button>
          </div>

          <div className="space-y-4">
            {positions.map(position => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>

          {positions.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No Active Positions</p>
              <p className="text-sm">Generate signals and start trading to add positions</p>
            </div>
          )}
        </div>

        {/* Risk Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <RiskCard
            title="Positions"
            current={positions.length}
            max={10}
            label="Available slots"
          />
          <RiskCard
            title="Capital Deployed"
            current={((portfolio.investedCapital / portfolio.totalCapital) * 100).toFixed(0)}
            max={100}
            label="% of total capital"
            suffix="%"
          />
          <RiskCard
            title="Average P&L"
            current={positions.length > 0 ? (portfolio.totalPnLPct / positions.length).toFixed(2) : '0'}
            max={25}
            label="per position"
            suffix="%"
          />
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ title, value, subtitle, color }: {
  title: string
  value: string
  subtitle?: string
  color: string
}) {
  const colorClasses: any = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    gray: 'bg-gray-50 text-gray-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div className="bg-white rounded-lg border p-4">
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className={`text-2xl font-bold ${colorClasses[color]?.split(' ')[1] || 'text-gray-900'}`}>
        {value}
      </p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}

function PositionCard({ position }: { position: any }) {
  const isProfitable = position.pnl >= 0
  const targetReached = position.currentPrice >= position.targetPrice
  const stopHit = position.currentPrice <= position.stopPrice

  return (
    <div className={`border rounded-xl p-6 ${
      targetReached ? 'bg-green-50 border-green-300' :
      stopHit ? 'bg-red-50 border-red-300' :
      'bg-white'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{position.symbol}</h3>
          <p className="text-sm text-gray-600">
            Entry: {position.entryDate} • {position.shares} shares • Day {position.daysHeld}/25
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">₹{position.currentPrice.toFixed(2)}</p>
          <p className={`text-lg font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
            {isProfitable ? '+' : ''}₹{position.pnl.toFixed(0)} ({isProfitable ? '+' : ''}{position.pnlPct.toFixed(2)}%)
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Stop: ₹{position.stopPrice.toFixed(0)}</span>
          <span>Entry: ₹{position.entryPrice.toFixed(0)}</span>
          <span>Target: ₹{position.targetPrice.toFixed(0)}</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`absolute h-full ${isProfitable ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ 
              width: `${Math.min(Math.abs(position.pnlPct / 0.25) * 100, 100)}%`,
              left: position.pnlPct < 0 ? `${50 - Math.abs(position.pnlPct / 0.08) * 50}%` : '50%',
            }}
          ></div>
          <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-400"></div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-600">Investment</p>
          <p className="font-semibold">₹{(position.investment / 1000).toFixed(0)}K</p>
        </div>
        <div>
          <p className="text-gray-600">Current Value</p>
          <p className="font-semibold">₹{((position.shares * position.currentPrice) / 1000).toFixed(0)}K</p>
        </div>
        <div>
          <p className="text-gray-600">Target Gain</p>
          <p className="font-semibold text-green-600">₹{((position.targetPrice - position.entryPrice) * position.shares / 1000).toFixed(0)}K</p>
        </div>
        <div>
          <p className="text-gray-600">Max Loss</p>
          <p className="font-semibold text-red-600">₹{((position.entryPrice - position.stopPrice) * position.shares / 1000).toFixed(0)}K</p>
        </div>
      </div>

      {/* Alert Status */}
      {targetReached && (
        <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4 flex items-center">
          <Target className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-800 font-semibold">TARGET HIT! Consider booking profits</span>
        </div>
      )}
      {stopHit && (
        <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4 flex items-center">
          <Shield className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-800 font-semibold">STOP LOSS HIT! Exit immediately</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm">
          Close at Target
        </button>
        <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm">
          Close at Stop
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold text-sm">
          Edit
        </button>
      </div>
    </div>
  )
}

function RiskCard({ title, current, max, label, suffix = '' }: {
  title: string
  current: number | string
  max: number
  label: string
  suffix?: string
}) {
  const percentage = (Number(current) / max) * 100
  const isHigh = percentage > 80

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-1">
        {current}{suffix} <span className="text-lg text-gray-400">/ {max}{suffix}</span>
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className={`h-full rounded-full ${isHigh ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  )
}

