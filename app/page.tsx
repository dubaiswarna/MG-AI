import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Zap, Users } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            MG AI Trading Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            AI-Powered Multi-User Trading Platform with Real-time Signals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/dashboard" 
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
            title="AI-Powered Signals"
            description="60% AI + 40% Technical Analysis for high-confidence trading signals"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-green-600" />}
            title="Risk Management"
            description="Built-in stop-loss, targets, and position sizing for capital protection"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-yellow-600" />}
            title="Real-time Data"
            description="Live price updates for 600+ stocks including Nifty, BankNifty, and commodities"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-purple-600" />}
            title="Multi-User"
            description="Secure authentication with individual portfolios and trade tracking"
          />
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard number="600+" label="Stocks Covered" />
            <StatCard number="70%+" label="Signal Confidence" />
            <StatCard number="25%" label="Target Return" />
            <StatCard number="10+" label="Years of Data" />
          </div>
        </div>

        {/* Coverage Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Data Coverage</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <DataCard
              title="Nifty 200"
              items={["191 Large Cap Stocks", "10+ Years History", "Daily EOD Data"]}
            />
            <DataCard
              title="Nifty 500"
              items={["258 Mid Cap Stocks", "Growth Potential", "Fresh Data Daily"]}
            />
            <DataCard
              title="Smallcap 250"
              items={["148 Small Cap Stocks", "High Growth", "Complete Coverage"]}
            />
          </div>
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold">Plus: MCX Gold & Silver with 25 Years of Data</p>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Built with Modern Technology</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <TechCard name="Next.js 14" description="React Framework" />
            <TechCard name="MySQL" description="Reliable Database" />
            <TechCard name="XGBoost AI" description="ML Models" />
            <TechCard name="Prisma ORM" description="Type-safe DB" />
            <TechCard name="NextAuth" description="Secure Auth" />
            <TechCard name="Tailwind CSS" description="Modern UI" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Access from anywhere - Desktop, Mobile, Tablet
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center px-10 py-5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xl font-bold"
          >
            Login Now
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">MG AI Trading Platform</p>
          <p className="text-gray-400">Professional Trading Tools for Serious Traders</p>
          <p className="text-sm text-gray-500 mt-4">© 2025 All Rights Reserved</p>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StatCard({ number, label }: { number: string, label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}

function DataCard({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-2">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TechCard({ name, description }: { name: string, description: string }) {
  return (
    <div className="p-4">
      <div className="text-2xl font-bold text-blue-600 mb-2">{name}</div>
      <div className="text-gray-600">{description}</div>
    </div>
  )
}

