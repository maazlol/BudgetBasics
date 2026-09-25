import { useState } from 'react'
import { Link } from 'react-router-dom'
import quiz from '../data/personaQuiz.json'
import budgets from '../data/budgets.json'
import '../styles/pages.css'

const money = (n) => 'Rs ' + Math.round(n).toLocaleString('en-US')

export default function PersonaQuiz({ withHero = false }) {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [form, setForm] = useState({ item: '', cost: '', frequency: 'daily' })
  const [errors, setErrors] = useState({})
  const [estimate, setEstimate] = useState(null)

  const total = quiz.questions.length
  const answered = Object.keys(answers).length
  const wantsSlice = budgets.monthlyIncome * 0.3

  function handlePick(questionId, optionId) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
    setResult(null)
  }

  function handleShowPersona() {
    if (answered < total) return

    const counts = {}
    quiz.personas.forEach((p) => {
      counts[p.key] = 0
    })
    quiz.questions.forEach((q) => {
      const chosen = q.options.find((o) => o.id === answers[q.id])
      if (chosen) counts[chosen.lean] += 1
    })

    let best = quiz.personas[0].key
    quiz.personas.forEach((p) => {
      if (counts[p.key] > counts[best]) best = p.key
    })

    setResult({ key: best, counts })
  }

  function handleResetQuiz() {
    setAnswers({})
    setResult(null)
  }

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleEstimate(e) {
    e.preventDefault()

    const nextErrors = {}
    const item = form.item.trim()
    const raw = form.cost.trim()

    if (!item) nextErrors.item = 'Please enter your favourite thing'
    if (!raw) {
      nextErrors.cost = 'Please enter how much it costs'
    } else {
      const value = Number(raw)
      if (Number.isNaN(value)) nextErrors.cost = 'Enter numbers only'
      else if (value <= 0) nextErrors.cost = 'Amount must be greater than 0'
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      setEstimate(null)
      return
    }

    const frequency = quiz.frequencies.find((f) => f.key === form.frequency)
    const perYear = Number(raw) * frequency.multiplier

    setErrors({})
    setEstimate({
      item,
      frequency,
      perYear,
      perMonth: perYear / 12,
      half: perYear / 2,
      monthsOfWants: perYear / wantsSlice,
    })
  }

  const persona = result ? quiz.personas.find((p) => p.key === result.key) : null

  return (
    <>
      {withHero && (
        <section className="page-hero">
          <div className="container page-hero-grid">
            <div className="page-hero-copy">
              <h1>Money Persona Quiz</h1>
              <p>
                Six quick questions about how you treat money, then an honest
                result with three habits that fit your type. Finish with the
                round-up estimator to see what your favourite spend costs you in
                a year.
              </p>
            </div>
            <div className="page-hero-photo">
              <img
                src="/images/mod-planner.webp" fetchPriority="high"
                alt="Notes and a planner laid out for a money check-in"
              />
            </div>
          </div>
        </section>
      )}

      <section className="section band-white">
        <div className="container">
          <div className="section-header">
            <h2>What is your money persona?</h2>
            <p>
              Pick the answer that is closest to what you actually do, not what
              you think sounds smart. Nobody is grading this.
            </p>
          </div>

          <div className="grid-2 persona-grid">
            <div className="card">
              <h2>Your answers</h2>
              <div className="persona-progress">
                <span className="score-pill">
                  Answered: {answered}/{total}
                </span>
                <button type="button" className="text-btn" onClick={handleResetQuiz}>
                  Reset
                </button>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill fill-violet"
                  style={{ width: `${(answered / total) * 100}%` }}
                />
              </div>

              <div className="persona-questions">
                {quiz.questions.map((q, index) => (
                  <div className="persona-question" key={q.id}>
                    <p className="knowledge-q">
                      <span className="persona-num">{index + 1}</span>
                      {q.text}
                    </p>
                    <div className="check-options">
                      {q.options.map((opt) => (
                        <button
                          type="button"
                          key={opt.id}
                          className={`check-option${answers[q.id] === opt.id ? ' selected' : ''}`}
                          onClick={() => handlePick(q.id, opt.id)}
                          aria-pressed={answers[q.id] === opt.id}
                        >
                          <span className="check-dot" aria-hidden="true"></span>
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="persona-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleShowPersona}
                  disabled={answered < total}
                >
                  See my persona
                </button>
                {answered < total && (
                  <p className="text-muted">
                    Answer all {total} questions to see your result.
                  </p>
                )}
              </div>
            </div>

            <div className="card">
              <h2>Your result</h2>
              {persona ? (
                <div className="persona-result">
                  <div className="persona-head">
                    <span className={`icon-chip ${persona.tone}`}>
                      <i className={`bi ${persona.icon}`} aria-hidden="true"></i>
                    </span>
                    <div>
                      <h3>{persona.title}</h3>
                      <p className="text-muted">{persona.tagline}</p>
                    </div>
                  </div>
                  <p>{persona.text}</p>

                  <div className="persona-scores">
                    {quiz.personas.map((p) => (
                      <div className="persona-score-row" key={p.key}>
                        <span className="persona-score-label">{p.title}</span>
                        <div className="progress-track">
                          <div
                            className={`progress-fill ${p.key === persona.key ? 'fill-violet' : 'fill-blue'}`}
                            style={{ width: `${(result.counts[p.key] / total) * 100}%` }}
                          />
                        </div>
                        <span className="persona-score-value">
                          {result.counts[p.key]}/{total}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h4>Three habits for your type</h4>
                  <ul className="persona-tips">
                    {persona.tips.map((tip) => (
                      <li key={tip}>
                        <i className="bi bi-check2-circle" aria-hidden="true"></i>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>

                  <Link className="btn btn-secondary mt-2" to="/savings-goals">
                    Turn a habit into a goal{' '}
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
              ) : (
                <div className="result-empty">
                  <img
                    src="/images/empty-state.svg"
                    alt="Empty box illustration waiting for your quiz result"
                    width="280"
                    height="210"
                  />
                  <p className="text-muted">
                    Finish the six questions and press See my persona to get your
                    type, a score breakdown and three matching habits.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>The round-up estimator</h2>
            <p>
              Your favourite small spend, multiplied by a whole year. Educational
              estimate only - not financial advice.
            </p>
          </div>

          <div className="grid-2">
            <div className="card">
              <h2>Your favourite spend</h2>
              <form onSubmit={handleEstimate} noValidate>
                <div className="form-grid mt-2">
                  <div className="field">
                    <label htmlFor="fav-item">Favourite thing to spend on</label>
                    <input
                      id="fav-item"
                      type="text"
                      placeholder="e.g. chai with friends"
                      value={form.item}
                      onChange={(e) => setField('item', e.target.value)}
                    />
                    {errors.item && <p className="error">{errors.item}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="fav-cost">How much does it cost?</label>
                    <input
                      id="fav-cost"
                      type="number"
                      placeholder="e.g. 250"
                      value={form.cost}
                      onChange={(e) => setField('cost', e.target.value)}
                    />
                    {errors.cost && <p className="error">{errors.cost}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="fav-frequency">How often do you buy it?</label>
                    <select
                      id="fav-frequency"
                      value={form.frequency}
                      onChange={(e) => setField('frequency', e.target.value)}
                    >
                      {quiz.frequencies.map((f) => (
                        <option key={f.key} value={f.key}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Calculate the yearly cost
                </button>
              </form>
            </div>

            <div className="card">
              <h2>What it really costs</h2>
              {estimate ? (
                <div className="mt-2">
                  <p className="text-muted">
                    {estimate.item}, {estimate.frequency.label.toLowerCase()} at{' '}
                    {money(Number(form.cost) || 0)}
                  </p>
                  <div className="stat-grid mt-2">
                    <div className="stat-box">
                      <span className="stat-value">{money(estimate.perYear)}</span>
                      <span className="stat-label">in one year</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-value">{money(estimate.perMonth)}</span>
                      <span className="stat-label">per month</span>
                    </div>
                    <div className="stat-box accent">
                      <span className="stat-value">{money(estimate.half)}</span>
                      <span className="stat-label">saved per year if you cut it in half</span>
                    </div>
                  </div>
                  <p className="goal-tip mt-2">
                    <i className="bi bi-lightbulb" aria-hidden="true"></i>{' '}
                    That is about {estimate.monthsOfWants.toFixed(1)} months of the
                    sample wants slice ({money(wantsSlice)} of a{' '}
                    {money(budgets.monthlyIncome)} student budget).
                  </p>
                </div>
              ) : (
                <div className="result-empty">
                  <p className="text-muted">
                    Add the item, its price and how often you buy it to see the
                    yearly cost and how much you keep by cutting it in half.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
