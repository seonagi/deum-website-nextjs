import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages, userMessage, systemPrompt } = await req.json()
    
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }
    
    // Build messages array
    const allMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
      { role: 'user', content: userMessage }
    ]
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://deum.video',
        'X-Title': 'Deum Chat'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-5-haiku-latest',
        messages: allMessages,
        temperature: 0.8,
        max_tokens: 300
      })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error('OpenRouter error:', error)
      return NextResponse.json({ error: 'AI service error' }, { status: 500 })
    }
    
    const data = await response.json()
    const message = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response."
    
    return NextResponse.json({ message })
    
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
