import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'MG AI Trading Platform',
    version: '1.0.0',
    database: 'connected', // TODO: Add actual DB check
  })
}

