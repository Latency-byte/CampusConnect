import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FeedbackWidget from './components/FeedbackWidget'
import Landing from './pages/Landing'
import Services from './pages/Services'
import AIAssistant from './pages/AIAssistant'
import Contact from './pages/Contact'
import About from './pages/About'
import Invoice from './pages/Invoice'
import Feedback from './pages/Feedback'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <div className="disclaimer-banner">
        ⚠️ This website is for a class assignment and not for commercial purposes.
      </div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>
      <Footer />
      <FeedbackWidget />
    </>
  )
}
