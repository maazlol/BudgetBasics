import { useState } from 'react'
import { Link } from 'react-router-dom'
import budget from '../data/budgets.json'
import PersonaQuiz from './PersonaQuiz'
import '../styles/pages.css'

const concepts = [
  { icon: 'bi-cash-stack', tone: 'violet', title: 'Income', text: 'Money you receive in a month - allowance, part-time work, scholarships or gifts.', to: '/rule-50-30-20', cta: 'Split your income' },
  { icon: 'bi-house', tone: 'mint', title: 'Fixed Expenses', text: 'Costs that stay about the same every month, such as rent or a phone plan.', to: '/expense-planner', cta: 'Plan your month' },
  { icon: 'bi-cart', tone: 'gold', title: 'Variable Expenses', text: 'Costs that change monthly, like groceries, transport and fun spending.', to: '/money-mistakes', cta: 'See where it leaks' },
  { icon: 'bi-check-circle', tone: 'blue', title: 'Requirements', text: 'The essentials you must cover to live and study safely - food, housing, health and education.', to: '/needs-wants', cta: 'Sort your needs' },
  { icon: 'bi-gift', tone: 'violet', title: 'Wants', text: 'Optional spending that improves your lifestyle but is not necessary, like upgrades and outings.', to: '/needs-wants', cta: 'Sort your wants' },
  { icon: 'bi-piggy-bank', tone: 'mint', title: 'Savings', text: 'Money set aside before spending, for goals, challenges and emergencies.', to: '/savings-goals', cta: 'Set a goal' },
]

const badgeByType = {
  income: 'badge-violet',
  fixed: 'badge-violet',
  variable: 'badge-gold',
  savings: 'badge-green',
}

const filters = [
  { key: 'all', label: 'All' },
  { key: 'income', label: 'Income' },
  { key: 'fixed', label: 'Fixed' },
  { key: 'variable', label: 'Variable' },
  { key: 'savings', label: 'Savings' },
]

const checks = [
  {
    id: 'fixed',
    q: 'Which of these is a FIXED expense?',
    options: ['Monthly rent', 'Eating out', 'Movie tickets'],
    answer: 'Monthly rent',
    correct: 'Correct. Fixed expenses stay the same each month.',
    wrong: "Not quite. Fixed expenses don't change month to month - rent is fixed.",
  },
  {
    id: 'variable',
    q: 'Which of these is a VARIABLE expense?',
    options: ['Monthly rent', 'Transport', 'Savings'],
    answer: 'Transport',
    correct: 'Correct. Variable expenses move up and down every month.',
    wrong: 'Not quite. Transport changes month to month, so it counts as variable.',
  },
]

