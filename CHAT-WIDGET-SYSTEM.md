# Chat Widget System - Complete Implementation Guide

**What we built:** A human-like AI chat widget that feels like talking to a real support team member.

**Why it works:** Theater, timing, randomness, and personality make it indistinguishable from human chat.

**Reusability:** This system can be dropped into ANY business website with minimal customization.

---

## Core Philosophy

**Goal:** Make users believe they're chatting with a real person, not a bot.

**How:**
1. **Theater** - Simulate realistic agent assignment delays
2. **Timing** - Human-like typing speeds with natural pauses
3. **Personality** - Multiple agents with distinct voices
4. **Brevity** - Short, conversational responses (not essay dumps)
5. **Engagement** - Ask questions, check interest, be interactive

---

## Architecture

### File Structure
```
components/
  ChatWidget.tsx          # Main chat UI component
app/
  api/chat/route.ts       # LLM API endpoint (server-side)
lib/
  supabase.ts             # Chat logging client
public/
  chat-agents.json        # Agent personas (editable)
  chat-knowledge.json     # Business knowledge base (editable)
```

### Tech Stack
- **Frontend:** React + Framer Motion (animations)
- **LLM:** Claude Sonnet 4.5 via OpenRouter ($3/$15 per million tokens)
- **Logging:** Supabase (free tier)
- **Analytics:** Vercel Analytics (free on Hobby plan)

---

## 1. Visual Design

