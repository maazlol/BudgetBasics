import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import '../styles/pages-tools.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const money = (n) => 'Rs ' + Math.round(n).toLocaleString('en-US')

const CHART_DATA = {
  labels: ['Needs', 'Wants', 'Savings'],
  datasets: [
    {
      data: [50, 30, 20],
      backgroundColor: ['#6F8FA6', '#D6A443', '#575091'],
      borderWidth: 0,
    },
  ],
}

const CHART_OPTIONS = {
  cutout: '65%',
  plugins: {
    legend: { position: 'bottom' },
  },
}

const RULE_CARDS = [
  {
    pct: '50%',
    label: 'Needs',
    example: 'Rent, groceries, utilities — things you must pay for.',
    variant: 'blue',
  },
  {
    pct: '30%',
    label: 'Wants',
    example: 'Eating out, subscriptions, hobbies — nice to have.',
    variant: 'gold',
  },
  {
    pct: '20%',
    label: 'Savings',
    example: 'Emergency fund, goals, debt repayment — your future self.',
    variant: 'violet',
  },
]

export default function Rule503020() {
  const [income, setIncome] = useState('')
  const [error, setError] = useState('')
  const [computed, setComputed] = useState(null)

  const handleCalculate = (e) => {
    e.preventDefault()
    const raw = income.trim()

    if (!raw) {
      setError('Please enter your monthly income')
      setComputed(null)
      return
    }

    const value = Number(raw)
    if (Number.isNaN(value)) {
      setError('Enter numbers only')
      setComputed(null)
      return
    }

    if (value <= 0) {
      setError('Amount must be greater than 0')
      setComputed(null)
      return
    }

    setError('')
    setComputed({
      needs: value * 0.5,
      wants: value * 0.3,
      savings: value * 0.2,
    })
  }

  const results = computed
    ? [
        { label: 'Needs', amount: computed.needs, width: 50, fill: 'fill-blue' },
        { label: 'Wants', amount: computed.wants, width: 30, fill: 'fill-gold' },
        { label: 'Savings', amount: computed.savings, width: 20, fill: 'fill-violet' },
      ]
    : []

  return (
    <div className="tool-page">
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1>The 50-30-20 Rule</h1>
            <p>
              A simple way to split your take-home pay: 50% for needs, 30% for wants,
              and 20% for savings. Enter your monthly income to see how the split
              looks for you.
            </p>
          </div>
          <div className="page-hero-photo">
            <img
              src="/images/mod-rule.webp" fetchPriority="high"
              alt="Calculator, coins and notes split into budget categories"
            />
          </div>
        </div>
      </section>

      <section className="section band-white">
        <div className="container">
          <div className="grid-2">
            <div>
              <div className="card">
                <h2>How it works</h2>
                <p className="mt-1">
                  Divide your income after tax into three buckets. Needs cover the
                  essentials, wants cover lifestyle spending, and savings builds your
                  safety net. It is a starting guideline — adjust the ratios to your
                  situation.
                </p>
              </div>

              <div className="card mt-2">
                <h2>Calculator</h2>
                <form onSubmit={handleCalculate} noValidate>
                  <div className="field mt-2">
                    <label htmlFor="income">Monthly income (after tax)</label>
                    <input
                      id="income"
                      type="number"
                      placeholder="e.g. 15000"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                    />
                    {error && <p className="error">{error}</p>}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Calculate split
                  </button>
                </form>
              </div>
            </div>

            <div className="card chart-card">
              <h2>Where your money goes</h2>
              <div className="chart-wrap">
                <Doughnut data={CHART_DATA} options={CHART_OPTIONS} />
              </div>
            </div>
          </div>

          {computed && (
            <div className="grid-3 mt-3">
              {results.map((r) => (
                <div className="card result-card" key={r.label}>
                  <p className="text-muted">{r.label}</p>
                  <p className="result-amount">{money(r.amount)}</p>
                  <div className="progress-track mt-1">
                    <div
                      className={`progress-fill ${r.fill}`}
                      style={{ width: `${r.width}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="feature-block">
        <div className="container">
          <div className="section-header">
            <h2>The three slices</h2>
            <p>What belongs in each bucket when you split your income.</p>
          </div>
          <div className="grid-3">
            {RULE_CARDS.map((card) => (
              <div className={`card rule-card rule-${card.variant}`} key={card.label}>
                <p className="rule-pct">{card.pct}</p>
                <p className="rule-label">{card.label}</p>
                <p className="text-muted rule-example">{card.example}</p>
              </div>
            ))}
          </div>

          <div className="notice mt-3">
            <i className="bi bi-info-circle" aria-hidden="true"></i>
            <span>
              Educational guideline, adjustable, estimate for learning only. Not
              professional financial advice.
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band no-photo">
            <div className="cta-copy">
              <h2>Next: Savings Goals</h2>
              <p className="text-muted mt-1">
                Turn your 20 percent savings slice into a target with a date -
                pick a goal and see how long it takes.
              </p>
            </div>
            <Link className="btn btn-primary" to="/savings-goals">
              Plan a goal <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
