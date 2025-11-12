import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function calculatePnL(entryPrice: number, currentPrice: number, shares: number) {
  const pnl = (currentPrice - entryPrice) * shares
  const pnlPct = ((currentPrice - entryPrice) / entryPrice) * 100
  return { pnl, pnlPct }
}

export function calculateTargetStop(price: number, targetPct: number = 0.25, stopPct: number = 0.08) {
  return {
    target: price * (1 + targetPct),
    stop: price * (1 - stopPct),
  }
}

export function getSignalColor(confidence: number): string {
  if (confidence >= 80) return 'text-green-600'
  if (confidence >= 70) return 'text-blue-600'
  if (confidence >= 60) return 'text-yellow-600'
  return 'text-gray-600'
}

export function getSignalBadge(confidence: number): string {
  if (confidence >= 80) return 'High'
  if (confidence >= 70) return 'Good'
  if (confidence >= 60) return 'Medium'
  return 'Low'
}

export function getTrendColor(trend: string): string {
  if (trend === 'Bullish') return 'text-green-600'
  if (trend === 'Bearish') return 'text-red-600'
  return 'text-gray-600'
}

export function getPositionStatus(
  currentPrice: number,
  entryPrice: number,
  targetPrice: number,
  stopPrice: number,
  daysHeld: number,
  maxDays: number = 25
): {
  status: 'Normal' | 'Near Target' | 'Near Stop' | 'Target Hit' | 'Stop Hit' | 'Max Days'
  color: string
  urgency: 'low' | 'medium' | 'high' | 'critical'
} {
  const pnlPct = ((currentPrice - entryPrice) / entryPrice) * 100
  
  // Check for hits
  if (currentPrice >= targetPrice) {
    return { status: 'Target Hit', color: 'text-green-600', urgency: 'critical' }
  }
  if (currentPrice <= stopPrice) {
    return { status: 'Stop Hit', color: 'text-red-600', urgency: 'critical' }
  }
  if (daysHeld >= maxDays) {
    return { status: 'Max Days', color: 'text-orange-600', urgency: 'high' }
  }
  
  // Check for approaching
  const targetDistance = ((targetPrice - currentPrice) / currentPrice) * 100
  const stopDistance = ((currentPrice - stopPrice) / currentPrice) * 100
  
  if (targetDistance < 5) {
    return { status: 'Near Target', color: 'text-green-500', urgency: 'medium' }
  }
  if (stopDistance < 3) {
    return { status: 'Near Stop', color: 'text-red-500', urgency: 'high' }
  }
  
  return { status: 'Normal', color: 'text-gray-600', urgency: 'low' }
}

