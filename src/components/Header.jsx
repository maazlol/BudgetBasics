import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../styles/app-ui.css'

const mainLinks = [
  { to: '/', label: 'Home' },
  { to: '/basics', label: 'Basics' },
  { to: '/needs-wants', label: 'Needs/Wants' },
  { to: '/rule-50-30-20', label: '50-30-20' },
  { to: '/savings-goals', label: 'Goals' },
  { to: '/expense-planner', label: 'Planner' },
  { to: '/money-mistakes', label: 'Mistakes' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
]

const allLinks = [
  ...mainLinks,
  { to: '/money-persona', label: 'Money Persona' },
  { to: '/feedback', label: 'Feedback' },
  { to: '/contact', label: 'Contact' },
  { to: '/search', label: 'Search' },
]

export default function Header({ dark, onToggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => setMenuOpen((open) => !open)
  const handleCloseMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={handleCloseMenu}>
          <img
            className="brand-mark"
            src="/images/black-logo.png"
            alt=""
            width="34"
            height="34"
          />
          <span className="brand-text">
            <h4>BudgetBasics</h4>
            <span className="brand-tagline">Learn - Plan - Grow</span>
          </span>
        </Link>

        <nav className="nav-desktop" aria-label="Main navigation">
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link
            to="/search"
            className="icon-btn desktop-only"
            aria-label="Search"
            title="Search"
          >
            <i className="bi bi-search"></i>
          </Link>
          <Link
            to="/feedback"
            className="icon-btn desktop-only"
            aria-label="Feedback"
            title="Feedback"
          >
            <i className="bi bi-chat-heart"></i>
          </Link>
          <Link
            to="/contact"
            className="icon-btn desktop-only"
            aria-label="Contact"
            title="Contact"
          >
            <i className="bi bi-envelope"></i>
          </Link>
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            <i className={dark ? 'bi bi-sun' : 'bi bi-moon-stars'}></i>
          </button>
          <Link to="/basics" className="btn btn-primary header-cta desktop-only">
            Start Learning <i className="bi bi-arrow-right" aria-hidden="true"></i>
          </Link>
          <button
            type="button"
            className="icon-btn hamburger"
            onClick={handleToggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <i className={menuOpen ? 'bi bi-x-lg' : 'bi bi-list'}></i>
          </button>
        </div>
      </div>

      <nav
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        {allLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={handleCloseMenu}
          >
            {link.label}
          </NavLink>
        ))}
        <div className="mobile-menu-actions">
          <Link to="/basics" className="btn btn-primary" onClick={handleCloseMenu}>
            Start Learning
          </Link>
        </div>
      </nav>
    </header>
  )
}
