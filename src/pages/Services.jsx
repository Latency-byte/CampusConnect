import { Link } from 'react-router-dom'

const freeFeatures = [
  '✓ Student & teacher messaging',
  '✓ Course discussion spaces',
  '✓ File sharing (2GB storage)',
  '✓ Announcements & calendar',
  '✓ Multi-device access',
  '✓ Up to 5 course spaces',
  '✓ 5 AI Study Assistant messages / month',
]

const premiumFeatures = [
  '✓ Everything in Free',
  '✓ Unlimited AI Study Assistant messages',
  '✓ Draft review & concept explanations (unlimited)',
  '✓ Lecture summaries for better comprehension',
  '✓ Smart study planner & exam scheduler',
  '✓ Language translation (50+ languages)',
  '✓ 50GB cloud storage',
  '✓ Priority support',
]

const institutionFeatures = [
  '✓ Everything in Premium',
  '✓ Institution-wide deployment',
  '✓ Admin dashboard & analytics',
  '✓ LMS integration (Moodle, Canvas)',
  '✓ Custom branding',
  '✓ Dedicated account manager',
  '✓ SLA & uptime guarantee',
  '✓ Bulk user management',
]

const allFeatures = [
  { label: 'Messaging & chat', free: '✓', premium: '✓', institution: '✓' },
  { label: 'Course spaces', free: 'Up to 5', premium: 'Unlimited', institution: 'Unlimited' },
  { label: 'File storage', free: '2GB', premium: '50GB', institution: '500GB' },
  { label: 'AI Study Assistant', free: '5 msgs / month', premium: '✓ Unlimited', institution: '✓ Unlimited' },
  { label: 'Draft feedback & concept explanations', free: '✗', premium: '✓', institution: '✓' },
  { label: 'Lecture summaries for comprehension', free: '✗', premium: '✓', institution: '✓' },
  { label: 'Language translation', free: '✗', premium: '✓', institution: '✓' },
  { label: 'Admin dashboard', free: '✗', premium: '✗', institution: '✓' },
  { label: 'LMS integration', free: '✗', premium: '✗', institution: '✓' },
  { label: 'Support', free: 'Community', premium: 'Priority email', institution: 'Dedicated manager' },
]

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-tag">Pricing</div>
          <h1>Simple, honest pricing</h1>
          <p>Start free. Upgrade when you're ready. No hidden fees — ever.</p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section">
        <div className="container">
          <div className="grid-pricing">

            {/* Free */}
            <div className="card" style={{ padding: '36px' }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Free</div>
                <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-1px', marginBottom: 4 }}>$0</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Forever free — no credit card</div>
              </div>
              <div className="divider" />
              <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {freeFeatures.map(f => (
                  <li key={f} style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{f}</li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-secondary btn-full">Get started free</Link>
            </div>

            {/* Premium */}
            <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-md)', padding: '36px', boxShadow: '0 20px 40px rgba(37,99,235,0.25)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>MOST POPULAR</div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Premium</div>
                <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-1px', marginBottom: 4, color: 'white' }}>$9</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>per student / month</div>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)', margin: '0 0 24px' }} />
              <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {premiumFeatures.map(f => (
                  <li key={f} style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>{f}</li>
                ))}
              </ul>

              {/* PayPal Payment Button */}
              <div style={{ marginBottom: 12 }}>
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                  <input type="hidden" name="cmd" value="_xclick" />
                  <input type="hidden" name="business" value="campusconnect@example.com" />
                  <input type="hidden" name="item_name" value="CampusConnect Premium - Monthly Subscription" />
                  <input type="hidden" name="amount" value="9.00" />
                  <input type="hidden" name="currency_code" value="AUD" />
                  <button type="submit" className="btn btn-full" style={{ background: '#FFC439', color: '#003087', fontWeight: 700, fontSize: 15, padding: '14px', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: 'none', cursor: 'pointer' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 3h8.5C19.1 3 21 4.9 21 7.5c0 3.3-2.4 6-5.5 6.5L14 14H10l-1 6H6l2-17z" fill="#003087"/>
                      <path d="M9.5 5h7C19 5 20.5 6.5 20.5 9c0 2.8-2 5-4.5 5.5L14.5 15H11l-.5 4H7.5l2-14z" fill="#009cde"/>
                    </svg>
                    Pay with PayPal — AUD $9/mo
                  </button>
                </form>
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>Secure payment via PayPal. Cancel anytime.</p>
              <Link to="/invoice" style={{ display: 'block', textAlign: 'center', marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.8)', textDecoration: 'underline' }}>View sample invoice →</Link>
            </div>

            {/* Institution */}
            <div className="card" style={{ padding: '36px' }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Institution</div>
                <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-1px', marginBottom: 4 }}>Custom</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Per-seat pricing for institutions</div>
              </div>
              <div className="divider" />
              <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {institutionFeatures.map(f => (
                  <li key={f} style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{f}</li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary btn-full">Contact sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="section-sm" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Full feature comparison</h2>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-scroll">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--surface)' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>Feature</th>
                  <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>Free</th>
                  <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: 14, fontWeight: 700, color: 'var(--primary)', borderBottom: '1px solid var(--border)', background: 'var(--primary-light)' }}>Premium</th>
                  <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>Institution</th>
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((f, i) => (
                  <tr key={f.label} style={{ background: i % 2 === 0 ? 'white' : 'var(--surface)' }}>
                    <td style={{ padding: '14px 24px', fontSize: 14, fontWeight: 500, borderBottom: '1px solid var(--border)' }}>{f.label}</td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: 13, color: f.free === '✗' ? 'var(--text-muted)' : 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>{f.free}</td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: 13, color: f.premium === '✗' ? 'var(--text-muted)' : 'var(--primary)', fontWeight: f.premium !== '✗' ? 600 : 400, background: 'rgba(37,99,235,0.03)', borderBottom: '1px solid var(--border)' }}>{f.premium}</td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: 13, color: f.institution === '✗' ? 'var(--text-muted)' : 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>{f.institution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
