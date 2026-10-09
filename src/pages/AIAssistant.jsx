import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ── Constants ─────────────────────────────────────────────────────────────────
const FREE_LIMIT = 5

// Stable session identifier — persists across page reloads but is NOT an API key.
// The server uses this to track message count per browser session.
const getSessionId = () => {
  let id = localStorage.getItem('cc_session_id')
  if (!id) {
    id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem('cc_session_id', id)
  }
  return id
}

// ── Suggested prompts ─────────────────────────────────────────────────────────
const SUGGESTED_PROMPTS = [
  { icon: '💡', text: 'Explain this concept to me in simpler terms' },
  { icon: '📝', text: 'Review my draft and tell me what\'s weak' },
  { icon: '🧠', text: 'Quiz me on this topic' },
  { icon: '📅', text: 'Help me plan my study schedule for exams' },
  { icon: '🔢', text: 'Break this problem down step by step' },
  { icon: '❓', text: 'What questions should I be asking about this topic?' },
]

// ── Sub-components ────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: '50%', background: 'var(--text-muted)',
          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
        }} />
      ))}
      <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.8);opacity:0.4} 40%{transform:scale(1.1);opacity:1} }`}</style>
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 16, gap: 10, alignItems: 'flex-start' }}>
      {!isUser && (
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, marginTop: 2 }}>🤖</div>
      )}
      <div style={{
        maxWidth: '72%', padding: '12px 16px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
        background: isUser ? 'var(--primary)' : 'white',
        color: isUser ? 'white' : 'var(--text-primary)',
        fontSize: 15, lineHeight: 1.6, boxShadow: 'var(--shadow)',
        border: isUser ? 'none' : '1px solid var(--border)', whiteSpace: 'pre-wrap',
      }}>
        {msg.content}
      </div>
      {isUser && (
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, marginTop: 2 }}>👤</div>
      )}
    </div>
  )
}

function UpgradeModal({ onLogin, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 24 }}>
      <div style={{ background: 'white', borderRadius: 20, padding: '40px', maxWidth: 480, width: '100%', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, color: 'var(--text-muted)', cursor: 'pointer', lineHeight: 1 }}>✕</button>
        <div style={{ width: 64, height: 64, background: 'var(--warning-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, margin: '0 auto 20px' }}>🚀</div>
        <h2 style={{ textAlign: 'center', marginBottom: 8, fontSize: 22, fontWeight: 700 }}>You've used your free messages</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 24, fontSize: 15 }}>
          Upgrade to Premium for unlimited access to the AI Study Assistant and everything below.
        </p>
        <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            '✓ Unlimited AI Study Assistant messages',
            '✓ Draft feedback & concept explanations',
            '✓ Automatic lecture summaries',
            '✓ Smart study planner & exam scheduler',
            '✓ 50GB cloud storage',
          ].map(f => (
            <li key={f} style={{ fontSize: 14, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{f.slice(0, 1)}</span>
              {f.slice(1)}
            </li>
          ))}
        </ul>
        <button className="btn btn-primary btn-full btn-lg" onClick={onLogin} style={{ marginBottom: 12 }}>
          Log in to Premium →
        </button>
        <div style={{ textAlign: 'center' }}>
          <Link to="/services" style={{ fontSize: 14, color: 'var(--primary)', textDecoration: 'none' }}>View pricing plans</Link>
        </div>
      </div>
    </div>
  )
}

function PremiumLoginModal({ onSuccess, onClose }) {
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!password) return
    setLoginError('')
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error?.message || 'Login failed')
      await onSuccess(data.token)
    } catch (err) {
      setLoginError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 24 }}>
      <div style={{ background: 'white', borderRadius: 20, padding: '40px', maxWidth: 420, width: '100%', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, color: 'var(--text-muted)', cursor: 'pointer', lineHeight: 1 }}>✕</button>
        <div style={{ width: 56, height: 56, background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 20px' }}>⭐</div>
        <h2 style={{ textAlign: 'center', marginBottom: 8, fontSize: 20, fontWeight: 700 }}>Log in to Premium</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>
          Enter your premium access token to unlock unlimited AI access.
        </p>
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label className="form-label">Premium Token</label>
          <input
            className="form-input"
            type="password"
            placeholder="Enter your premium token"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            autoFocus
          />
        </div>
        {loginError && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius)', padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#DC2626' }}>
            ⚠️ {loginError}
          </div>
        )}
        <button className="btn btn-primary btn-full" onClick={handleLogin} disabled={!password || loading}>
          {loading ? 'Logging in...' : 'Log in →'}
        </button>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AIAssistant() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [remaining, setRemaining] = useState(FREE_LIMIT)
  const [premiumToken, setPremiumToken] = useState(() => localStorage.getItem('cc_premium_token') || '')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showLoginSuccess, setShowLoginSuccess] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  const isPremium = Boolean(premiumToken)
  const isLimitReached = !isPremium && remaining <= 0

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const content = (text || input).trim()
    if (!content || loading || isLimitReached) return

    setError('')
    setInput('')

    const userMsg = { role: 'user', content }
    const history = [...messages, userMsg]
    setMessages(history)
    setLoading(true)

    try {
      const url = isPremium ? '/api/chat' : '/api/chat/free'
      const headers = { 'Content-Type': 'application/json' }
      if (isPremium) headers['Authorization'] = `Bearer ${premiumToken}`

      const body = isPremium
        ? { messages: history }
        : { messages: history, sessionId: getSessionId() }

      const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })

      if (res.status === 402) {
        // Free limit reached — revert and show upgrade modal
        setRemaining(0)
        setMessages(messages)
        setInput(content)
        setShowUpgradeModal(true)
        return
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error?.message || `Server error ${res.status}`)
      }

      const data = await res.json()
      setMessages([...history, { role: 'assistant', content: data.text }])

      if (!isPremium && typeof data.remaining === 'number') {
        setRemaining(data.remaining)
        if (data.remaining === 0) setShowUpgradeModal(true)
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
      setMessages(messages)
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  const handleLoginSuccess = (token) => {
    localStorage.setItem('cc_premium_token', token)
    setPremiumToken(token)
    setShowLoginModal(false)
    setShowUpgradeModal(false)
    setShowLoginSuccess(true)
    setTimeout(() => inputRef.current?.focus(), 100)
    // Auto-hide success message after 6 seconds
    setTimeout(() => setShowLoginSuccess(false), 6000)
  }

  const logoutPremium = () => {
    localStorage.removeItem('cc_premium_token')
    setPremiumToken('')
    setRemaining(FREE_LIMIT)
    setMessages([])
    setError('')
  }

  const resetDemo = async () => {
    try {
      await fetch('/api/reset-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: getSessionId() }),
      })
      setRemaining(FREE_LIMIT)
      setMessages([])
      setError('')
      setShowUpgradeModal(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    } catch {
      // Server might not be running — reset locally anyway
      setRemaining(FREE_LIMIT)
      setMessages([])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([])
    setError('')
    inputRef.current?.focus()
  }

  // Remaining counter colour: orange when ≤ 2, muted otherwise
  const remainingColor = remaining <= 2 ? 'var(--warning)' : 'var(--text-secondary)'

  return (
    <>
      {showUpgradeModal && (
        <UpgradeModal
          onLogin={() => { setShowUpgradeModal(false); setShowLoginModal(true) }}
          onClose={() => setShowUpgradeModal(false)}
        />
      )}
      {showLoginModal && (
        <PremiumLoginModal
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 105px)' }}>

        {/* ── Header bar ────────────────────────────────────────────────────── */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, gap: 12 }}>

          {/* Left: identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <div style={{ width: 40, height: 40, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🤖</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>CampusConnect AI Study Assistant</div>
              <div style={{ fontSize: 12, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} />
                Powered by Gemini · Online
              </div>
            </div>
          </div>

          {/* Right: tier badge + actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>

            {/* Tier indicator */}
            {isPremium ? (
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)', background: 'var(--success-light)', padding: '5px 12px', borderRadius: 20, border: '1px solid #A7F3D0' }}>
                ⭐ Premium · Unlimited access
              </div>
            ) : (
              <div style={{ fontSize: 13, fontWeight: 500, color: remainingColor, background: remaining <= 2 ? 'var(--warning-light)' : 'var(--surface)', padding: '5px 12px', borderRadius: 20, border: `1px solid ${remaining <= 2 ? '#FDE68A' : 'var(--border)'}` }}>
                Free tier · {remaining} of {FREE_LIMIT} messages remaining
              </div>
            )}

            {/* Premium login / logout */}
            {!isPremium && (
              <button className="btn btn-primary btn-sm" onClick={() => setShowLoginModal(true)}>
                Log in to Premium
              </button>
            )}
            {isPremium && (
              <button className="btn btn-ghost btn-sm" onClick={logoutPremium}>Log out</button>
            )}

            {/* Clear chat */}
            {messages.length > 0 && (
              <button className="btn btn-ghost btn-sm" onClick={clearChat}>🗑 Clear</button>
            )}

            {/* Demo reset — discreet, clearly labelled */}
            <button
              onClick={resetDemo}
              title="Demo only — resets your free message counter"
              style={{ fontSize: 11, color: 'var(--text-muted)', background: 'none', border: '1px dashed var(--border)', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
            >
              ↺ Reset demo
            </button>
          </div>
        </div>

        {/* ── Messages ──────────────────────────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: 'var(--surface)' }}>

          {showLoginSuccess && (
            <div style={{ maxWidth: 800, margin: '0 auto 24px' }}>
              <div style={{ background: 'var(--success-light)', border: '1px solid var(--success)', borderRadius: 'var(--radius-md)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>✓</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--success)', marginBottom: 2 }}>Premium activated!</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    You now have unlimited access to the AI Study Assistant.{' '}
                    <Link to="/invoice" style={{ color: 'var(--success)', fontWeight: 600, textDecoration: 'none' }}>View your invoice →</Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {messages.length === 0 && (
            <div style={{ maxWidth: 720, margin: '0 auto' }}>

              {/* Academic integrity notice */}
              <div style={{ background: 'var(--primary-light)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '14px 18px', marginBottom: 28, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>🎓</span>
                <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                  <strong>Built for learning, not shortcuts.</strong> CampusConnect AI is trained on university-approved resources and will not write assessments for you — it helps you understand the material and improve your own work.
                </p>
              </div>

              <div style={{ textAlign: 'center', padding: '32px 24px 40px' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>📚</div>
                <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>What would you like to learn today?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
                  I can explain concepts, give feedback on your draft, quiz you on a topic, and help you study smarter — not do the work for you.
                </p>
              </div>

              <div className="grid-2-gap12">
                {SUGGESTED_PROMPTS.map(p => (
                  <button
                    key={p.text}
                    onClick={() => sendMessage(p.text)}
                    disabled={isLimitReached}
                    style={{
                      background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
                      padding: '14px 16px', textAlign: 'left', cursor: isLimitReached ? 'not-allowed' : 'pointer',
                      fontSize: 14, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10,
                      transition: 'all 0.15s', fontFamily: 'inherit', opacity: isLimitReached ? 0.5 : 1,
                    }}
                    onMouseEnter={e => { if (!isLimitReached) { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'var(--primary-light)' } }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'white' }}
                  >
                    <span style={{ fontSize: 20 }}>{p.icon}</span>
                    <span>{p.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.length > 0 && (
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              {messages.map((m, i) => <Message key={i} msg={m} />)}
              {loading && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, marginTop: 2 }}>🤖</div>
                  <div style={{ background: 'white', padding: '12px 16px', borderRadius: '4px 18px 18px 18px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              {error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: 16, fontSize: 14, color: '#DC2626' }}>
                  ⚠️ {error}
                </div>
              )}
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* ── Input bar ─────────────────────────────────────────────────────── */}
        <div style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '16px 24px', flexShrink: 0 }}>
          {isLimitReached ? (
            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
              <p style={{ color: 'var(--warning)', fontWeight: 600, marginBottom: 10 }}>
                You've used all {FREE_LIMIT} free messages for this session.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => setShowLoginModal(true)}>Log in to Premium →</button>
                <Link to="/services" className="btn btn-secondary">View pricing</Link>
              </div>
            </div>
          ) : (
            <>
              <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                <textarea
                  ref={inputRef}
                  className="form-textarea"
                  placeholder="Ask me to explain a concept, review your draft, quiz you, or help you plan your study..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  style={{ minHeight: 52, maxHeight: 160, resize: 'none', flex: 1, borderRadius: 'var(--radius-md)', lineHeight: 1.5, paddingTop: 14 }}
                  rows={1}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  style={{ height: 52, padding: '0 20px', borderRadius: 'var(--radius-md)', flexShrink: 0, fontSize: 18 }}
                >
                  {loading ? '⏳' : '→'}
                </button>
              </div>
              <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                Press Enter to send · Shift+Enter for new line · Always verify important information with your instructor
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
