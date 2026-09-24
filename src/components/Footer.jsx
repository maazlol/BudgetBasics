import { Link } from 'react-router-dom'
import '../styles/app-ui.css'

const learnLinks = [
  { to: '/basics', label: 'Budgeting Basics' },
  { to: '/needs-wants', label: 'Needs vs Wants' },
  { to: '/rule-50-30-20', label: '50-30-20 Rule' },
  { to: '/savings-goals', label: 'Savings Goals' },
  { to: '/expense-planner', label: 'Expense Planner' },
  { to: '/money-mistakes', label: 'Money Mistakes' },
]

const companyLinks = [
  { to: '/about', label: 'About' },
  { to: '/feedback', label: 'Feedback' },
  { to: '/contact', label: 'Contact' },
]

const sitemapLinks = [
  { to: '/', label: 'Home' },
  { to: '/basics', label: 'Basics' },
  { to: '/needs-wants', label: 'Needs vs Wants' },
  { to: '/rule-50-30-20', label: '50-30-20' },
  { to: '/savings-goals', label: 'Savings Goals' },
  { to: '/expense-planner', label: 'Expense Planner' },
  { to: '/money-mistakes', label: 'Money Mistakes' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/search', label: 'Search' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Link to="/" className="brand">
              <span className="brand-text">
                <h2>BudgetBasics</h2>
                <span className="footer-tagline">Learn - Plan - Grow</span>
              </span>
            </Link>
            <p>
              Friendly, bite-sized lessons that help students and first-time
              earners understand money, build savings, and spend with a plan.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                <i className="bi bi-instagram" aria-hidden="true"></i>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube">
                <i className="bi bi-youtube" aria-hidden="true"></i>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" title="X">
                <i className="bi bi-twitter-x" aria-hidden="true"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <i className="bi bi-linkedin" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Learn</h3>
            <ul>
              {learnLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Sitemap</h3>
            <ul>
              {sitemapLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 BudgetBasics - Web Innovation Unleashed</span>
          <span>Built for learners. Explore at your own pace.</span>
        </div>
      </div>
    </footer>
  )
}
