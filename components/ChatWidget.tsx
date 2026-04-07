'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Send, MessageSquare, Minimize2, User } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase =
  | 'idle'           // chat not yet opened / first message not sent
  | 'queuing'        // showing queue position
  | 'agent_assigned' // agent revealed, brief pause
  | 'countdown'      // counting down before agent says hi
  | 'live'           // normal conversation
  | 'away'           // user went inactive, agent signed off

interface Message {
  id: string
  text: string
  sender: 'user' | 'agent' | 'system'
  timestamp: Date
}

interface TeamMember {
  id: string
  name: string
  role: string
  style?: string
  phrases?: string[]
  can_escalate_to_founder?: boolean
  avatar?: string
}

interface KnowledgeBase {
  company: any
  pricing: any
  product: any
  features: any
  faq: any[]
  vs_competitors: any
  team: { enabled: boolean; members: TeamMember[] }
  custom_knowledge: any
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/^- /gm, '')
    .trim()
}

// Keyboard-distance typo map
const KEYBOARD: Record<string, string[]> = {
  q:['w','a'], w:['q','e','s'], e:['w','r','d'], r:['e','t','f'], t:['r','y','g'],
  y:['t','u','h'], u:['y','i','j'], i:['u','o','k'], o:['i','p','l'], p:['o','l'],
  a:['q','s','z'], s:['a','d','w','x','z'], d:['s','f','e','c','x'], f:['d','g','r','v','c'],
  g:['f','h','t','b','v'], h:['g','j','y','n','b'], j:['h','k','u','m','n'],
  k:['j','l','i','m'], l:['k','o','p'], z:['a','s','x'], x:['z','s','d','c'],
  c:['x','d','f','v'], v:['c','f','g','b'], b:['v','g','h','n'], n:['b','h','j','m'],
  m:['n','j','k'],
}

// Apply a single realistic typo + correction to a chunk of text
// Returns [chunk] or [typo, correction]
function applyTypo(text: string): string[] {
  if (Math.random() > 0.12) return [text]          // ~12% chance of typo
  const words = text.split(' ')
  const wordIdx = Math.floor(Math.random() * words.length)
  const word = words[wordIdx]
  if (word.length < 3) return [text]
  const charIdx = Math.floor(Math.random() * (word.length - 1))
  const char = word[charIdx].toLowerCase()
  const neighbors = KEYBOARD[char]
  if (!neighbors) return [text]
  const typoChar = pickRandom(neighbors)
  const typoWord = word.slice(0, charIdx) + typoChar + word.slice(charIdx + 1)
  words[wordIdx] = typoWord
  const typoText = words.join(' ')
  // 60% chance they correct it
  if (Math.random() < 0.6) {
    return [typoText, text]
  }
  return [typoText]
}

