import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from session/token
    const userId = 1 // Temporary hardcoded

    // Get portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId },
    })

    // Get active positions
    const positions = await prisma.position.findMany({
      where: {
        userId,
        status: 'ACTIVE',
      },
      orderBy: { entryDate: 'desc' },
    })

    return NextResponse.json({
      success: true,
      portfolio,
      positions,
      positionCount: positions.length,
    })

  } catch (error) {
    console.error('Portfolio fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch portfolio' },
      { status: 500 }
    )
  }
}

