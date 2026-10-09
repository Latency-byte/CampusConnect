import { Link } from 'react-router-dom'

const team = [
  { name: 'Chowdhury Yousha Ibne Alam', role: 'Founder & CEO', avatar: '👨‍💼', bio: 'Visionary behind CampusConnect. Drives product strategy and investor relations.', id: 's8132127' },
  { name: 'Dan Goddard', role: 'Lead Developer', avatar: '👨‍💻', bio: 'Full-stack engineer and cybersecurity specialist. Builds and secures the CampusConnect platform.', id: 's8090152' },
]

const values = [
  { icon: '🎯', title: 'Student-first', desc: 'Every feature we build starts with the question: does this make student life better? Not easier for admins — better for learners.' },
  { icon: '🔒', title: 'Privacy by design', desc: 'Student data is never sold. We build privacy into the architecture from day one, not as an afterthought.' },
  { icon: '🌍', title: 'Education for everyone', desc: 'Learning has no borders. Our platform is designed to serve students from every background, language, and institution type.' },
  { icon: '🤖', title: 'AI as a tool, not a shortcut', desc: 'Our AI Study Assistant is built around academic integrity — it explains concepts, reviews your drafts, and quizzes you on the material. It will not write assessments for you. Submitting AI-generated work as your own violates university policy, and we take that seriously.' },
]

const milestones = [
  { date: 'Month 1', title: 'Business planning', desc: 'Market research, competitive analysis, and business model validation.' },
  { date: 'Month 2', title: 'UI/UX design', desc: 'User journey mapping, wireframes, and design system creation.' },
  { date: 'Months 3–6', title: 'Core development', desc: 'Platform build — messaging, course spaces, file sharing, and mobile app.' },
  { date: 'Months 5–7', title: 'AI integration', desc: 'Claude AI integration for study assistant, assignment feedback, and lecture summaries.' },
  { date: 'Months 8–9', title: 'Testing & beta', desc: 'System testing with partner universities, bug fixes, and user acceptance testing.' },
  { date: 'Month 11', title: 'Official launch 🚀', desc: 'Public launch with founding institution partners across Australia.' },
]

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section-tag">Our story</div>
          <h1>Built by students, for students</h1>
          <p>We got tired of juggling four apps just to get through a university day. So we built one that does it all.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="grid-2-gap80">
            <div>
              <div className="section-tag">Our mission</div>
              <h2 className="section-title">Connecting every campus, one conversation at a time</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
                CampusConnect was born out of a simple frustration: students shouldn't have to use four different apps to talk to their lecturer, submit an assignment, get study help, and check their timetable.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.8, marginBottom: 32 }}>
                We're building the platform we wished existed when we were students — one that's fast, smart, and actually works the way education does in 2026.
              </p>
              <Link to="/ai-assistant" className="btn btn-primary">Try the AI Assistant →</Link>
            </div>
            <div className="grid-2-gap16">
              {[
                { num: '10,000+', label: 'Students served', color: 'var(--primary-light)' },
                { num: '500+', label: 'Institutions', color: 'var(--success-light)' },
                { num: '4.9★', label: 'Average rating', color: '#FFF7ED' },
                { num: '50+', label: 'Countries', color: '#F3E8FF' },
              ].map(s => (
                <div key={s.label} style={{ background: s.color, borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">What we stand for</div>
            <h2 className="section-title">Our values</h2>
          </div>
          <div className="grid-2">
            {values.map(v => (
              <div key={v.title} className="card" style={{ display: 'flex', gap: 20 }}>
                <div style={{ width: 52, height: 52, background: 'var(--primary-light)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{v.icon}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">The team</div>
            <h2 className="section-title">Meet the founders</h2>
            <p className="section-subtitle">A small team with a big mission — building the future of educational communication.</p>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto' }} className="grid-2-gap32">
            {team.map(m => (
              <div key={m.name} className="card" style={{ textAlign: 'center', padding: '40px 32px' }}>
                <div style={{ width: 80, height: 80, background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, margin: '0 auto 20px' }}>{m.avatar}</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 4 }}>{m.name}</h3>
                <div className="badge badge-blue" style={{ marginBottom: 12 }}>{m.role}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>{m.bio}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Student ID: {m.id} · Victoria University</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Roadmap</div>
            <h2 className="section-title">Development timeline</h2>
          </div>
          <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 100, top: 0, bottom: 0, width: 2, background: 'var(--border)', zIndex: 0 }}></div>
            {milestones.map((m, i) => (
              <div key={m.date} style={{ display: 'flex', gap: 24, marginBottom: 32, position: 'relative' }}>
                <div style={{ width: 90, textAlign: 'right', fontSize: 12, fontWeight: 700, color: 'var(--primary)', paddingTop: 14, flexShrink: 0 }}>{m.date}</div>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: i === milestones.length - 1 ? 'var(--primary)' : 'white', border: '3px solid var(--primary)', flexShrink: 0, marginTop: 12, zIndex: 1 }}></div>
                <div className="card" style={{ flex: 1, padding: '16px 20px' }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 4 }}>{m.title}</h4>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