export default function Basics() {
  const [picked, setPicked] = useState({})
  const [checked, setChecked] = useState({})
  const [filter, setFilter] = useState('all')

  const currency = budget.currency
  const money = (n) => `${currency} ${n.toLocaleString('en-US')}`

  const totals = budget.categories.reduce(
    (acc, c) => ({ ...acc, [c.type]: acc[c.type] + c.amount }),
    { income: 0, fixed: 0, variable: 0, savings: 0 },
  )
  const plannedTotal = totals.fixed + totals.variable + totals.savings
  const shareOf = (n) => Math.round((n / budget.monthlyIncome) * 100)

  const tiles = [
    { key: 'income', icon: 'bi-wallet2', label: 'Income', value: budget.monthlyIncome, pct: 100, note: 'Money in each month' },
    { key: 'fixed', icon: 'bi-lock', label: 'Fixed expenses', value: totals.fixed, pct: shareOf(totals.fixed), note: `${shareOf(totals.fixed)}% of income, locked in` },
    { key: 'variable', icon: 'bi-cart', label: 'Variable expenses', value: totals.variable, pct: shareOf(totals.variable), note: `${shareOf(totals.variable)}% of income, yours to trim` },
    { key: 'savings', icon: 'bi-piggy-bank', label: 'Savings', value: totals.savings, pct: shareOf(totals.savings), note: `${shareOf(totals.savings)}% of income, kept for later` },
  ]

  const recap = [
    { key: 'fixed', badge: 'badge-violet', label: 'Fixed', value: totals.fixed, note: `${shareOf(totals.fixed)}% of income, decided before the month starts` },
    { key: 'variable', badge: 'badge-gold', label: 'Variable', value: totals.variable, note: `${shareOf(totals.variable)}% of income, where daily choices happen` },
    { key: 'savings', badge: 'badge-green', label: 'Savings', value: totals.savings, note: `${shareOf(totals.savings)}% of income, set aside first` },
  ]

  const visible = filter === 'all'
    ? budget.categories
    : budget.categories.filter((c) => c.type === filter)
  const visibleTotal = visible.reduce((sum, c) => sum + c.amount, 0)
  const activeFilter = filters.find((f) => f.key === filter)

  function handlePick(checkId, option) {
    setPicked((prev) => ({ ...prev, [checkId]: option }))
    setChecked((prev) => ({ ...prev, [checkId]: null }))
  }

  function handleCheck(check) {
    if (!picked[check.id]) return
    setChecked((prev) => ({
      ...prev,
      [check.id]: picked[check.id] === check.answer ? 'correct' : 'wrong',
    }))
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
            <p>
              Every budget, no matter how simple, is made of these six parts.
              Tap a block to open the lesson it feeds into.
            </p>
          </div>
          <div className="grid-3">
            {concepts.map((c) => (
              <Link className="card concept-card" to={c.to} key={c.title}>
                <span className={`icon-chip ${c.tone}`}>
                  <i className={`bi ${c.icon}`} aria-hidden="true"></i>
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="concept-cta">
                  {c.cta} <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-white">
        <div className="container">
          <div className="section-header">
            <h2>A student month</h2>
            <p>
              Monthly income: {money(budget.monthlyIncome)}. Example only -
              adjust the numbers for your own situation.
            </p>
          </div>

          <div className="budget-tiles">
            {tiles.map((t) => (
              <div className={`budget-tile ${t.key}`} key={t.key}>
                <span className="tile-label">
                  <i className={`bi ${t.icon}`} aria-hidden="true"></i> {t.label}
                </span>
                <span className="tile-value">{money(t.value)}</span>
                <span className="tile-bar">
                  <span style={{ width: `${t.pct}%` }}></span>
                </span>
                <span className="tile-note">{t.note}</span>
              </div>
            ))}
          </div>

          <div className="filter-pills budget-pills" role="group" aria-label="Filter categories by type">
            {filters.map((f) => (
              <button
                type="button"
                key={f.key}
                className={`filter-pill${filter === f.key ? ' active' : ''}`}
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
              >
                {f.label}
              </button>
            ))}
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
                {visible.map((c) => (
                  <tr key={c.name}>
                    <td>{c.name}</td>
                    <td>
                      <span className={`badge ${badgeByType[c.type]}`}>{c.type}</span>
                    </td>
                    <td className="amount">{money(c.amount)}</td>
                    <td className="text-muted">{c.note}</td>
                  </tr>
                ))}
                {filter === 'all' ? (
                  <tr className="total-row">
                    <td colSpan={2}>Total planned (expenses + savings)</td>
                    <td className="amount">{money(plannedTotal)}</td>
                    <td className="text-muted">Matches monthly income</td>
                  </tr>
                ) : (
                  <tr className="total-row">
                    <td colSpan={2}>Total {activeFilter.label.toLowerCase()}</td>
                    <td className="amount">{money(visibleTotal)}</td>
                    <td className="text-muted">
                      {filter === 'income'
                        ? 'Money in each month'
                        : `${shareOf(visibleTotal)}% of income`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section band-violet">
        <div className="container">
          <div className="section-header">
            <h2>Test yourself</h2>
            <p>
              Two quick questions on what you just read, then a fast recap of
              where the sample month goes.
            </p>
          </div>

          <div className="grid-2">
            {checks.map((check) => (
              <div className="card knowledge-card" key={check.id}>
                <p className="knowledge-q">{check.q}</p>
                <div className="check-options">
                  {check.options.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      className={`check-option${picked[check.id] === opt ? ' selected' : ''}`}
                      onClick={() => handlePick(check.id, opt)}
                      aria-pressed={picked[check.id] === opt}
                    >
                      <span className="check-dot" aria-hidden="true"></span>
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleCheck(check)}
                  disabled={!picked[check.id]}
                >
                  Check answer
                </button>
                {checked[check.id] === 'correct' && (
                  <p className="feedback feedback-success" role="status">
                    {check.correct}
                  </p>
                )}
                {checked[check.id] === 'wrong' && (
                  <p className="feedback feedback-warn" role="status">
                    {check.wrong}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="card recap-card">
            <div className="recap-head">
              <h3>Where the sample month goes</h3>
              <p className="text-muted">
                Fixed costs and savings are locked in before the month starts.
                Variable spending is where your daily choices matter.
              </p>
            </div>
            <div className="recap-row">
              {recap.map((r) => (
                <div className="recap-item" key={r.key}>
                  <span className={`badge ${r.badge}`}>{r.label}</span>
                  <strong>{money(r.value)}</strong>
                  <span className="text-muted">{r.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PersonaQuiz />

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