### Chat Button
- **Position:** Fixed bottom-right (24px from edges on desktop, 16px on mobile)
- **Size:** 60px circle
- **Color:** Orange gradient (#FF6B35 → #F7931E) - stands out from blue site
- **Icon:** Message circle (Lucide React)
- **Hover:** Scale 1.1, shadow glow
- **Mobile:** Full-screen chat, no auto-open

### Tooltip (Discoverability)
- **Text:** "Questions? Click to chat"
- **Position:** bottom-36 (doesn't cover button)
- **Size:** 220px width, compact
- **Animation:** EliteRose bounce (translateY: 0 → -8px → -4px → 0, 2s loop)
- **Timing:** Shows on page load (3s delay), stays 30s, repeats every 2 minutes
- **Style:** Orange background, white text, rounded, shadow

### Chat Window
- **Desktop:** 380px × 600px, bottom-right corner
- **Mobile:** Full screen overlay
- **Header:** Orange gradient bar, agent name, close button
- **Messages:** Left (agent) vs right (user) bubbles
- **Input:** Bottom bar, auto-resize textarea, send button

### Animations (Framer Motion)
```css
/* Tooltip bounce (continuous) */
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  75% { transform: translateY(-4px); }
}

/* Chat open/close */
initial={{ opacity: 0, scale: 0.8, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.8, y: 20 }}

/* Typing indicator */
3 dots with stagger animation (100ms delay each)
```

---

## 2. Chat Theater Flow

**The "magic" - makes it feel human:**

### Stage 1: Agent Assignment (4-10s random delay)
```
User clicks button
  ↓
"Connecting you with one of our team..." (system message)
  ↓
Random delay: 4000-10000ms
  ↓
"You've been assigned to [AgentName]" (system message)
```

### Stage 2: Agent Busy (9-25s random countdown)
```
"[AgentName] is [busy_message]... [countdown]s"

busy_message options (random):
- "helping another user"
- "just finishing up with another user"
- "helping another person"

Countdown: 9-25 seconds (random), updates every 1s
```

### Stage 3: Agent Greeting
```
Typing indicator appears (2-4s)
  ↓
"Hi, I'm [Name] from Deum 👋" (first message)
  ↓
Pause 800-1200ms
  ↓
Agent sends opening question (split into 2-3 short messages)
```

### Stage 4: Conversation
- User types → sends
- Agent "typing" indicator (realistic duration based on response length)
- Agent response (split on line breaks, sent with 800-1200ms pauses)
- Inactivity detection starts (2 min → 1 min → 30s → auto-close)

**Timing is CRITICAL:**
- Random delays feel natural
- Typing speed: ~3.3 chars/sec + 5-10% variation
- Pauses between multi-message replies: 800-1200ms
- System messages instant, agent messages delayed

---

## 3. Agent Persona System

### agents.json Structure
```json
{
  "agents": [
    {
      "id": "sarah",
      "name": "Sarah",
      "department": "Product",
      "emoji": "👋",
      "personality": "Warm and helpful, uses contractions, friendly but professional",
      "greeting_style": "Casual opener, then ask what brings them here"
    },
    {
      "id": "matt",
      "name": "Matt",
      "department": "Engineering",
      "emoji": "🛠️",
      "personality": "Direct and technical, gets to the point",
      "greeting_style": "Brief intro, jump to problem-solving"
    }
    // Add 3-4 more for variety
  ]
}
```

### Agent Selection
- **Random** on each new session (not sticky)
- Equal probability across all agents
- Selected agent determines: name, greeting, tone

### Personality Implementation
Baked into system prompt:
```
You are {name} from Deum, working in {department}.

Your personality: {personality}

Guidelines:
- Keep responses SHORT (1-3 sentences per message)
- Use contractions (I'm, you're, it's)
- Split longer responses into 2-3 separate messages
- Ask questions to check interest before info-dumping
- Be conversational, not corporate
- If unsure, offer to explain further

Example good responses:
- "Sure! Happy to explain 👍"
- "Makes sense. Let me know if you need anything else!"
- "Got it. So basically..."

Example bad responses:
- "I'd be delighted to assist you with that inquiry..."
- "Pursuant to your question regarding our services..."
- Giant paragraph dumps
```

---

## 4. Knowledge Base Structure

### knowledge.json Structure
```json
{
  "company_name": "Deum",
  "product_description": "AI video editor that removes filler words",
  "tagline": "Video editing on autopilot",
  
  "core_features": [
    {
      "name": "Filler removal",
      "description": "97% accuracy, removes um/uh/er/like",
      "use_case": "When user asks about accuracy or how it works"
    },
    {
      "name": "Zero timeline",
      "description": "Upload and go - no manual editing",
      "use_case": "When user asks about ease of use or ADHD friendliness"
    }
  ],
  
  "pricing": {
    "free": {
      "price": "$0",
      "limit": "1 hour/month",
      "features": ["4K quality", "Email notifications"]
    },
    "hobby": {
      "price": "$15/mo (annual) or $20/mo (monthly)",
      "limit": "10 hours/month",
      "features": ["4K quality", "Priority support"]
    }
    // Add other tiers
  },
  
  "faq": [
    {
      "question": "How accurate is it?",
      "answer": "~97%, no system is perfect",
      "follow_up": "want me to explain how it works?"
    },
    {
      "question": "Good for ADHD?",
      "answer": "Yes! Built by someone with ADHD. Zero timeline means no hyperfocus trap.",
      "context": "Founder's authentic story - got tired of Descript black holes"
    }
  ],
  
  "usp": {
    "adhd_creators": "No timeline, no decisions, no getting lost for hours",
    "speed": "10x faster than manual editing, 10min average render",
    "simplicity": "Upload → coffee break → email when ready"
  },
  
  "escalation": {
    "complex_question": "Hmm, that's a bit outside my wheelhouse. Want me to connect you with our team via email?",
    "complaint": "I hear you. Let me flag this for the team - can I grab your email?"
  }
}
```

### Knowledge Access
- Pass entire JSON to LLM in system prompt
- LLM retrieves relevant info based on user question
- Update knowledge.json to change agent responses (no code changes)

---

## 5. Conversation Guidelines (System Prompt)

```markdown
You are {agent_name} from {company_name}.

CORE RULES:
1. Keep responses VERY SHORT (1-3 sentences)
2. Split longer replies into 2-3 separate messages (humans hit return mid-thought)
3. Ask questions before info-dumping: "want me to explain?" "curious about X?"
4. Use natural language: contractions, casual tone, emojis occasionally
5. If accuracy/limitation question: mention ~97% upfront, don't oversell
6. Check interest: "let me know if you want more details!"

CONVERSATION FLOW:
- First message: Greeting + "What brings you here today?"
- User asks question → Short answer + follow-up question
- User shows interest → More detail (still brief)
- User seems satisfied → "Anything else I can help with?"

AVOID:
- Corporate speak ("I'd be delighted to assist")
- Essay-length responses
- Repeating user's question back to them
- Claiming to "not know" things in the knowledge base

WHEN STUCK:
- "Hmm, that's outside my wheelhouse - want me to connect you with the team?"
- Offer to send docs/links rather than long explanations

KNOWLEDGE BASE:
{knowledge_json}

Remember: You're a human support agent having a casual chat, not a formal chatbot.
```

---

## 6. Technical Implementation

### Chat API Route (`app/api/chat/route.ts`)

**Key features:**
- Server-side only (API key never exposed)
- Logs to Supabase asynchronously (doesn't block response)
- Returns streaming OR complete response

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Load agents and knowledge
const agents = require('@/public/chat-agents.json')
const knowledge = require('@/public/chat-knowledge.json')

async function logChat(question: string, response: string, agent: string) {
  if (!supabaseAdmin) return
  
  await supabaseAdmin.from('chat_logs').insert({
    agent,
    question,
    response,
    response_length: response.length
  })
}

export async function POST(req: NextRequest) {
  const { messages, userMessage, systemPrompt } = await req.json()
  
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }
  
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
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com',
      'X-Title': 'Your Site Chat'
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4.5',
      messages: allMessages,
      temperature: 0.8,  // Slightly random (more human)
      max_tokens: 150    // Force brevity
    })
  })
  
  const data = await response.json()
  const message = data.choices?.[0]?.message?.content || "Sorry, couldn't respond."
  
  // Extract agent name from system prompt
  const agentName = systemPrompt?.match(/You are (\w+) from/)?.[1] || 'Unknown'
  
  // Log asynchronously (don't block)
  logChat(userMessage, message, agentName).catch(console.error)
  
  return NextResponse.json({ message })
}
```

---

## 7. Chat Logging & Analytics

### Supabase Table
```sql
CREATE TABLE chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  agent TEXT NOT NULL,
  question TEXT NOT NULL,
  response TEXT NOT NULL,
  response_length INT NOT NULL,
  session_id TEXT,
  user_agent TEXT,
  ip_address INET
);

