import { Link } from 'react-router-dom'
import '../styles/pages-content.css'

const purposes = [
  {
    icon: 'bi-mortarboard',
    tone: 'violet',
    title: 'Educate',
    text: 'Short, jargon-free modules that explain budgeting fundamentals in plain language.',
  },
  {
    icon: 'bi-pencil',
    tone: 'mint',
    title: 'Practice',
    text: 'Planners and examples you can try with pretend numbers before real money is involved.',
  },
  {
    icon: 'bi-journal-check',
    tone: 'gold',
    title: 'Reflect',
    text: 'Common mistakes and checklists that help you review your choices and improve each month.',
  },
]

const creators = [
  {
    initials: 'TB',
    name: 'Team BudgetBee - Design',
    role: 'Visual design and layout',
    line: 'Owns the colour system, typography and responsive layout of every page.',
  },
  {
    initials: 'TB',
    name: 'Team BudgetBee - Development',
    role: 'React development',
    line: 'Builds the routes, components and client-side interactions across the site.',
  },
  {
    initials: 'TB',
    name: 'Team BudgetBee - Testing',
    role: 'QA and content review',
    line: 'Checks accuracy, accessibility and mobile behaviour before each release.',
  },
]

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1>Why BudgetBasics exists</h1>
            <p>
              The story behind the project: what it teaches, who it is for, and
              why every lesson stays completely free.
            </p>
          </div>
          <div className="page-hero-photo">
            <img
              src="/images/mod-about.webp" fetchPriority="high"
              alt="A student team working together around a laptop"
            />
          </div>
        </div>
      </section>

      <div className="container content-wrap">
        <section className="content-block">
          <h2>Our mission</h2>
          <div className="mission">
            <p>
              Most students only meet budgeting after money has already gone
              missing - a short month, an unexpected fee, a plan that never
              existed. BudgetBasics puts the fundamentals first: what needs and
              wants are, how the 50-30-20 split works, and why tracking small
              expenses changes the outcome.
            </p>
            <p>
              Every module can be practised safely. There is no bank
              connection, no account and no real balance to risk, so you can
              plan a full month, make a wrong call, adjust it and try again.
              The aim is confidence before responsibility: understand the
              basics while the stakes are zero.
            </p>
            <p>
              Short lessons, checklists and visual guides keep the material
              readable between classes, and each module ends with practical
              steps you can apply later with real income.
            </p>
          </div>
        </section>
      </div>

      <section className="feature-block">
        <div className="container">
          <div className="section-header">
            <h2>What the project is for</h2>
          </div>
          <div className="grid-3">
            {purposes.map((p) => (
              <div className="card purpose-card" key={p.title}>
                <span className={`icon-chip ${p.tone}`} aria-hidden="true">
                  <i className={`bi ${p.icon}`}></i>
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-white">
        <div className="container">
          <div className="section-header">
            <h2>Creators</h2>
          </div>
          <div className="grid-3">
            {creators.map((c) => (
              <div className="card creator-card" key={c.name}>
                <span className="avatar" aria-hidden="true">{c.initials}</span>
                <div>
                  <h3>{c.name}</h3>
                  <p className="creator-role">{c.role}</p>
                  <p>{c.line}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container content-wrap">
        <div className="content-block">
          <p className="ack-line">
            Your data stays yours. BudgetBasics runs entirely in your browser -
            nothing you type is stored or sent anywhere.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="cta-band no-photo">
            <div className="cta-copy">
              <h2>Have your say</h2>
              <p className="text-muted mt-1">
                Rate the lessons, tell us what confused you, or read the answers
                to the most common student questions.
              </p>
            </div>
            <Link className="btn btn-primary" to="/feedback">
              Share feedback <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
