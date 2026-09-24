import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages-content.css'

const mistakes = [
  {
    title: 'Impulse Buying',
    severity: 'sev-warning',
    scenario: 'Saw a flash sale at 1am and ordered a jacket you wore twice.',
    fixes: [
      'Wait 24 hours before non-essential buys',
      'Remove saved cards from shopping apps',
      'Ask: need it or want it?',
    ],
  },
  {
    title: 'Ignoring Small Expenses',
    severity: 'sev-gold',
    scenario: 'Daily Rs150 coffee felt tiny until it became Rs4,500 a month.',
    fixes: [
      'Track small spends for one week',
      'Set a weekly treats budget',
      'Brew at home twice a week',
    ],
  },
  {
    title: 'Late Payments',
    severity: 'sev-danger',
    scenario: 'Paid the electricity bill 6 days late and paid a late fee.',
    fixes: [
      'Set calendar reminders 3 days early',
      'Automate fixed payments',
      'Keep a bill calendar on your wall',
    ],
  },
  {
    title: 'Unused Subscriptions',
    severity: 'sev-blue',
    scenario: 'Three streaming plans, you only watch one.',
    fixes: [
      'List every subscription',
      'Cancel what you did not use in 30 days',
      'Review subscriptions every semester',
    ],
  },
  {
    title: 'Spending Without Plan',
    severity: 'sev-violet',
    scenario: 'Went out with friends, spent half your food budget in one night.',
    fixes: [
      'Make a simple monthly plan first',
      'Carry a fixed fun amount',
      'Check balance before saying yes',
    ],
  },
]

export default function MoneyMistakes() {
  const [openId, setOpenId] = useState(0)

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1>Money Mistakes to Avoid</h1>
            <p>
              Five traps students fall into every month, a real scenario for each,
              and a short fix-it checklist you can start today.
            </p>
          </div>
          <div className="page-hero-photo">
            <img
              src="/images/mod-mistakes.webp" fetchPriority="high"
              alt="Receipts and paperwork spread out while checking expenses"
            />
          </div>
        </div>
      </section>

      <section className="feature-block">
        <div className="container">
          <div className="accordion">
            {mistakes.map((m, i) => {
              const open = openId === i
              return (
                <div className={`accordion-item${open ? ' open' : ''}`} key={m.title}>
                  <button
                    type="button"
                    className="accordion-btn"
                    aria-expanded={open}
                    aria-controls={`mistake-panel-${i}`}
                    onClick={() => setOpenId(open ? -1 : i)}
                  >
                    <span className={`severity-dot ${m.severity}`} aria-hidden="true"></span>
                    <span className="acc-title">{m.title}</span>
                    <i className="bi bi-chevron-down acc-chevron" aria-hidden="true"></i>
                  </button>
                  {open && (
                    <div className="accordion-panel" id={`mistake-panel-${i}`}>
                      <blockquote className="mistake-scenario">{m.scenario}</blockquote>
                      <h2 className="fix-heading">Fix it</h2>
                      <ul className="fix-list">
                        {m.fixes.map((fix) => (
                          <li key={fix}>
                            <i className="bi bi-check2-circle" aria-hidden="true"></i>
                            <span>{fix}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band no-photo">
            <div className="cta-copy">
              <h2>Next: Learning Gallery</h2>
              <p className="text-muted mt-1">
                Prefer pictures over lists? Browse the visual guides, charts and
                cheat sheets for every lesson.
              </p>
            </div>
            <Link className="btn btn-primary" to="/gallery">
              Open the gallery <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
