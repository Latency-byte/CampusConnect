import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-text">Campus<span>Connect</span></div>
            <p className="footer-desc">
              The all-in-one communication and learning platform for students and educators worldwide. Powered by AI, built for education.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">📘</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">💼</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="TikTok">🎵</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter/X">🐦</a>
            </div>
          </div>

          <div>
            <h4>Product</h4>
            <ul className="footer-links">
              <li><Link to="/services">Features</Link></li>
              <li><Link to="/services">Pricing</Link></li>
              <li><Link to="/ai-assistant">AI Assistant</Link></li>
              <li><a href="#">Mobile App</a></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <p>© 2026 CampusConnect Pty Ltd. All rights reserved.</p>
            <p className="footer-abn">ABN: 12 345 678 901 &nbsp;|&nbsp; ACN: 123 456 789 &nbsp;|&nbsp; Registered with ASIC</p>
          </div>
          <p className="footer-bottom-responsive" style={{ fontSize: '12px', color: '#64748B' }}>
            ⚠️ This website is for a class assignment and not for commercial purposes.
          </p>
        </div>
      </div>
    </footer>
  )
}
