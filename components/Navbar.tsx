import Link from 'next/link'
import { Home, TrendingUp, Briefcase, History, Settings, LogOut } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">MG AI Trading</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/dashboard" icon={<Home className="w-4 h-4" />}>
              Dashboard
            </NavLink>
            <NavLink href="/signals" icon={<TrendingUp className="w-4 h-4" />}>
              Signals
            </NavLink>
            <NavLink href="/portfolio" icon={<Briefcase className="w-4 h-4" />}>
              Portfolio
            </NavLink>
            <NavLink href="/history" icon={<History className="w-4 h-4" />}>
              History
            </NavLink>
            <NavLink href="/settings" icon={<Settings className="w-4 h-4" />}>
              Settings
            </NavLink>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-gray-900">John Doe</p>
              <p className="text-xs text-gray-600">₹20.0L Capital</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, icon, children }: { href: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
    >
      {icon}
      {children}
    </Link>
  )
}