// Split AI response into sentence-level chunks (~80 chars max)
function chunkResponse(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  const chunks: string[] = []
  let current = ''
  for (const s of sentences) {
    const trimmed = s.trim()
    if (!trimmed) continue
    if (current && (current + ' ' + trimmed).length > 80) {
      chunks.push(current.trim())
      current = trimmed
    } else {
      current = current ? current + ' ' + trimmed : trimmed
    }
  }
  if (current.trim()) chunks.push(current.trim())

  // Force-split any oversized single chunk on commas/dashes
  if (chunks.length === 1 && chunks[0].length > 100) {
    const parts = chunks[0].split(/(?<=[,\-—]) /)
    if (parts.length > 1) {
      chunks.length = 0
      let buf = ''
      for (const p of parts) {
        if (buf && (buf + ' ' + p).length > 80) { chunks.push(buf.trim()); buf = p }
        else { buf = buf ? buf + ' ' + p : p }
      }
      if (buf.trim()) chunks.push(buf.trim())
    }
  }
  return chunks.length ? chunks : [text]
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen]             = useState(false)
  const [isMinimized, setIsMinimized]   = useState(false)
  const [phase, setPhase]               = useState<Phase>('idle')
  const [messages, setMessages]         = useState<Message[]>([])
  const [inputValue, setInputValue]     = useState('')
  const [isTyping, setIsTyping]         = useState(false)
  const [queueMessage, setQueueMessage] = useState<string | null>(null)
  const [countdown, setCountdown]       = useState(0)
  const [statusText, setStatusText]     = useState('')
  const [showTooltip, setShowTooltip]   = useState(false)
  const [knowledge, setKnowledge]       = useState<KnowledgeBase | null>(null)
  const [agent, setAgent]               = useState<TeamMember | null>(null)
  const [userEmail, setUserEmail]       = useState('')
  const [emailPromptShown, setEmailPromptShown] = useState(false)

  const messagesEndRef    = useRef<HTMLDivElement>(null)
  const inactivityRef     = useRef<NodeJS.Timeout | null>(null)
  const awayRef           = useRef<NodeJS.Timeout | null>(null)
  const inactivityFired   = useRef(false)
  const awayFired         = useRef(false)
  const agentRef          = useRef<TeamMember | null>(null)  // stable ref for async code

  // Load knowledge base
  useEffect(() => {
    fetch('/data/deum-knowledge.json')
      .then(r => r.json())
      .then(setKnowledge)
      .catch(err => console.error('[deum chat] Failed to load knowledge:', err))
  }, [])

  // Tooltip cycle
  useEffect(() => {
    const show = () => { setShowTooltip(true); setTimeout(() => setShowTooltip(false), 30000) }
    const t1 = setTimeout(show, 3000)
    const t2 = setInterval(show, 120000)
    return () => { clearTimeout(t1); clearInterval(t2) }
  }, [])

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, queueMessage, countdown])

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (inactivityRef.current) clearTimeout(inactivityRef.current)
      if (awayRef.current) clearTimeout(awayRef.current)
    }
  }, [])

  // ── Helpers ────────────────────────────────────────────────────────────────

  const addMessage = useCallback((text: string, sender: 'user' | 'agent' | 'system') => {
    setMessages(prev => [...prev, {
      id: `${Date.now()}_${Math.random()}`,
      text, sender, timestamp: new Date(),
    }])
  }, [])

  // Typing delay proportional to text length
  const simulateTyping = useCallback(async (length: number) => {
    const words    = length / 5
    const base     = (words / 40) * 60 * 1000
    const duration = Math.max(1200, Math.min(base * (0.8 + Math.random() * 0.4), 7000))
    setIsTyping(true)
    await sleep(duration)
    setIsTyping(false)
  }, [])

  // Reading delay — agent "reads" the user's message before responding
  const simulateReading = useCallback(async (msgLength: number) => {
    const words    = msgLength / 5
    const readTime = words * 120                                   // ~120ms/word
    await sleep(Math.max(1200, Math.min(readTime, 3500)))
  }, [])

  // ── Inactivity timer ───────────────────────────────────────────────────────

  const clearInactivityTimers = useCallback(() => {
    if (inactivityRef.current) { clearTimeout(inactivityRef.current); inactivityRef.current = null }
    if (awayRef.current)       { clearTimeout(awayRef.current);       awayRef.current = null }
  }, [])

  const startInactivityTimer = useCallback(() => {
    if (inactivityFired.current) return
    clearInactivityTimers()

    inactivityRef.current = setTimeout(async () => {
      inactivityFired.current = true
      const msg = pickRandom(['are you still there?', 'you still with me?', 'still there? 👋'])
      await simulateTyping(msg.length)
      addMessage(msg, 'agent')

      awayRef.current = setTimeout(async () => {
        if (awayFired.current) return
        awayFired.current = true

        const signOff = `no worries, I've got to jump on another call — message back any time and I'll pick up where we left off`
        await simulateTyping(signOff.length)
        addMessage(signOff, 'agent')

        await sleep(1500)
        if (userEmail) {
          await simulateTyping(40)
          addMessage(`I'll send a summary of this chat to ${userEmail}`, 'agent')
        } else {
          await simulateTyping(50)
          addMessage(`if you drop your email I can send you a summary for your records`, 'agent')
          setEmailPromptShown(true)
        }

        setPhase('away')
      }, 50000 + Math.random() * 20000)
    }, 45000)
  }, [clearInactivityTimers, simulateTyping, addMessage, userEmail])

  // ── Send agent response as sentence-level chunks with typos ────────────────

  const sendAgentResponse = useCallback(async (rawText: string) => {
    const text   = stripMarkdown(rawText)
    const chunks = chunkResponse(text)

    for (let i = 0; i < chunks.length; i++) {
      const chunk   = chunks[i]
      const msgs    = i === Math.floor(Math.random() * chunks.length)
        ? applyTypo(chunk)
        : [chunk]

      for (const m of msgs) {
        await simulateTyping(m.length)
        addMessage(m, 'agent')
        if (msgs.length > 1) await sleep(400 + Math.random() * 600)
      }
      if (i < chunks.length - 1) await sleep(1000 + Math.random() * 1500)
    }
  }, [simulateTyping, addMessage])

  // ── Agent connection sequence ──────────────────────────────────────────────

  const runConnectionSequence = useCallback(async (question: string, kb: KnowledgeBase) => {
    // Assign agent
    let currentAgent: TeamMember
    if (kb.team?.enabled && kb.team?.members?.length) {
      currentAgent = kb.team.members[Math.floor(Math.random() * kb.team.members.length)]
    } else {
      currentAgent = { id: 'default', name: 'Support', role: 'Support' }
    }
    agentRef.current = currentAgent

    // Phase 1: Queue position
    setPhase('queuing')
    setStatusText('Adding you to the queue...')
    await sleep(1200 + Math.random() * 800)

    const queueSize = 1 + Math.floor(Math.random() * 3)
    for (let ahead = queueSize; ahead > 0; ahead--) {
      const plural = ahead === 1 ? 'person' : 'people'
      setQueueMessage(`You're in the queue — ${ahead} ${plural} ahead of you`)
      await sleep(2500 + Math.random() * 2500)
    }
    setQueueMessage("You're next")
    await sleep(1200 + Math.random() * 800)
    setQueueMessage(null)

    // Phase 2: Routing
    setStatusText('Routing to an available team member...')
    await sleep(1200 + Math.random() * 1200)

    // Phase 3: Agent assigned
    setAgent(currentAgent)
    setPhase('agent_assigned')
    addMessage(`You've been connected to ${currentAgent.name}`, 'system')
    setStatusText(`Connected to ${currentAgent.name}`)
    await sleep(1200 + Math.random() * 800)

    // Phase 4: Countdown
    const agentFirst      = currentAgent.name.split(' ')[0]
    const countdownSecs   = 9 + Math.floor(Math.random() * 17)
    setPhase('countdown')
    setStatusText(pickRandom([
      `${agentFirst} is just finishing up another chat`,
      `${agentFirst} will be right with you`,
      `${agentFirst} is wrapping up — almost with you`,
    ]))
    setCountdown(countdownSecs)

    for (let i = countdownSecs - 1; i >= 0; i--) {
      await sleep(1000)
      setCountdown(i)
    }

    // Phase 5: Live — greeting
    setPhase('live')
    const greeting = pickRandom([
      `hi, I'm ${agentFirst} 👋`,
      `hey! ${agentFirst} here 👋`,
      `hi there, ${agentFirst} here`,
      `hey, ${agentFirst} here — how's it going?`,
    ])
    await simulateTyping(greeting.length)
    addMessage(greeting, 'agent')

    await sleep(600 + Math.random() * 800)

    // Now respond to their actual question
    await simulateReading(question.length)

    // Optional interjection for complex questions
    const complexTriggers = ['how does', 'can you explain', 'what is', 'why does', 'difference between']
    const isComplex = complexTriggers.some(t => question.toLowerCase().includes(t))
    if (isComplex && Math.random() < 0.4) {
      const interjection = pickRandom(['good question!', 'ooh good one', 'hmm, let me think...'])
      await simulateTyping(interjection.length)
      addMessage(interjection, 'agent')
      await sleep(600 + Math.random() * 800)
    }

    try {
      const response = await fetchAIResponse(question, [], currentAgent, kb)
      await sendAgentResponse(response)
    } catch {
      addMessage("sorry, having a tech blip — give me a sec and try again?", 'agent')
    }

    startInactivityTimer()
  }, [addMessage, simulateTyping, simulateReading, sendAgentResponse, startInactivityTimer])

  // ── AI fetch ───────────────────────────────────────────────────────────────

  const fetchAIResponse = async (
    userInput: string,
    history: Message[],
    currentAgent: TeamMember,
    kb: KnowledgeBase
  ): Promise<string> => {
    const systemPrompt = buildSystemPrompt(currentAgent, kb)
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: history.slice(-10).map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
        userMessage: userInput,
        systemPrompt,
      }),
    })
    if (!res.ok) throw new Error(`API ${res.status}`)
    const data = await res.json()
    return data.message || data.content || "sorry, something went wrong on my end"
  }

  // ── Send handler ───────────────────────────────────────────────────────────

  const handleSend = useCallback(async () => {
    const text = inputValue.trim()
    if (!text || !knowledge) return
    setInputValue('')
    addMessage(text, 'user')

    // Reset inactivity on user activity
    if (!awayFired.current) {
      clearInactivityTimers()
      inactivityFired.current = false
    }

    // First message — run full connection sequence
    if (phase === 'idle') {
      await runConnectionSequence(text, knowledge)
      return
    }

    // Away phase — handle email capture or agent return
    if (phase === 'away') {
      inactivityFired.current = false
      awayFired.current = false

      // Email submission
      if (emailPromptShown && text.includes('@')) {
        setUserEmail(text.trim())
        setEmailPromptShown(false)
        await sleep(3000 + Math.random() * 2000)
        await simulateTyping(30)
        addMessage(pickRandom(['perfect, I\'ll send that over shortly', 'got it, summary on its way', 'thanks, I\'ll get that sent over']), 'agent')
        return
      }

      // Mini re-queue
      const agentFirst = (agentRef.current?.name || 'Support').split(' ')[0]
      setQueueMessage(`${agentFirst} is still on another call — letting them know you're back`)
      setPhase('countdown')
      await sleep(2500 + Math.random() * 1500)

      const returnSecs = 8 + Math.floor(Math.random() * 11)
      setStatusText(pickRandom([
        `${agentFirst} is wrapping up — almost with you`,
        `${agentFirst} is finishing their other chat`,
        `just waiting for ${agentFirst} to free up`,
      ]))
      setQueueMessage(null)
      setCountdown(returnSecs)
      for (let i = returnSecs - 1; i >= 0; i--) { await sleep(1000); setCountdown(i) }
      setCountdown(0)
      setPhase('live')

      await simulateTyping(25)
      addMessage(pickRandom([
        `hey, sorry about that — I'm back`,
        `back now, sorry to keep you waiting`,
        `sorry about the wait, I'm here now`,
      ]), 'agent')
      setEmailPromptShown(false)
      await sleep(600 + Math.random() * 800)
    }

    // Normal conversation
    await simulateReading(text.length)

    // Interjection for complex questions
    const complexTriggers = ['how does', 'can you explain', 'what is', 'why does', 'difference between']
    const isComplex = complexTriggers.some(t => text.toLowerCase().includes(t))
    if (isComplex && Math.random() < 0.35) {
      const interjection = pickRandom(['good question!', 'ooh, let me check that', 'hmm, one sec'])
      await simulateTyping(interjection.length)
      addMessage(interjection, 'agent')
      await sleep(500 + Math.random() * 600)
    }

    try {
      const response = await fetchAIResponse(text, messages, agentRef.current!, knowledge)
      await sendAgentResponse(response)
    } catch {
      addMessage("sorry, having a connection issue — give me a sec and try again?", 'agent')
    }

    // Start inactivity timer AFTER all messages are done
    startInactivityTimer()
  }, [
    inputValue, phase, knowledge, messages, emailPromptShown,
    addMessage, clearInactivityTimers, simulateTyping, simulateReading,
    sendAgentResponse, startInactivityTimer, runConnectionSequence,
  ])

  // ── System prompt builder ──────────────────────────────────────────────────

  const buildSystemPrompt = (currentAgent: TeamMember, kb: KnowledgeBase): string => {
    const k = kb
    return `You are ${currentAgent.name} from Deum's ${currentAgent.role} team.

PERSONALITY:
${currentAgent.style || 'Helpful and friendly'}
${currentAgent.phrases?.length ? `Signature phrases: ${currentAgent.phrases.join(', ')}` : ''}

CRITICAL RULES - FOLLOW THESE STRICTLY:
1. BE CONCISE - Max 2-3 short sentences per response
2. CHECK INTEREST - After explaining something, ask if they want details
3. DON'T INFO-DUMP - Give a taste, not the whole meal
4. CONVERSATIONAL PACING - Humans pause, ask questions, gauge interest
5. Use casual language (it's, you'll, we've)
6. NO PROMO CODES - Never mention "creator10" or any codes
7. For extended trials: "email elliot@deum.video"

ACCURACY QUESTIONS: Always mention upfront: "no system is perfect, we're ~97% accurate — even Descript has imperfections"

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

FAQ:
${k.faq.slice(0, 5).map((f: any) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}

${currentAgent.can_escalate_to_founder ? `You work closely with Elliot (founder) and can mention him by name.` : ''}

Remember: Short, warm, helpful. You're a real person helping a real customer.`
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  if (!knowledge) return null

  const inputDisabled = phase === 'queuing' || phase === 'agent_assigned' || phase === 'countdown'

  const headerName = agent ? agent.name : 'Our Team'
  const headerSub  = agent
    ? `${agent.role} · ${phase === 'live' ? 'Online' : phase === 'away' ? 'On another call' : 'Joining...'}`
    : 'Ready to help'
  const statusDot  = phase === 'live' ? '#4ade80' : phase === 'away' ? '#f97316' : '#facc15'

  return (
    <>
      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-36 right-6 z-[60] bg-white shadow-xl rounded-lg p-2.5 max-w-[220px] animate-bounce-subtle">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-900 leading-snug">Questions? Click to chat</p>
            </div>
            <button onClick={() => setShowTooltip(false)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setShowTooltip(false) }}
          className="fixed bottom-20 right-6 z-50 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with our team
          </span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className={`fixed inset-0 md:inset-auto md:bottom-8 md:right-6 z-50 bg-white md:rounded-2xl shadow-2xl transition-all duration-300 ${
          isMinimized ? 'md:w-80 md:h-16' : 'w-full h-[100dvh] md:w-96 md:h-[600px]'
        } flex flex-col overflow-hidden`}>

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 md:rounded-t-2xl flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {agent?.avatar ? (
                  <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                ) : (
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                )}
                {agent && (
                  <span
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: statusDot }}
                  />
                )}
              </div>
              <div>
                <p className="font-semibold">{headerName}</p>
                <p className="text-xs opacity-90">{headerSub}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/20 rounded transition-colors">
                <Minimize2 className="w-4 h-4" />
              </button>
              <button onClick={() => { setIsOpen(false); setIsMinimized(false) }} className="p-1 hover:bg-white/20 rounded transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-0">

                {/* Empty state */}
                {phase === 'idle' && messages.length === 0 && (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-center px-6">
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Send a message and we'll connect you with a team member right away
                      </p>
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${
                    msg.sender === 'user' ? 'justify-end' :
                    msg.sender === 'system' ? 'justify-center' : 'justify-start'
                  }`}>
                    {msg.sender === 'system' ? (
                      <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{msg.text}</span>
                    ) : (
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-orange-100 to-orange-200 text-gray-900'
                          : 'bg-white shadow-sm text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{msg.text}</p>
                        <p className="text-xs opacity-40 mt-1">
                          {msg.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Queue position pill */}
                {queueMessage && (
                  <div className="flex justify-center">
                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{queueMessage}</span>
                  </div>
                )}

                {/* Queuing / routing spinner */}
                {(phase === 'queuing') && (
                  <div className="flex justify-center items-center py-6">
                    <div className="text-center space-y-3">
                      <div className="flex justify-center space-x-1.5">
                        {[0, 150, 300].map(d => (
                          <div key={d} className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{statusText}</p>
                    </div>
                  </div>
                )}

                {/* Agent assigned reveal */}
                {phase === 'agent_assigned' && agent && (
                  <div className="flex justify-center py-4">
                    <div className="text-center space-y-2">
                      {agent.avatar ? (
                        <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-full object-cover border-2 border-orange-400 mx-auto" />
                      ) : (
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-orange-600 font-semibold text-lg">{agent.name[0]}</span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">{statusText}</p>
                    </div>
                  </div>
                )}

                {/* Countdown */}
                {phase === 'countdown' && agent && (
                  <div className="flex justify-center py-4">
                    <div className="text-center space-y-2">
                      {agent.avatar ? (
                        <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-full object-cover border-2 border-orange-400 mx-auto" />
                      ) : (
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-orange-600 font-semibold text-lg">{agent.name[0]}</span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">{statusText}</p>
                      {countdown > 0 && (
                        <p className="text-sm font-semibold text-orange-500 tabular-nums">
                          0:{countdown.toString().padStart(2, '0')}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white shadow-sm rounded-2xl px-4 py-3">
                      <div className="flex space-x-1.5">
                        {[0, 150, 300].map(d => (
                          <div key={d} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0 pb-safe">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !inputDisabled && handleSend()}
                    placeholder={
                      inputDisabled ? 'Please wait...' :
                      phase === 'away' && emailPromptShown ? 'Enter your email...' :
                      'Ask about pricing, features...'
                    }
                    disabled={inputDisabled}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-orange-500 text-sm text-gray-900 placeholder:text-gray-500 disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || inputDisabled}
                    className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">Typically replies in under 30 seconds</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
