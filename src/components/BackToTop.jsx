import { useEffect, useState } from 'react'
import '../styles/app-ui.css'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={handleScrollTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  )
}
