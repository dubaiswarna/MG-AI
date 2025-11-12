'use client'

import { useState } from 'react'
import { User, DollarSign, Shield, Bell, Save } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    totalCapital: 2000000,
    perPosition: 200000,
    maxPositions: 10,
    targetPct: 25,
    stopPct: 8,
    maxDays: 25,
    minConfidence: 70,
    emailAlerts: true,
    targetAlerts: true,
    stopAlerts: true,
    dailyReport: false,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // TODO: Save to database
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-600">Manage your account and trading preferences</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Message */}
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            Settings saved successfully!
          </div>
        )}

        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center mb-6">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold">Profile Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Capital Settings */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center mb-6">
            <DollarSign className="w-5 h-5 text-green-600 mr-2" />
            <h2 className="text-xl font-bold">Capital Allocation</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Capital (₹)
              </label>
              <input
                type="number"
                value={settings.totalCapital}
                onChange={(e) => setSettings({ ...settings, totalCapital: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                step="100000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Per Position (₹)
              </label>
              <input
                type="number"
                value={settings.perPosition}
                onChange={(e) => setSettings({ ...settings, perPosition: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                step="50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Positions
              </label>
              <input
                type="number"
                value={settings.maxPositions}
                onChange={(e) => setSettings({ ...settings, maxPositions: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                max="20"
              />
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center mb-6">
            <Shield className="w-5 h-5 text-red-600 mr-2" />
            <h2 className="text-xl font-bold">Risk Management</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target (%)
              </label>
              <input
                type="number"
                value={settings.targetPct}
                onChange={(e) => setSettings({ ...settings, targetPct: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                step="5"
              />
              <p className="text-xs text-gray-500 mt-1">Profit booking level</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stop Loss (%)
              </label>
              <input
                type="number"
                value={settings.stopPct}
                onChange={(e) => setSettings({ ...settings, stopPct: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                step="1"
              />
              <p className="text-xs text-gray-500 mt-1">Maximum loss per trade</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Days
              </label>
              <input
                type="number"
                value={settings.maxDays}
                onChange={(e) => setSettings({ ...settings, maxDays: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="5"
              />
              <p className="text-xs text-gray-500 mt-1">Force exit after days</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Signal Confidence (%)
            </label>
            <input
              type="range"
              min="50"
              max="90"
              value={settings.minConfidence}
              onChange={(e) => setSettings({ ...settings, minConfidence: Number(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>50% (More signals)</span>
              <span className="font-semibold">{settings.minConfidence}%</span>
              <span>90% (Fewer, higher quality)</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center mb-6">
            <Bell className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Email Alerts</p>
                <p className="text-sm text-gray-600">Receive alerts via email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                className="w-5 h-5"
              />
            </label>
            <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Target Hit Alerts</p>
                <p className="text-sm text-gray-600">Notify when target is reached</p>
              </div>
              <input
                type="checkbox"
                checked={settings.targetAlerts}
                onChange={(e) => setSettings({ ...settings, targetAlerts: e.target.checked })}
                className="w-5 h-5"
              />
            </label>
            <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Stop Loss Alerts</p>
                <p className="text-sm text-gray-600">Notify when stop loss is hit</p>
              </div>
              <input
                type="checkbox"
                checked={settings.stopAlerts}
                onChange={(e) => setSettings({ ...settings, stopAlerts: e.target.checked })}
                className="w-5 h-5"
              />
            </label>
            <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Daily Report</p>
                <p className="text-sm text-gray-600">Daily portfolio summary email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.dailyReport}
                onChange={(e) => setSettings({ ...settings, dailyReport: e.target.checked })}
                className="w-5 h-5"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

