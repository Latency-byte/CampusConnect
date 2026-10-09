import { useState, useEffect } from 'react'

export default function Feedback() {
  const [data, setData] = useState({ total: 0, avgRating: 0, submissions: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch('/api/feedback')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  return (
    <>
      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-tag">Community</div>
          <h1>Customer Feedback</h1>
          <p>Insights from the CampusConnect community. We listen and improve.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Loading feedback...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#DC2626' }}>Error loading feedback: {error}</p>
            </div>
          ) : (
            <>
              {/* Summary cards */}
              <div className="grid-2-gap24">
                {/* Average rating */}
                <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
                    Average Rating
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--primary)' }}>
                      {data.avgRating}
                    </div>
                    <div style={{ fontSize: 24 }}>
                      {'★'.repeat(Math.round(data.avgRating))}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
                    Based on {data.total} {data.total === 1 ? 'response' : 'responses'}
                  </p>
                </div>

                {/* Total responses */}
                <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
                    Total Responses
                  </div>
                  <div style={{ fontSize: 48, fontWeight: 800, color: 'var(--success)', marginBottom: 12 }}>
                    {data.total}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
                    Thank you for your input!
                  </p>
                </div>
              </div>

              {/* Submissions list */}
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>
                  Recent Feedback
                </h2>

                {data.submissions.length === 0 ? (
                  <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                    <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
                      No feedback yet. Help us improve — send us your thoughts!
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {data.submissions.map((submission, idx) => (
                      <div key={idx} className="card" style={{ padding: '20px 24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ fontSize: 16 }}>
                              {'★'.repeat(submission.rating)}{' '}
                              <span style={{ color: 'var(--text-muted)' }}>{'☆'.repeat(5 - submission.rating)}</span>
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                                {submission.email || 'Anonymous'}
                              </div>
                              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                {new Date(submission.timestamp).toLocaleDateString('en-AU')}
                              </div>
                            </div>
                          </div>
                          <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--primary)' }}>
                            {submission.rating}
                          </div>
                        </div>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                          {submission.feedback}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
