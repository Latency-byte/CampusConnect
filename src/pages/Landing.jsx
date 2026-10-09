import { Link } from 'react-router-dom'

const features = [
  { icon: '💬', bg: 'card-icon-blue', title: 'Smart Messaging', desc: 'Direct messages, group chats, and course discussion spaces — all in one inbox. No more switching between apps.' },
  { icon: '🤖', bg: 'card-icon-purple', title: 'AI Study Assistant', desc: 'Understand concepts faster, get feedback on your own draft, and build a personalised study plan — powered by Claude AI and designed around academic integrity.' },
  { icon: '📚', bg: 'card-icon-green', title: 'Course Spaces', desc: 'Dedicated spaces for every subject. Share files, post announcements, manage deadlines and collaborate with classmates.' },
  { icon: '📅', bg: 'card-icon-orange', title: 'Smart Calendar', desc: 'Never miss a deadline. CampusConnect syncs assignments, assessments, and events across all your courses automatically.' },
  { icon: '🌐', bg: 'card-icon-blue', title: 'Language Translation', desc: 'Instant translation for international students. Break down language barriers and participate fully in every class.' },
  { icon: '☁️', bg: 'card-icon-green', title: 'Cloud Storage', desc: 'Store and share lecture notes, recordings, and resources. Access everything on any device, anywhere, anytime.' },
]

const steps = [
  { num: '01', title: 'Sign up for free', desc: 'Create your account in under 60 seconds. No credit card required. Just your institutional email.' },
  { num: '02', title: 'Join your courses', desc: 'Find and join your university subjects. Instantly connect with classmates and teachers in dedicated spaces.' },
  { num: '03', title: 'Study smarter', desc: 'Use the AI Study Assistant to get feedback, summaries, and plans. Upgrade to Premium for the full experience.' },
]

const stats = [
  { val: '10,000+', label: 'Active Students' },
  { val: '500+', label: 'Institutions' },
  { val: '4.9★', label: 'App Store Rating' },
  { val: '24/7', label: 'AI Support' },
]

const testimonials = [
  { name: 'Priya Sharma', role: 'Engineering student, RMIT', text: 'CampusConnect replaced four apps for me. The AI assistant helped me understand concepts I was struggling with in half the time.', avatar: '👩‍💻' },
  { name: 'James Liu', role: 'Lecturer, Monash University', text: 'Managing three units used to be a headache. Now all my announcements, files, and student messages are in one place.', avatar: '👨‍🏫' },
  { name: 'Amara Okafor', role: 'International student, VU', text: 'The translation feature is a game changer. I can now participate in discussions without fear of misunderstanding anything.', avatar: '👩‍🎓' },
]

