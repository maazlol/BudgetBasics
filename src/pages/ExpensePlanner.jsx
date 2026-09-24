import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages-tools.css'

const money = (n) => 'Rs ' + Math.round(n).toLocaleString('en-US')

const SAMPLE_BALANCE = 20000

const CATEGORIES = [
  'Food',
  'Transport',
  'Education',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Miscellaneous',
]

const CATEGORY_COLORS = {
  Food: '#C67A3D',
  Transport: '#6F8FA6',
  Education: '#575091',
  Entertainment: '#D6A443',
  Shopping: '#4E8B6E',
  Utilities: '#6E687A',
  Miscellaneous: '#B85450',
}

const SEED = [
  { id: 1, date: '2026-09-01', category: 'Food', description: 'Weekly groceries', amount: 4500 },
  { id: 2, date: '2026-09-03', category: 'Transport', description: 'Bus pass top-up', amount: 1200 },
  { id: 3, date: '2026-09-05', category: 'Education', description: 'Course notes printing', amount: 800 },
  { id: 4, date: '2026-09-08', category: 'Entertainment', description: 'Movie night', amount: 1500 },
]

const EMPTY = { date: '', category: 'Food', description: '', amount: '' }

const PLANNER_TIPS = [
  {
    icon: 'bi-calendar-check',
    tone: 'violet',
    title: 'Plan before the month starts',
    text: 'Write the list in the last week of the current month so day one is already covered.',
  },
  {
    icon: 'bi-graph-up',
    tone: 'mint',
    title: 'Check the balance weekly',
    text: 'A quick mid-month look at the remaining amount stops surprise overspending.',
  },
  {
    icon: 'bi-shield-check',
    tone: 'gold',
    title: 'Keep it pretend',
    text: 'Nothing is saved or sent anywhere - refresh the page and the planner starts fresh.',
  },
]

