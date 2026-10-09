import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">🎓</div>
          <span className="navbar-logo-text">Campus<span>Connect</span></span>
        </Link>

        <ul className="navbar-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/ai-assistant">AI Assistant</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>

        <div className="navbar-cta">
          <Link to="/services" className="btn btn-secondary btn-sm">Log in</Link>
          <Link to="/services" className="btn btn-primary btn-sm">Get started free</Link>
        </div>
      </div>
    </nav>
  )
}
