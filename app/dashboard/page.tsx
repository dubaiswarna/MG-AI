'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Briefcase, 
  Activity,
  ArrowRight,
  RefreshCw
} from 'lucide-react'

export default function DashboardPage() {
  const [portfolio, setPortfolio] = useState({
    totalCapital: 2000000,
    investedCapital: 400000,
    availableCapital: 1600000,
    currentValue: 450000,
    totalPnL: 50000,
    totalPnLPct: 2.5,
    todayPnL: 5000,
    activePositions: 2,
  })

  const [positions, setPositions] = useState([
    {
      id: 1,
      symbol: 'RELIANCE',
      entryPrice: 2450.50,
      currentPrice: 2520.30,
      shares: 81,
      investment: 198480.50,
      currentValue: 204144.30,
      pnl: 5663.80,
      pnlPct: 2.85,
      daysHeld: 5,
      status: 'Normal',
    },
    {
      id: 2,
      symbol: 'TCS',
      entryPrice: 3680.20,
      currentPrice: 3720.50,
      shares: 54,
      investment: 198730.80,
      currentValue: 200907.00,
      pnl: 2176.20,
      pnlPct: 1.09,
      daysHeld: 3,
      status: 'Normal',
    },
  ])

  const [recentSignals, setRecentSignals] = useState([
    {
      symbol: 'HDFCBANK',
      confidence: 82.5,
      price: 1645.30,
      trend: 'Bullish',
    },
    {
      symbol: 'INFY',
      confidence: 78.3,
      price: 1825.50,
      trend: 'Bullish',
    },
    {
      symbol: 'ICICIBANK',
      confidence: 75.8,
      price: 1155.20,
      trend: 'Bullish',
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back to MG AI Trading</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <Link 
                href="/signals" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Generate Signals
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Capital"
            value={`₹${(portfolio.totalCapital / 100000).toFixed(1)}L`}
            icon={<DollarSign className="w-6 h-6 text-blue-600" />}
            bgColor="bg-blue-50"
          />
          <MetricCard
            title="Current Value"
            value={`₹${(portfolio.currentValue / 100000).toFixed(1)}L`}
            subtitle={`Invested: ₹${(portfolio.investedCapital / 100000).toFixed(1)}L`}
            icon={<Briefcase className="w-6 h-6 text-purple-600" />}
            bgColor="bg-purple-50"
          />
          <MetricCard
            title="Total P&L"
            value={`₹${(portfolio.totalPnL / 1000).toFixed(1)}K`}
            subtitle={`${portfolio.totalPnLPct >= 0 ? '+' : ''}${portfolio.totalPnLPct.toFixed(2)}%`}
            icon={portfolio.totalPnL >= 0 ? 
              <TrendingUp className="w-6 h-6 text-green-600" /> : 
              <TrendingDown className="w-6 h-6 text-red-600" />
            }
            bgColor={portfolio.totalPnL >= 0 ? "bg-green-50" : "bg-red-50"}
            valueColor={portfolio.totalPnL >= 0 ? "text-green-600" : "text-red-600"}
          />
          <MetricCard
            title="Active Positions"
            value={`${portfolio.activePositions}/10`}
            subtitle={`Available: ${10 - portfolio.activePositions} slots`}
            icon={<Activity className="w-6 h-6 text-orange-600" />}
            bgColor="bg-orange-50"
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Positions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Active Positions</h2>
                <Link 
                  href="/portfolio" 
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {positions.map((position) => (
                  <PositionCard key={position.id} position={position} />
                ))}
              </div>

              {positions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No active positions</p>
                  <Link href="/signals" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
                    Generate signals to start trading
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Signals */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Signals</h2>
                <Link 
                  href="/signals" 
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentSignals.map((signal, idx) => (
                  <SignalCard key={idx} signal={signal} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <QuickActionCard
            title="Generate Signals"
            description="Scan 600+ stocks for high-confidence opportunities"
            href="/signals"
            color="blue"
          />
          <QuickActionCard
            title="View Portfolio"
            description="Track positions, P&L, and alerts"
            href="/portfolio"
            color="purple"
          />
          <QuickActionCard
            title="Trade History"
            description="Review past trades and performance"
            href="/history"
            color="green"
          />
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, subtitle, icon, bgColor, valueColor = "text-gray-900" }: {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  bgColor: string
  valueColor?: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${bgColor} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}

function PositionCard({ position }: { position: any }) {
  const isProfitable = position.pnl >= 0

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg">{position.symbol}</h3>
          <p className="text-sm text-gray-600">{position.shares} shares</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">₹{position.currentPrice.toFixed(2)}</p>
          <p className={`text-sm font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
            {isProfitable ? '+' : ''}₹{position.pnl.toFixed(0)} ({isProfitable ? '+' : ''}{position.pnlPct.toFixed(2)}%)
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Entry: ₹{position.entryPrice.toFixed(2)}</span>
        <span>{position.daysHeld} days</span>
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">{position.status}</span>
      </div>
    </div>
  )
}

function SignalCard({ signal }: { signal: any }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">{signal.symbol}</h3>
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
          {signal.confidence.toFixed(1)}%
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">₹{signal.price.toFixed(2)}</span>
        <span className={`font-semibold ${
          signal.trend === 'Bullish' ? 'text-green-600' : 'text-red-600'
        }`}>
          {signal.trend}
        </span>
      </div>
    </div>
  )
}

function QuickActionCard({ title, description, href, color }: {
  title: string
  description: string
  href: string
  color: 'blue' | 'purple' | 'green'
}) {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
    purple: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
    green: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
  }

  return (
    <Link href={href}>
      <div className={`bg-gradient-to-r ${colorClasses[color]} text-white rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg`}>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
        <div className="mt-4 flex items-center text-sm font-semibold">
          Go <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  )
}