CREATE INDEX idx_chat_logs_created_at ON chat_logs(created_at DESC);
CREATE INDEX idx_chat_logs_agent ON chat_logs(agent);
```

### What to track:
- Every user question
- Every agent response
- Response length (quality metric)
- Agent name (A/B test personas)
- Timestamp (peak chat times)

### Analytics queries:
```sql
-- Most asked questions
SELECT question, COUNT(*) as count
FROM chat_logs
GROUP BY question
ORDER BY count DESC
LIMIT 20;

-- Agent performance
SELECT agent, 
  COUNT(*) as chats,
  AVG(response_length) as avg_length
FROM chat_logs
GROUP BY agent;

-- Daily volume
SELECT DATE(created_at) as date,
  COUNT(*) as total_chats
FROM chat_logs
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## 8. Customization Guide (For Other Businesses)

### To adapt this for a new business:

**1. Update branding:**
- Change chat button color (CSS)
- Update company name in prompts
- Swap logo/avatar images

**2. Create knowledge base:**
- Fill `chat-knowledge.json` with your products/services
- Add FAQ items specific to your business
- Define your USPs

**3. Design agent personas:**
- Create 3-5 agents in `chat-agents.json`
- Match your brand voice (formal vs casual)
- Department names should reflect your org

**4. Tune system prompt:**
- Adjust tone (professional vs friendly)
- Add industry-specific guidelines
- Update escalation paths (email, phone, etc.)

**5. Set up logging:**
- Create Supabase project
- Run chat_logs migration
- Add env vars to Vercel

**6. Deploy:**
- Push to Vercel
- Test on staging
- Monitor first 50 chats
- Tune based on logs

---

## 9. Cost Breakdown

### Per-chat costs:
- **LLM:** ~$0.006 (Claude Sonnet 4.5, ~400 tokens)
- **Supabase:** Free tier (500 chats/day easily)
- **Vercel:** Free tier (bandwidth negligible)

**Total:** ~$6/month for 1,000 chats

