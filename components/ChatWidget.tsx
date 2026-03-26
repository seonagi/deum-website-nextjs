'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Send, MessageSquare, Minimize2, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'agent'
  timestamp: Date
}

interface TeamMember {
  id: string
  name: string
  role: string
  style?: string
  phrases?: string[]
  can_escalate_to_founder?: boolean
}

interface KnowledgeBase {
  company: any
  pricing: any
  product: any
  features: any
  faq: any[]
  vs_competitors: any
  team: {
    enabled: boolean
    members: TeamMember[]
  }
  custom_knowledge: any
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isWaitingForAgent, setIsWaitingForAgent] = useState(false)
  const [waitMessage, setWaitMessage] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasShownIntro, setHasShownIntro] = useState(false)
  const [knowledge, setKnowledge] = useState<KnowledgeBase | null>(null)
  const [agent, setAgent] = useState<TeamMember | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Load knowledge base
  useEffect(() => {
    fetch('/data/deum-knowledge.json')
      .then(res => res.json())
      .then(data => {
        setKnowledge(data)
        assignTeamMember(data)
      })
      .catch(err => console.error('Failed to load knowledge:', err))
  }, [])
  
  // Assign team member (random sticky)
  const assignTeamMember = (kb: KnowledgeBase) => {
    if (!kb.team?.enabled || !kb.team?.members?.length) {
      setAgent({ id: 'default', name: 'Support', role: 'Support' })
      return
    }
    
    // Check for existing assignment
    const storedAgentId = localStorage.getItem('deum_agent_id')
    if (storedAgentId) {
      const found = kb.team.members.find(m => m.id === storedAgentId)
      if (found) {
        setAgent(found)
        return
      }
    }
    
    // Random assignment (sticky)
    const visitorId = localStorage.getItem('deum_visitor_id') || `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('deum_visitor_id', visitorId)
    
    const hash = visitorId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    const index = hash % kb.team.members.length
    const assigned = kb.team.members[index]
    
    setAgent(assigned)
    localStorage.setItem('deum_agent_id', assigned.id)
  }
  
  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    if (!agent) return "Hi! How can I help you?"
    
    const hour = new Date().getHours()
    const name = agent.name
    const role = agent.role
    
    const visitCount = parseInt(localStorage.getItem('deum_visit_count') || '0')
    
    if (visitCount > 0) {
      return `Hey, welcome back! ${name} here again. How can I help you today?`
    }
    
    if (hour < 12) {
      return `Good morning! I'm ${name} from ${role}. How can I help you today?`
    } else if (hour < 17) {
      return `Hi there! I'm ${name} from ${role}. What can I help you with?`
    } else {
      return `Good evening! ${name} here from ${role}. How can I assist you?`
    }
  }
  
  // Wait messages to rotate
  const waitMessages = [
    `${agent?.name || 'Our team'} is helping another customer... you're next!`,
    "One moment while we connect you...",
    `${agent?.name || 'Support'} will be right with you...`,
    "Thanks for waiting! Almost ready...",
  ]
  
  // Show tooltip after 3 seconds
  useEffect(() => {
    if (!agent) return
    const timer = setTimeout(() => {
      setShowTooltip(true)
      // Hide after 15 seconds
      setTimeout(() => setShowTooltip(false), 15000)
    }, 3000)
    return () => clearTimeout(timer)
  }, [agent])
  
  // Auto-open after 10 seconds for first-time visitors (desktop only)
  useEffect(() => {
    const hasVisited = localStorage.getItem('deum-chat-visited')
    const isMobile = window.innerWidth < 768
    if (!hasVisited && knowledge && !isMobile) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        setShowTooltip(false) // Hide tooltip when opening
        
        // Simulate agent connecting
        showAgentIntro()
        
        localStorage.setItem('deum-chat-visited', 'true')
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [knowledge, agent])
  
  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  // Show agent intro with countdown
  const showAgentIntro = async () => {
    if (hasShownIntro) return
    setHasShownIntro(true)
    
    // Show countdown: "Agent will be with you in Xs"
    const waitTime = 5 + Math.floor(Math.random() * 4) // 5-8 seconds
    setCountdown(waitTime)
    setIsWaitingForAgent(true)
    setWaitMessage(`${agent?.name || 'Our team'} is just finishing up with someone else`)
    
    // Countdown timer
    let remaining = waitTime
    const countdownInterval = setInterval(() => {
      remaining--
      setCountdown(remaining)
      if (remaining <= 0) {
        clearInterval(countdownInterval)
      }
    }, 1000)
    
    // After countdown, show typing indicator then greeting
    setTimeout(async () => {
      setIsWaitingForAgent(false)
      setCountdown(0)
      
      const greeting = getTimeBasedGreeting()
      
      // Show typing indicator
      setIsTyping(true)
      await new Promise(resolve => setTimeout(resolve, greeting.length * 30)) // Slow typing
      setIsTyping(false)
      
      // Add greeting message
      setMessages([{
        id: '1',
        text: greeting,
        sender: 'agent',
        timestamp: new Date()
      }])
      
      // Track visit
      const visitCount = parseInt(localStorage.getItem('deum_visit_count') || '0')
      localStorage.setItem('deum_visit_count', (visitCount + 1).toString())
    }, waitTime * 1000)
  }
  
  // Simulate typing with natural variation
  const simulateTyping = (responseLength: number = 100) => {
    const wordsPerMinute = 40
    const avgWordLength = 5
    const words = responseLength / avgWordLength
    const baseTime = (words / wordsPerMinute) * 60 * 1000
    const variation = 0.4 * Math.random() - 0.2
    const duration = Math.max(1000, Math.min(baseTime * (1 + variation), 4000))
    
    setIsTyping(true)
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false)
        resolve(true)
      }, duration)
    })
  }
  
  // Add message helper
  const addMessage = (text: string, sender: 'user' | 'agent') => {
    const message: Message = {
      id: Date.now().toString() + Math.random(),
      text,
      sender,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
    return message
  }
  
  // Send user message
  const handleSend = async () => {
    if (!inputValue.trim() || !knowledge) return
    
    addMessage(inputValue, 'user')
    const userInput = inputValue
    setInputValue('')
    
    // Thinking delay
    await simulateTyping(userInput.length)
    
    // Generate response via API
    try {
      const systemPrompt = buildSystemPrompt()
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.slice(-10).map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
          userMessage: userInput,
          systemPrompt
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API error:', response.status, errorData)
        throw new Error(errorData.error || 'API error')
      }
      
      const data = await response.json()
      const reply = data.message || data.content || "Sorry, I had trouble responding. Please try again!"
      
      await simulateTyping(reply.length)
      addMessage(reply, 'agent')
      
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      if (errorMessage.includes('API key not configured')) {
        addMessage("Chat is temporarily unavailable. Please email support@deum.video", 'agent')
      } else {
        addMessage("Sorry, I had trouble responding. Try again or email support@deum.video", 'agent')
      }
    }
  }
  
  // Build system prompt from knowledge base
  const buildSystemPrompt = () => {
    if (!knowledge || !agent) return ''
    
    const k = knowledge
    
    return `You are ${agent.name} from Deum's ${agent.role} team.

PERSONALITY:
${agent.style || 'Helpful and friendly'}
${agent.phrases?.length ? `Signature phrases: ${agent.phrases.join(', ')}` : ''}

IMPORTANT RULES:
1. You're a real team member, not an AI chatbot
2. Keep responses SHORT (1-3 sentences unless details needed)
3. Be warm, conversational, natural - like texting a coworker
4. Answer basic questions (pricing, features, how it works) yourself
5. For complex custom requests, direct to founder: support@deum.video

COMPANY: ${k.company.name} - ${k.company.tagline}
Website: ${k.company.website}

PRICING:
- Free: $0/month, 1 hour
- Hobby: $20/month (or $15/month annual), 10 hours
- Creator: $32/month (or $23/month annual), 30 hours - Most Popular
- Business: $60/month (or $49/month annual), 40 hours
- Extra hours: $3 each
- Hours don't roll over

HOW IT WORKS:
${k.product.how_it_works.join('\n')}

KEY FACTS:
- Processing time: ${k.product.processing_time}
- Accuracy: ${k.product.accuracy}
- Max file: ${k.product.max_file_size}
- Formats: ${k.product.formats_video.join(', ')} (video), ${k.product.formats_audio.join(', ')} (audio)
- Supports podcasts!
- Videos deleted after 24 hours

VS DESCRIPT:
${k.vs_competitors.descript.speed}
Customer quote: "${k.vs_competitors.descript.customer_quote}"

FAQ HIGHLIGHTS:
${k.faq.slice(0, 5).map((f: any) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}

PROMO CODES:
${Object.entries(k.custom_knowledge.promo_codes || {}).map(([code, desc]) => `${code} - ${desc}`).join(', ')}

${agent.can_escalate_to_founder ? `You work closely with Elliot (founder) and can mention him by name.` : ''}

Remember: Short, warm, helpful responses. You're a real person helping a real customer.`
  }
  
  // Show button even before knowledge loads
  const displayAgent = agent || { name: 'Support', role: 'Support' }
  
  return (
    <>
      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] bg-white shadow-xl rounded-lg p-3 max-w-[240px] transition-all duration-300 animate-bounce-subtle">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-900 leading-snug">
                {displayAgent.name} is here to answer your questions - just click the icon
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
      
      {/* Chat Bubble - ALWAYS SHOW FOR DEBUG */}
      <button
        onClick={() => {
          setIsOpen(true)
          setShowTooltip(false)
          if (!hasShownIntro && knowledge && agent) showAgentIntro()
        }}
        className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group relative"
        aria-label="Open chat"
        style={{ 
          visibility: 'visible', 
          display: isOpen ? 'none' : 'block',
          pointerEvents: 'auto'
        }}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
        <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with {displayAgent.name}
        </span>
      </button>
      
      {/* Chat Window */}
      {isOpen && knowledge && agent && (
        <div className={`fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-50 bg-white md:rounded-2xl shadow-2xl transition-all duration-300 ${
          isMinimized ? 'md:w-80 md:h-16' : 'md:w-96 md:h-[600px]'
        } ${isMinimized ? '' : 'w-full h-full md:max-w-[400px] md:max-h-[600px]'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 md:rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="font-semibold">{agent.name}</p>
                <p className="text-xs opacity-90">{agent.role} • Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setIsMinimized(false)
                }}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 md:h-[460px] space-y-4">
                {isWaitingForAgent && (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-center space-y-4">
                      <div className="flex justify-center space-x-2 mb-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <p className="text-sm text-gray-600">{waitMessage}</p>
                      {countdown > 0 && (
                        <p className="text-sm font-medium text-orange-600">
                          {agent?.name || 'Support'} will be with you in {countdown}s
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {!isWaitingForAgent && messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-orange-100 to-orange-200 text-gray-900'
                        : 'bg-gray-100 text-gray-900'
                    } rounded-2xl px-4 py-2`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-50 mt-1">
                        {message.timestamp.toLocaleTimeString('en-GB', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {!isWaitingForAgent && isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%]">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about pricing, features..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-orange-500 text-sm text-gray-900 placeholder:text-gray-500"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Typically replies in under 30 seconds
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
