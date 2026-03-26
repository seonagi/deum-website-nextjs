import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages, userMessage, systemPrompt } = await req.json()
    
    console.log('[Chat API] Request received:', {
      hasMessages: !!messages,
      messageCount: messages?.length,
      hasUserMessage: !!userMessage,
      hasSystemPrompt: !!systemPrompt
    })
    
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error('[Chat API] API key not configured')
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }
    
    console.log('[Chat API] API key found, calling OpenRouter...')
    
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
        model: 'anthropic/claude-sonnet-4.5',
        messages: allMessages,
        temperature: 0.8,
        max_tokens: 150
      })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error('[Chat API] OpenRouter error:', response.status, error)
      return NextResponse.json({ 
        error: 'AI service error',
        details: `Status: ${response.status}`,
        openrouterError: error
      }, { status: 500 })
    }
    
    const data = await response.json()
    console.log('[Chat API] OpenRouter response received:', {
      hasChoices: !!data.choices,
      choicesLength: data.choices?.length
    })
    
    const message = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response."
    console.log('[Chat API] Sending response, message length:', message.length)
    
    return NextResponse.json({ message })
    
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
