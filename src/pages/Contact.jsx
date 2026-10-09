import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
    }, 1200)
  }

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  return (
    <>
      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-tag">Get in touch</div>
          <h1>Contact us</h1>
          <p>Have a question, partnership enquiry, or need support? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '64px', alignItems: 'start' }}>

            {/* Contact form */}
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Send us a message</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>We respond to all enquiries within 24 hours on business days.</p>

              {submitted ? (
                <div style={{ background: 'var(--success-light)', border: '1px solid #A7F3D0', borderRadius: 'var(--radius-md)', padding: '32px', textAlign: 'center' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                  <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Message sent!</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Thanks, {form.name}. We'll get back to you at {form.email} within 24 hours.</p>
                  <button className="btn btn-secondary" onClick={() => { setSubmitted(false); setForm({ name:'', email:'', subject:'', message:'' }) }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Full name *</label>
                      <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email address *</label>
                      <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@university.edu.au" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <select className="form-select form-input" name="subject" value={form.subject} onChange={handleChange} required>
                      <option value="">Select a topic...</option>
                      <option>General enquiry</option>
                      <option>Institution partnership</option>
                      <option>Technical support</option>
                      <option>Premium subscription</option>
                      <option>Press & media</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-textarea" name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help..." required style={{ minHeight: 140 }} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={sending}>
                    {sending ? 'Sending...' : 'Send message →'}
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12, textAlign: 'center' }}>
                    By submitting, you agree to our <a href="#" style={{ color: 'var(--primary)' }}>Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>

            {/* Contact info + map */}
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 28 }}>Our details</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
                {[
                  { icon: '📍', label: 'Address', val: 'Victoria University, Footscray Park Campus\nBallarat Rd, Footscray VIC 3011, Australia' },
                  { icon: '✉️', label: 'Email', val: 'hello@campusconnect.edu.au' },
                  { icon: '📞', label: 'Phone', val: '+61 3 9000 0000' },
                  { icon: '🕐', label: 'Business hours', val: 'Mon–Fri, 9am–5pm AEST' },
                  { icon: '🏢', label: 'ABN', val: '12 345 678 901 (Registered with ASIC)' },
                ].map(i => (
                  <div key={i.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, background: 'var(--primary-light)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{i.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-muted)', marginBottom: 2 }}>{i.label}</div>
                      <div style={{ fontSize: 15, whiteSpace: 'pre-line' }}>{i.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Follow us</h3>
              <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
                {[
                  { icon: '📘', label: 'Facebook', url: 'https://facebook.com' },
                  { icon: '📸', label: 'Instagram', url: 'https://instagram.com' },
                  { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com' },
                  { icon: '🎵', label: 'TikTok', url: 'https://tiktok.com' },
                  { icon: '🐦', label: 'Twitter/X', url: 'https://twitter.com' },
                ].map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label}
                    style={{ width: 44, height: 44, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, textDecoration: 'none', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='var(--primary-light)'; e.currentTarget.style.borderColor='var(--primary)' }}
                    onMouseLeave={e => { e.currentTarget.style.background='var(--surface)'; e.currentTarget.style.borderColor='var(--border)' }}>
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Google Maps embed — Victoria University Footscray Park */}
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
                <iframe
                  title="CampusConnect Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.2!2d144.8980!3d-37.7995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4e93d64c99%3A0x7a89cd1b61e4f05!2sVictoria%20University%20Footscray%20Park%20Campus!5e0!3m2!1sen!2sau!4v1234567890"
                  width="100%"
                  height="240"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ quick links */}
      <section className="section-sm" style={{ background: 'var(--surface)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Looking for something else?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 28 }}>We might already have the answer.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-secondary">View pricing</Link>
            <Link to="/ai-assistant" className="btn btn-secondary">Try AI Assistant</Link>
            <Link to="/about" className="btn btn-secondary">About us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
