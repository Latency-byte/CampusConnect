/**
 * CampusConnect API Server
 * Handles AI Study Assistant requests with a metered free tier and premium auth.
 *
 * Endpoints:
 *   POST /api/chat/free   — free tier, rate-limited to FREE_LIMIT messages per session
 *   POST /api/chat        — premium, requires Bearer token
 *   POST /api/login       — exchange password for premium token
 *   POST /api/reset-demo  — [DEMO ONLY] reset session message count
 *
 * AI provider: Google Gemini (gemini-2.5-flash)
 * Key stays server-side — never sent to the browser.
 */
import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// ── Config ────────────────────────────────────────────────────────────────────
const PORT          = process.env.PORT          || 3001
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const PREMIUM_TOKEN  = process.env.PREMIUM_TOKEN  || 'premium-demo-token'
const FREE_LIMIT     = 5
const GEMINI_MODEL   = 'gemini-3.1-flash-lite'
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent`

// ── System prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the CampusConnect AI Study Assistant — a learning support tool trained on university-approved educational resources and course materials. Your role is to help students build genuine understanding and develop their own academic skills.

WHAT YOU WILL DO:
- Explain concepts clearly using examples and analogies suited to the student's level
- Ask Socratic questions to guide students toward their own conclusions
- Review a student's draft and give specific, constructive feedback on their own work
- Create personalised study plans and exam schedules
- Generate practice questions and quiz students on topics
- Break complex problems into manageable steps
- Summarise course material to support comprehension
- Point students toward relevant course resources and further reading
- Help with language and structure in ways that develop the student's own voice

WHAT YOU WILL NOT DO:
- Write full assessments, essays, reports, or assignment answers — under any circumstances
- Complete graded work on a student's behalf
- Provide answers to take-home exams or graded quizzes

If a student asks you to write an assessment or complete graded work for them, politely decline and instead offer to: plan the structure together, explain the underlying concepts, review their own draft, or generate practice questions on the topic.

Always remind students: submitting AI-generated work as your own violates your university's academic integrity policy and can result in serious academic consequences including misconduct charges.

Tone: Be encouraging, patient, and academically rigorous. Celebrate effort and progress. Keep responses focused and well-structured — use bullet points and headings where helpful.`

// ── In-memory session store — Map<sessionId, messageCount> ───────────────────
// NOTE: Demo-only in-memory store. Resets on server restart.
const sessionCounts = new Map()

// ── In-memory feedback store — array of { rating, feedback, email?, timestamp } ──────
const feedbackList = []

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert our internal message format to Gemini's contents array.
 *  Internal: { role: 'user' | 'assistant', content: string }
 *  Gemini:   { role: 'user' | 'model',     parts: [{ text: string }] }
 */
function toGeminiMessages(messages) {
  return messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))
}

/** Call the Gemini API and return the response text.
 *  Throws a typed error with a .status and .clientMessage for the caller.
 */
async function callGemini(messages) {
  if (!GEMINI_API_KEY) {
    console.error('[Gemini] GEMINI_API_KEY is not set')
    throw Object.assign(new Error('AI provider not configured'), { status: 500, clientMessage: 'AI provider not configured on the server' })
  }

  const body = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: toGeminiMessages(messages),
    generationConfig: { maxOutputTokens: 1500, temperature: 0.7 },
  }

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY,   // key stays server-side, never in URL
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    const geminiMsg = errBody?.error?.message || `Gemini HTTP ${res.status}`

    if (res.status === 429) {
      console.warn('[Gemini 429] Rate limit hit')
      throw Object.assign(
        new Error('Rate limited by Gemini'),
        { status: 429, clientMessage: 'The assistant is busy, please try again in a moment' }
      )
    }

    if (res.status === 400) {
      // Almost always a missing/invalid key or malformed request — log in full for debugging
      console.error('[Gemini 400] Bad request —', geminiMsg, '| body:', JSON.stringify(errBody))
      throw Object.assign(
        new Error(geminiMsg),
        { status: 400, clientMessage: 'Bad request to AI provider — check your GEMINI_API_KEY and request shape' }
      )
    }

    console.error(`[Gemini ${res.status}]`, geminiMsg)
    throw Object.assign(new Error(geminiMsg), { status: res.status, clientMessage: geminiMsg })
  }

  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    console.error('[Gemini] Unexpected response shape:', JSON.stringify(data))
    throw Object.assign(
      new Error('Unexpected response from AI provider'),
      { status: 500, clientMessage: 'Unexpected response from AI provider' }
    )
  }

  return text
}

