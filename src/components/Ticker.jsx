import { useEffect, useState } from 'react'
import tipsData from '../data/tips.json'
import '../styles/app-ui.css'

const tips = tipsData.slice(0, 8)

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function formatClock(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = MONTHS[date.getMonth()]
  const year = date.getFullYear()
  const time = [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((part) => String(part).padStart(2, '0'))
    .join(':')
  return `${day} ${month} ${year} | ${time}`
}

const BASE_VISITORS = 1247

function loadVisitors() {
  try {
    const stored = Number(window.localStorage.getItem('bb-visitors'))
    const base = Number.isFinite(stored) && stored >= BASE_VISITORS ? stored : BASE_VISITORS
    if (window.sessionStorage.getItem('bb-visited')) return base
    window.sessionStorage.setItem('bb-visited', '1')
    const next = base + Math.floor(Math.random() * 5) + 1
    window.localStorage.setItem('bb-visitors', String(next))
    return next
  } catch {
    return BASE_VISITORS
  }
}

export default function Ticker() {
  const [tipIndex, setTipIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const [visitors] = useState(loadVisitors)

  // Rotate through tips every 4 seconds with a short fade
  useEffect(() => {
    if (tips.length <= 1) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const interval = setInterval(() => {
      if (reduceMotion) {
        setTipIndex((index) => (index + 1) % tips.length)
        return
      }
      setFading(true)
      setTimeout(() => {
        setTipIndex((index) => (index + 1) % tips.length)
        setFading(false)
      }, 350)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const tip = tips[tipIndex]

  return (
    <div className="ticker" role="marquee" aria-label="Financial tips">
      <div className={`ticker-tip${fading ? ' fade' : ''}`}>
        <span className="badge badge-gold">
          <i className="bi bi-lightbulb"></i> Tip
        </span>
        <span>
          <strong>{tip.title}:</strong>
          {tip.text}
        </span>
      </div>
      <span className="ticker-visitors"><i className="bi bi-people" aria-hidden="true"></i> Visitors: {visitors.toLocaleString('en-US')}</span>
      <time className="ticker-clock">{formatClock(now)}</time>
    </div>
  )
}