export default function Landing() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 50%, #F0FDF4 100%)', padding: '96px 0 80px', overflow: 'hidden' }}>
        <div className="container">
          <div className="grid-hero">
            <div>
              <div className="badge badge-blue" style={{ marginBottom: '20px' }}>
                🚀 Now with AI-powered study tools
              </div>
              <h1 className="hero-title">
                One platform.<br />
                <span style={{ color: 'var(--primary)' }}>Every student.</span><br />
                Every class.
              </h1>
              <p style={{ fontSize: '19px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '480px' }}>
                CampusConnect brings messaging, course spaces, and AI-powered learning tools together. Stop juggling apps — start learning.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
                <Link to="/services" className="btn btn-primary btn-lg">Get started free →</Link>
                <Link to="/ai-assistant" className="btn btn-secondary btn-lg">Try AI Assistant</Link>
              </div>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {['✓ No credit card needed', '✓ Free forever plan', '✓ AI-powered'].map(t => (
                  <span key={t} style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* App mockup SVG */}
            <div style={{ position: 'relative' }}>
              <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 25px 50px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                {/* Mockup titlebar */}
                <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }}></div>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }}></div>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }}></div>
                  <div style={{ flex: 1, background: '#E2E8F0', borderRadius: 6, padding: '4px 12px', marginLeft: 8, fontSize: 12, color: '#94A3B8' }}>campusconnect.edu.au</div>
                </div>
                {/* Mockup body */}
                <div style={{ display: 'flex', height: '320px' }}>
                  {/* Sidebar */}
                  <div style={{ width: '200px', background: '#F1F5F9', borderRight: '1px solid #E2E8F0', padding: '16px 12px', flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#64748B', marginBottom: 12, padding: '0 4px' }}>MY COURSES</div>
                    {['📐 Engineering 101', '🧪 Chemistry', '💻 Programming', '📊 Statistics'].map((c, i) => (
                      <div key={i} style={{ padding: '8px 10px', borderRadius: 8, marginBottom: 4, background: i === 0 ? '#DBEAFE' : 'transparent', color: i === 0 ? '#1D4ED8' : '#475569', fontSize: 13, fontWeight: i === 0 ? 600 : 400 }}>{c}</div>
                    ))}
                    <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: '#64748B', marginBottom: 12, padding: '0 4px' }}>MESSAGES</div>
                    {['Sarah K.', 'Study Group', 'Dr. Williams'].map((n, i) => (
                      <div key={n} style={{ padding: '8px 10px', borderRadius: 8, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: ['#DBEAFE', '#D1FAE5', '#FDE8D8'][i], fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {['SK', 'SG', 'Dr'][i]}
                        </div>
                        {n}
                        {i === 0 && <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: '#2563EB' }}></div>}
                      </div>
                    ))}
                  </div>
                  {/* Chat area */}
                  <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
                    <div style={{ background: '#F1F5F9', borderRadius: '12px 12px 12px 4px', padding: '10px 14px', maxWidth: '75%', fontSize: 13 }}>
                      Hey, did you understand the assignment question on calculus limits? 🤔
                    </div>
                    <div style={{ background: '#2563EB', color: 'white', borderRadius: '12px 12px 4px 12px', padding: '10px 14px', maxWidth: '75%', alignSelf: 'flex-end', fontSize: 13 }}>
                      Not really — I used the AI assistant to explain it!
                    </div>
                    <div style={{ background: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: 12, padding: '10px 14px', fontSize: 12 }}>
                      <span style={{ color: '#2563EB', fontWeight: 600 }}>🤖 AI Assistant: </span>
                      <span style={{ color: '#374151' }}>A limit describes the value that a function approaches as x approaches a value...</span>
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ flex: 1, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#94A3B8' }}>Type a message...</div>
                      <div style={{ background: '#2563EB', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16 }}>→</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div style={{ position: 'absolute', top: -16, right: -16, background: 'white', borderRadius: 12, padding: '10px 16px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', border: '1px solid #E2E8F0', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                🤖 AI Study Assistant <span style={{ color: '#059669' }}>Online</span>
              </div>
              <div style={{ position: 'absolute', bottom: -16, left: -16, background: 'white', borderRadius: 12, padding: '10px 16px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', border: '1px solid #E2E8F0', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                📈 10,247 students active today
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: 'var(--text-primary)', padding: '40px 0' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'white', marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 14, color: '#64748B' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Everything you need</div>
            <h2 className="section-title">One app to replace them all</h2>
            <p className="section-subtitle">Students use an average of 4 different apps to get through the day. CampusConnect brings it all together.</p>
          </div>
          <div className="grid-3">
            {features.map(f => (
              <div key={f.title} className="card">
                <div className={`card-icon ${f.bg}`}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Simple setup</div>
            <h2 className="section-title">Up and running in minutes</h2>
            <p className="section-subtitle">No complicated setup, no IT team required. Just sign up and start learning.</p>
          </div>
          <div className="grid-3">
            {steps.map(s => (
              <div key={s.num} style={{ textAlign: 'center', padding: '32px 24px' }}>
                <div style={{ width: 60, height: 60, background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>{s.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Student love</div>
            <h2 className="section-title">Trusted by students everywhere</h2>
          </div>
          <div className="grid-3">
            {testimonials.map(t => (
              <div key={t.name} className="card">
                <div style={{ fontSize: 32, marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1E40AF 100%)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="cta-title">Ready to study smarter?</h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 36 }}>Join 10,000+ students already using CampusConnect. Free forever — no credit card needed.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }}>Start for free →</Link>
            <Link to="/ai-assistant" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }}>Try AI Assistant</Link>
          </div>
        </div>
      </section>
    </>
  )
}