export default function ExpensePlanner() {
  const [entries, setEntries] = useState(SEED)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [editingId, setEditingId] = useState(null)

  const setField = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const clearForm = () => {
    setForm(EMPTY)
    setErrors({})
    setEditingId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}

    if (!form.date) next.date = 'Date required'
    if (!form.description.trim()) next.description = 'Description required'
    if (!form.amount.trim()) {
      next.amount = 'Please enter amount'
    } else if (Number(form.amount) <= 0 || Number.isNaN(Number(form.amount))) {
      next.amount = 'Amount must be greater than 0'
    }

    setErrors(next)
    if (Object.keys(next).length > 0) return

    const entry = {
      id: editingId ?? Date.now(),
      date: form.date,
      category: form.category,
      description: form.description.trim(),
      amount: Number(form.amount),
    }

    if (editingId != null) {
      setEntries(entries.map((x) => (x.id === editingId ? entry : x)))
    } else {
      setEntries([...entries, entry])
    }
    clearForm()
  }

  const handleEdit = (entry) => {
    setEditingId(entry.id)
    setForm({
      date: entry.date,
      category: entry.category,
      description: entry.description,
      amount: String(entry.amount),
    })
    setErrors({})
    setOpen(true)
  }

  const handleRemove = (id) => {
    if (window.confirm('Remove this expense entry?')) {
      setEntries(entries.filter((x) => x.id !== id))
      if (editingId === id) clearForm()
    }
  }

  const total = entries.reduce((sum, x) => sum + x.amount, 0)
  const remaining = SAMPLE_BALANCE - total

  return (
    <div className="tool-page">
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1>Expense Planner</h1>
            <p>
              List your planned expenses for the month, group them by category, and
              keep an eye on what is left of your starting balance.
            </p>
          </div>
          <div className="page-hero-photo">
            <img
              src="/images/mod-planner.webp" fetchPriority="high"
              alt="Person writing a monthly plan in a notebook next to a laptop"
            />
          </div>
        </div>
      </section>

      <section className="section band-white">
        <div className="container">
          <div className="card toolbar">
        <div>
          <h2>Planned entries</h2>
          <p className="text-muted toolbar-note">Session only — refresh clears everything.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpen(!open)}>
          <i className="bi bi-plus-lg" aria-hidden="true"></i> Add Entry
        </button>
      </div>

      {open && (
        <div className="card mt-2">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="exp-date">Date</label>
                <input id="exp-date" type="date" value={form.date} onChange={setField('date')} />
                {errors.date && <p className="error">{errors.date}</p>}
              </div>
              <div className="field">
                <label htmlFor="exp-category">Category</label>
                <select id="exp-category" value={form.category} onChange={setField('category')}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="exp-desc">Description</label>
                <input
                  id="exp-desc"
                  type="text"
                  placeholder="e.g. Canteen lunch"
                  value={form.description}
                  onChange={setField('description')}
                />
                {errors.description && <p className="error">{errors.description}</p>}
              </div>
              <div className="field">
                <label htmlFor="exp-amount">Amount</label>
                <input
                  id="exp-amount"
                  type="number"
                  placeholder="e.g. 500"
                  value={form.amount}
                  onChange={setField('amount')}
                />
                {errors.amount && <p className="error">{errors.amount}</p>}
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId != null ? 'Update entry' : 'Add expense'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={clearForm}>
                Clear
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid-2 mt-3 planner-grid">
        <div className="card table-card">
          {entries.length === 0 ? (
            <p className="empty-note">No expenses yet. Add your first entry.</p>
          ) : (
            <div className="table-wrap">
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((x) => (
                    <tr key={x.id}>
                      <td>{x.date}</td>
                      <td>
                        <span className="cat">
                          <span
                            className="cat-dot"
                            style={{ background: CATEGORY_COLORS[x.category] }}
                          />
                          {x.category}
                        </span>
                      </td>
                      <td>{x.description}</td>
                      <td className="amount-cell">{money(x.amount)}</td>
                      <td>
                        <div className="row-actions">
                          <button
                            type="button"
                            className="btn btn-secondary btn-icon"
                            title="Edit entry"
                            aria-label="Edit entry"
                            onClick={() => handleEdit(x)}
                          >
                            <i className="bi bi-pencil" aria-hidden="true"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-icon danger"
                            title="Remove entry"
                            aria-label="Remove entry"
                            onClick={() => handleRemove(x.id)}
                          >
                            <i className="bi bi-trash" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card summary-card">
          <h2>Summary</h2>
          <div className="summary-row mt-2">
            <span className="text-muted">Total planned</span>
            <strong>{money(total)}</strong>
          </div>
          <div className="summary-row mt-1">
            <span className="text-muted">Remaining</span>
            <strong className={remaining < 0 ? 'over-budget' : ''}>
              {money(remaining)}
            </strong>
          </div>
          <p className="text-muted summary-note">
            starting balance Rs 20,000
          </p>
          {remaining < 0 && (
            <p className="over-budget over-note">
              <i className="bi bi-exclamation-triangle" aria-hidden="true"></i> Over
              the starting balance — trim some entries.
            </p>
          )}
        </div>
        </div>
        </div>
      </section>

      <section className="feature-block">
        <div className="container">
          <div className="section-header">
            <h2>Three habits that keep a plan alive</h2>
            <p>Small routines that make the planner worth opening every week.</p>
          </div>
          <div className="grid-3">
            {PLANNER_TIPS.map((tip) => (
              <div className="feature-item" key={tip.title}>
                <span className={`icon-chip ${tip.tone}`}>
                  <i className={`bi ${tip.icon}`} aria-hidden="true"></i>
                </span>
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band no-photo">
            <div className="cta-copy">
              <h2>Next: Money Mistakes</h2>
              <p className="text-muted mt-1">
                See the common traps that make a neat plan fall apart - and how
                to dodge each one.
              </p>
            </div>
            <Link className="btn btn-primary" to="/money-mistakes">
              Avoid the traps <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
