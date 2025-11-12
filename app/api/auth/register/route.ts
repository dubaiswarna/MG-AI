import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, capital } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        capital: capital || 2000000,
      },
      select: {
        id: true,
        name: true,
        email: true,
        capital: true,
        role: true,
        createdAt: true,
      },
    })

    // Create initial portfolio
    await prisma.portfolio.create({
      data: {
        userId: user.id,
        totalCapital: user.capital,
        availableCapital: user.capital,
        investedCapital: 0,
        currentValue: 0,
        totalPnL: 0,
        totalPnLPct: 0,
        activePositions: 0,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      user,
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

