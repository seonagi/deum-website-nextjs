import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY
  
  return NextResponse.json({
    success: true,
    hasKey: !!apiKey,
    keyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'none',
    timestamp: new Date().toISOString()
  })
}
