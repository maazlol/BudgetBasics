import { useState } from 'react'
import { Link } from 'react-router-dom'
import budget from '../data/budgets.json'
import '../styles/pages.css'

const concepts = [
  { icon: 'bi-cash-stack', tone: 'violet', title: 'Income', text: 'Money you receive in a month - allowance, part-time work, scholarships or gifts.' },
  { icon: 'bi-house', tone: 'mint', title: 'Fixed Expenses', text: 'Costs that stay about the same every month, such as rent or a phone plan.' },
  { icon: 'bi-cart', tone: 'gold', title: 'Variable Expenses', text: 'Costs that change monthly, like groceries, transport and fun spending.' },
  { icon: 'bi-check-circle', tone: 'blue', title: 'Requirements', text: 'The essentials you must cover to live and study safely - food, housing, health and education.' },
  { icon: 'bi-gift', tone: 'violet', title: 'Wants', text: 'Optional spending that improves your lifestyle but is not necessary, like upgrades and outings.' },
  { icon: 'bi-piggy-bank', tone: 'mint', title: 'Savings', text: 'Money set aside before spending, for goals, challenges and emergencies.' },
]

const badgeByType = {
  income: 'badge-violet',
  fixed: 'badge-violet',
  variable: 'badge-gold',
  savings: 'badge-green',
}

const options = ['Monthly rent', 'Eating out', 'Movie tickets']

export default function Basics() {
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const plannedTotal = budget.categories
    .filter((c) => c.type !== 'income')
    .reduce((sum, c) => sum + c.amount, 0)

  function handleSelect(option) {
    setSelected(option)
    setFeedback(null)
  }

  function handleCheck() {
    if (!selected) return
    setFeedback(selected === 'Monthly rent' ? 'correct' : 'wrong')
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1>Budgeting Basics</h1>
            <p>
              Learn the six building blocks of a personal budget and see how they
              fit into a real student month.
            </p>
          </div>
          <div className="page-hero-photo">
            <img
              src="/images/mod-basics.webp" fetchPriority="high"
              alt="Wall calendar and planner used to map out a monthly budget"
            />
          </div>
        </div>
      </section>

      <section className="feature-block">
        <div className="container">
          <div className="section-header">
            <h2>Six building blocks</h2>
            <p>Every budget, no matter how simple, is made of these six parts.</p>
          </div>
          <div className="grid-3">
            {concepts.map((c) => (
              <div className="card concept-card" key={c.title}>
                <span className={`icon-chip ${c.tone}`}>
                  <i className={`bi ${c.icon}`} aria-hidden="true"></i>
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-white">
        <div className="container">
          <div className="section-header">
            <h2>A student month</h2>
            <p>
              Monthly income: {budget.currency} {budget.monthlyIncome.toLocaleString('en-US')}.
              Example only - adjust the numbers for your own situation.
            </p>
          </div>
          <div className="card table-wrap">
            <table className="budget-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {budget.categories.map((c) => (
                  <tr key={c.name}>
                    <td>{c.name}</td>
                    <td>
                      <span className={`badge ${badgeByType[c.type]}`}>{c.type}</span>
                    </td>
                    <td className="amount">{budget.currency} {c.amount.toLocaleString('en-US')}</td>
                    <td className="text-muted">{c.note}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan={2}>Total planned (expenses + savings)</td>
                  <td className="amount">{budget.currency} {plannedTotal.toLocaleString('en-US')}</td>
                  <td className="text-muted">Matches monthly income</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section band-violet">
        <div className="container">
          <div className="section-header">
            <h2>Test yourself</h2>
          </div>
          <div className="card knowledge-card">
            <p className="knowledge-q">Which of these is a FIXED expense?</p>
            <div className="check-options">
              {options.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className={`check-option${selected === opt ? ' selected' : ''}`}
                  onClick={() => handleSelect(opt)}
                  aria-pressed={selected === opt}
                >
                  <span className="check-dot" aria-hidden="true"></span>
                  {opt}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCheck}
              disabled={!selected}
            >
              Check answer
            </button>
            {feedback === 'correct' && (
              <p className="feedback feedback-success" role="status">
                Correct. Fixed expenses stay the same each month.
              </p>
            )}
            {feedback === 'wrong' && (
              <p className="feedback feedback-warn" role="status">
                Not quite. Fixed expenses don't change month to month - rent is fixed.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band no-photo">
            <div className="cta-copy">
              <h2>Next: Needs vs Wants</h2>
              <p className="text-muted mt-1">
                Now that you know the building blocks, sort everyday spending
                into essential and optional.
              </p>
            </div>
            <Link className="btn btn-primary" to="/needs-wants">
              Start the lesson <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