/** Shared error handler — maps callGemini errors to HTTP responses. */
function handleGeminiError(err, res, label) {
  console.error(`[${label}]`, err.message)
  const httpStatus = err.status === 429 ? 503 : 500
  res.status(httpStatus).json({ error: { message: err.clientMessage || err.message } })
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return 'messages must be a non-empty array'
  }
  return null
}

// ── POST /api/chat/free ───────────────────────────────────────────────────────
app.post('/api/chat/free', async (req, res) => {
  const { messages, sessionId } = req.body

  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ error: { message: 'sessionId is required' } })
  }

  const validationError = validateMessages(messages)
  if (validationError) {
    return res.status(400).json({ error: { message: validationError } })
  }

  const count = sessionCounts.get(sessionId) || 0

  if (count >= FREE_LIMIT) {
    return res.status(402).json({
      error: { message: 'Free limit reached', upgradeRequired: true },
    })
  }

  try {
    const text = await callGemini(messages)

    const newCount = count + 1
    sessionCounts.set(sessionId, newCount)
    const remaining = FREE_LIMIT - newCount

    // Normalised response — frontend reads data.text and data.remaining
    res.json({ text, remaining })
  } catch (err) {
    handleGeminiError(err, res, 'chat/free')
  }
})

// ── POST /api/chat (premium) ──────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const auth = req.headers['authorization']
  if (!auth || auth !== `Bearer ${PREMIUM_TOKEN}`) {
    return res.status(401).json({ error: { message: 'Invalid or missing premium token' } })
  }

  const { messages } = req.body
  const validationError = validateMessages(messages)
  if (validationError) {
    return res.status(400).json({ error: { message: validationError } })
  }

  try {
    const text = await callGemini(messages)
    // Normalised response — frontend reads data.text
    res.json({ text })
  } catch (err) {
    handleGeminiError(err, res, 'chat')
  }
})

// ── POST /api/login ───────────────────────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { password } = req.body
  if (!password) {
    return res.status(400).json({ error: { message: 'password is required' } })
  }
  if (password === PREMIUM_TOKEN) {
    res.json({ token: PREMIUM_TOKEN })
  } else {
    res.status(401).json({ error: { message: 'Invalid credentials' } })
  }
})

// ── POST /api/reset-demo ──────────────────────────────────────────────────────
// DEMO CONVENIENCE ONLY — not a production feature.
app.post('/api/reset-demo', (req, res) => {
  const { sessionId } = req.body
  if (sessionId) {
    sessionCounts.delete(sessionId)
    console.log(`[DEMO] Reset session: ${sessionId}`)
    res.json({ message: 'Session reset', remaining: FREE_LIMIT })
  } else {
    sessionCounts.clear()
    console.log('[DEMO] All sessions reset')
    res.json({ message: 'All sessions reset', remaining: FREE_LIMIT })
  }
})

// ── POST /api/feedback ─────────────────────────────────────────────────────────
app.post('/api/feedback', (req, res) => {
  const { rating, feedback, email } = req.body

  if (!rating || !feedback || typeof feedback !== 'string' || feedback.trim().length === 0) {
    return res.status(400).json({ error: { message: 'rating and feedback are required' } })
  }

  const submission = {
    rating: Math.max(1, Math.min(5, parseInt(rating))),
    feedback: feedback.trim(),
    email: email && typeof email === 'string' ? email.trim() : null,
    timestamp: new Date().toISOString(),
  }

  feedbackList.push(submission)
  console.log(`[Feedback] New submission: ${submission.rating}★ from ${submission.email || 'anonymous'}`)
  res.status(201).json({ message: 'Thank you for your feedback!', id: feedbackList.length - 1 })
})

// ── GET /api/feedback ──────────────────────────────────────────────────────────
app.get('/api/feedback', (req, res) => {
  const avgRating = feedbackList.length > 0
    ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(2)
    : 0

  res.json({
    total: feedbackList.length,
    avgRating: parseFloat(avgRating),
    submissions: feedbackList,
  })
})

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`CampusConnect API server running on http://localhost:${PORT}`)
  console.log(`AI provider: Google Gemini (${GEMINI_MODEL})`)
  console.log(`Free limit: ${FREE_LIMIT} messages per session`)
  console.log(`Premium token: ${PREMIUM_TOKEN}`)
  if (!GEMINI_API_KEY) {
    console.warn('⚠  GEMINI_API_KEY is not set — get one at https://aistudio.google.com/apikey')
  }
})
