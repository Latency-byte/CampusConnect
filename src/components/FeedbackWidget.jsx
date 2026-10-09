import { useState } from 'react'

export default function FeedbackWidget() {
  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0 || !feedback.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, feedback: feedback.trim(), email: email.trim() || null }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setSubmitted(true)
      // Auto-close after 2 seconds
      setTimeout(() => {
        setShowModal(false)
        setSubmitted(false)
        setRating(0)
        setFeedback('')
        setEmail('')
      }, 2000)
    } catch (err) {
      console.error('Feedback submit error:', err)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setShowModal(true)}
        title="Send us your feedback"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        💬
      </button>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '24px',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '32px',
            maxWidth: '440px',
            width: '100%',
            boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
            position: 'relative',
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                lineHeight: '1',
              }}
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  We'd love your feedback
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Help us improve CampusConnect — your thoughts matter.
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Star rating */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>
                      How satisfied are you?
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          style={{
                            fontSize: '28px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            opacity: rating >= star ? 1 : 0.3,
                            transition: 'opacity 0.2s',
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback textarea */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                      What could we improve?
                    </label>
                    <textarea
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
                      placeholder="Tell us what you think..."
                      style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        resize: 'none',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>

                  {/* Optional email */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                      Email (optional — so we can follow up)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={rating === 0 || !feedback.trim() || loading}
                    className="btn btn-primary btn-full"
                    style={{
                      opacity: rating === 0 || !feedback.trim() ? 0.5 : 1,
                      cursor: rating === 0 || !feedback.trim() ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {loading ? 'Submitting...' : 'Send Feedback →'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>✓</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--success)', marginBottom: '8px' }}>
                  Thank you!
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  We really appreciate your feedback. It helps us build a better platform.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