### Scaling:
- 10,000 chats/month = ~$60
- Still cheaper than hiring live chat agents
- Can switch to cheaper models if needed (Haiku = $1/month for 1K chats)

---

## 10. Quality Checklist

Before launching chat on a new site:

**Theater timing:**
- [ ] Agent assignment delay feels natural (4-10s)
- [ ] Busy countdown isn't too long (9-25s max)
- [ ] Typing speed matches message length
- [ ] Multi-message replies have natural pauses

**Personality:**
- [ ] Agents sound distinct from each other
- [ ] Tone matches your brand
- [ ] Responses are concise (not essays)
- [ ] Greetings feel human, not robotic

**Knowledge:**
- [ ] Agent answers common questions correctly
- [ ] Pricing info is accurate
- [ ] USPs are clearly communicated
- [ ] Escalation paths work

**UX:**
- [ ] Tooltip draws attention without annoying
- [ ] Mobile chat is full-screen
- [ ] Inactivity timeout is reasonable (2 min)
- [ ] Close/minimize works smoothly

**Logging:**
- [ ] Chats are being logged to Supabase
- [ ] No API errors in Vercel logs
- [ ] Analytics show pageviews

**Testing:**
- [ ] Test 10+ different questions
- [ ] Try edge cases (gibberish, long messages)
- [ ] Verify on mobile + desktop
- [ ] Check multiple browsers

---

## 11. Iteration Strategy

After first 100 chats:

**1. Review logs:**
- What questions are people asking?
- Are agents giving good answers?
- Any confusion/complaints?

**2. Update knowledge base:**
- Add missing FAQ items
- Clarify confusing answers
- Remove outdated info

**3. Tune prompts:**
- Too wordy? → Reduce max_tokens
- Too brief? → Increase max_tokens
- Wrong tone? → Adjust personality description

**4. A/B test agents:**
- Which agents get better engagement?
- Do certain names/personas convert better?
- Retire underperforming agents

**5. Optimize timing:**
- Are delays too long? → Reduce ranges
- Does it feel rushed? → Add pauses

---

## 12. Known Issues & Solutions

**Issue:** Agent sounds robotic
- **Fix:** Add more personality to system prompt, reduce formality

**Issue:** Responses too long
- **Fix:** Lower max_tokens, add "be brief" rule to prompt

**Issue:** Can't answer specific questions
- **Fix:** Update knowledge.json with missing info

**Issue:** Typing too fast/slow
- **Fix:** Adjust chars-per-second in ChatWidget.tsx

**Issue:** Tooltip annoying
- **Fix:** Increase delay before first show, reduce repeat frequency

**Issue:** Chat logs not saving
- **Fix:** Check Supabase env vars, verify table exists

---

## 13. Advanced Features (Future)

**Could add:**
- Session persistence (remember returning users)
- Handoff to real human agent (Intercom integration)
- Voice input/output (Web Speech API)
- Multi-language support (detect locale)
- Smart routing (route complex questions to specific agents)
- Sentiment analysis (flag frustrated users)
- Lead capture (ask for email mid-conversation)

---

## Summary

**You built:** A chat widget that feels indistinguishable from human chat support.

**Secret sauce:**
1. Theater (realistic delays and assignment flow)
2. Personality (multiple distinct agents)
3. Brevity (short, conversational responses)
4. Timing (human-like typing and pauses)
5. Randomness (no two sessions feel identical)

**Reusability:** Change knowledge.json + agents.json + branding = instant chat for any business.

**Cost:** ~$6/month for 1,000 chats (cheaper than hiring humans).

**Business potential:** This is a product. Package it as "ChatTheater" or similar, charge $49/mo for unlimited chats, provide white-label version.

---

**Files to preserve:**
- ChatWidget.tsx (UI component)
- app/api/chat/route.ts (backend logic)
- chat-agents.json (agent personas)
- chat-knowledge.json (business KB)
- supabase-migration-chat-logs.sql (database schema)
- This document (complete implementation guide)

**To recreate elsewhere:** Copy these files, update env vars, customize JSON files, deploy.

---

_Last updated: 2026-03-26  
Created during deum.video website rebuild  
Total development time: ~8 hours (from scratch to production-ready)_
