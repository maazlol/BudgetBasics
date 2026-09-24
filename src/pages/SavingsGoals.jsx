import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages-tools.css'

const money = (n) => 'Rs ' + Math.round(n).toLocaleString('en-US')

const TIPS = [
  { min: 0, text: 'Small steps add up' },
  { min: 35, text: "You're closer than yesterday" },
  { min: 70, text: 'Great momentum — keep it going' },
]

const PRESETS = [
  { name: 'Laptop', target: 60000, icon: 'bi-laptop', progress: 45, status: 'On track', badge: 'badge-green' },
  { name: 'Trip', target: 25000, icon: 'bi-airplane', progress: 30, status: 'Behind', badge: 'badge-gold' },
  { name: 'Emergency fund', target: 40000, icon: 'bi-shield-check', progress: 75, status: 'On track', badge: 'badge-green' },
]

const EMPTY = { name: '', target: '', current: '', monthly: '' }

export default function SavingsGoals() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)

  const setField = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}

    if (!form.name.trim()) next.name = 'Please enter goal name'
    if (!form.target.trim()) next.target = 'Please enter target amount'
    if (!form.current.trim()) next.current = 'Please enter current savings'
    if (!form.monthly.trim()) next.monthly = 'Please enter monthly contribution'

    if (!next.target) {
      const target = Number(form.target)
      if (Number.isNaN(target) || target <= 0) {
        next.target = 'Amount must be greater than 0'
      }
    }

    if (!next.current) {
      const current = Number(form.current)
      if (Number.isNaN(current) || current < 0) {
        next.current = 'Current savings cannot be negative'
      }
    }

    if (!next.monthly) {
      const monthly = Number(form.monthly)
      if (Number.isNaN(monthly) || monthly <= 0) {
        next.monthly = 'Monthly contribution must be more than 0'
      }
    }

    setErrors(next)
    if (Object.keys(next).length > 0) {
      setResult(null)
      return
    }

    const target = Number(form.target)
    const current = Number(form.current)
    const monthly = Number(form.monthly)
    const reached = current >= target
    const remaining = Math.max(target - current, 0)
    // Guard against divide-by-zero even though validation requires monthly > 0
    const months = monthly > 0 ? Math.ceil(remaining / monthly) : 0
    const percent = Math.min(100, Math.max(0, (current / target) * 100))

    setResult({ name: form.name.trim(), reached, remaining, months, percent })
  }

  const tip =
    result != null
      ? [...TIPS].reverse().find((t) => result.percent >= t.min)?.text
      : ''

  return (
    <div className="tool-page">
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1>Savings Goals</h1>
            <p>
              Pick a goal, tell us where you stand today, and see how many months of
              steady contributions it will take to get there.
            </p>
          </div>
          <div className="page-hero-photo">
            <img
              src="/images/mod-goals.webp" fetchPriority="high"
              alt="Savings money and cash set aside for a goal"
            />
          </div>
        </div>
      </section>

      <section className="section band-white">
        <div className="container">
          <div className="grid-2">
            <div className="card">
              <h2>Plan your goal</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="field mt-2">
                  <label htmlFor="goal-name">Goal name</label>
                  <input
                    id="goal-name"
                    type="text"
                    placeholder="e.g. New laptop"
                    value={form.name}
                    onChange={setField('name')}
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="field">
                  <label htmlFor="goal-target">Target amount</label>
                  <input
                    id="goal-target"
                    type="number"
                    placeholder="e.g. 60000"
                    value={form.target}
                    onChange={setField('target')}
                  />
                  {errors.target && <p className="error">{errors.target}</p>}
                </div>
                <div className="field">
                  <label htmlFor="goal-current">Current savings</label>
                  <input
                    id="goal-current"
                    type="number"
                    placeholder="e.g. 12000"
                    value={form.current}
                    onChange={setField('current')}
                  />
                  {errors.current && <p className="error">{errors.current}</p>}
                </div>
                <div className="field">
                  <label htmlFor="goal-monthly">Monthly contribution</label>
                  <input
                    id="goal-monthly"
                    type="number"
                    placeholder="e.g. 5000"
                    value={form.monthly}
                    onChange={setField('monthly')}
                  />
                  {errors.monthly && <p className="error">{errors.monthly}</p>}
                </div>
                <button type="submit" className="btn btn-primary">
                  Calculate timeline
                </button>
              </form>
            </div>

            <div className="card">
              <h2>Your result</h2>
              {result ? (
                <div className="mt-2">
                  <p className="text-muted">{result.name}</p>
                  {result.reached ? (
                    <p className="goal-reached">Goal already reached!</p>
                  ) : (
                    <>
                      <p className="goal-big">{money(result.remaining)}</p>
                      <p className="text-muted">remaining to save</p>
                      <p className="goal-months mt-2">
                        About <strong>{result.months} months</strong> at your current
                        contribution
                      </p>
                    </>
                  )}
                  <div className="progress-track mt-2">
                    <div className="progress-fill" style={{ width: `${result.percent}%` }} />
                  </div>
                  <p className="goal-tip mt-1">
                    <i className="bi bi-lightbulb" aria-hidden="true"></i> {tip}
                  </p>
                </div>
              ) : (
                <div className="result-empty">
                  <img
                    src="/images/empty-state.svg"
                    alt="Empty box illustration waiting for your goal details"
                    width="280"
                    height="210"
                  />
                  <p className="text-muted">
                    Fill the form and submit to see your estimated timeline here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="feature-block">
        <div className="container">
          <div className="section-header">
            <h2>Popular goal ideas</h2>
            <p>Targets students often plan for - copy the numbers into your own goal.</p>
          </div>
          <div className="grid-3">
            {PRESETS.map((p) => (
              <div className="card preset-card" key={p.name}>
                <div className="preset-head">
                  <span className="preset-icon">
                    <i className={`bi ${p.icon}`} aria-hidden="true"></i>
                  </span>
                  <div>
                    <p className="preset-name">{p.name}</p>
                    <p className="text-muted preset-target">Target {money(p.target)}</p>
                  </div>
                  <span className={`badge ${p.badge} preset-badge`}>{p.status}</span>
                </div>
                <div className="progress-track mt-2">
                  <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                </div>
                <p className="text-muted preset-note">{p.progress}% saved</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band no-photo">
            <div className="cta-copy">
              <h2>Next: Expense Planner</h2>
              <p className="text-muted mt-1">
                Give your monthly contribution a home - plan the full month and
                see every category side by side.
              </p>
            </div>
            <Link className="btn btn-primary" to="/expense-planner">
              Open the planner <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
