import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const minConfidence = Number(searchParams.get('minConfidence') || 70)
    const limit = Number(searchParams.get('limit') || 20)

    // Get recent signals
    const signals = await prisma.signal.findMany({
      where: {
        hybridConfidence: {
          gte: minConfidence,
        },
        isActive: true,
      },
      orderBy: {
        hybridConfidence: 'desc',
      },
      take: limit,
    })

    return NextResponse.json({
      success: true,
      signals,
      count: signals.length,
    })

  } catch (error) {
    console.error('Signals fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch signals' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { stocks, minConfidence } = body

    // TODO: Implement signal generation logic
    // This would call your Python AI models and calculate technical indicators

    return NextResponse.json({
      success: true,
      message: 'Signal generation started',
      jobId: 'temp-job-id',
    })

  } catch (error) {
    console.error('Signal generation error:', error)
    return NextResponse.json(
      { message: 'Failed to generate signals' },
      { status: 500 }
    )
  }
}

