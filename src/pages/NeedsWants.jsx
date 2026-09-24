import { useState } from 'react'
import { Link } from 'react-router-dom'
import items from '../data/classifier.json'
import '../styles/pages.css'

const needExamples = ['Rent', 'Groceries', 'Medicine', 'School fees', 'Bus pass']
const wantExamples = ['Streaming', 'Branded sneakers', 'Fast food', 'Gadgets upgrades', 'Concert']

export default function NeedsWants() {
  const [answers, setAnswers] = useState({})

  const score = items.filter((it) => answers[it.id] === it.answer).length
  const answeredCount = Object.keys(answers).length

  // Each answer locks permanently; reset clears everything
  function handlePick(id, choice) {
    if (answers[id]) return
    setAnswers((prev) => ({ ...prev, [id]: choice }))
  }

  function handleReset() {
    setAnswers({})
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1>Needs vs Wants</h1>
            <p>
              Sorting spending into essential and optional is the fastest way to
              take control of a tight student budget.
            </p>
          </div>
          <div className="page-hero-photo">
            <img
              src="/images/mod-needs-wants.webp" fetchPriority="high"
              alt="Fresh groceries on a market shelf"
            />
          </div>
        </div>
      </section>

      <section className="feature-block">
        <div className="container">
          <div className="section-header">
            <h2>Two kinds of spending</h2>
          </div>
          <div className="grid-2">
            <div className="card compare-card">
              <div className="compare-head violet">
                <i className="bi bi-check-circle" aria-hidden="true"></i>
                <h3>Needs</h3>
              </div>
              <p>
                Things you must pay for to live and study safely. Skipping them
                creates real problems.
              </p>
              <div className="chip-row">
                {needExamples.map((x) => (
                  <span className="chip" key={x}>{x}</span>
                ))}
              </div>
            </div>
            <div className="card compare-card">
              <div className="compare-head sand">
                <i className="bi bi-gift" aria-hidden="true"></i>
                <h3>Wants</h3>
              </div>
              <p>
                Things that make life fun but are optional. They belong in your
                30 percent wants slice.
              </p>
              <div className="chip-row">
                {wantExamples.map((x) => (
                  <span className="chip sand" key={x}>{x}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section band-white">
        <div className="container">
          <div className="section-header">
            <h2>Need or want? You decide</h2>
            <p>Pick for each item. Answers lock in, and you get a short explanation.</p>
          </div>
          <div className="classifier-bar">
            <span className="score-pill">Score: {score}/{items.length}</span>
            <span className="text-muted">Answered: {answeredCount}/{items.length}</span>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className="classifier-list">
            {items.map((item) => {
              const given = answers[item.id]
              const isCorrect = given === item.answer
              return (
                <div className="card classifier-row" key={item.id}>
                  <div className="classifier-top">
                    <span className="classifier-label">{item.label}</span>
                    <div className="classifier-actions">
                      <button
                        type="button"
                        className={`classifier-btn${given === 'need' ? (isCorrect ? ' correct' : ' wrong') : ''}${given && given !== 'need' && item.answer === 'need' ? ' missed' : ''}`}
                        onClick={() => handlePick(item.id, 'need')}
                        disabled={!!given}
                        aria-pressed={given === 'need'}
                      >
                        Need
                      </button>
                      <button
                        type="button"
                        className={`classifier-btn${given === 'want' ? (isCorrect ? ' correct' : ' wrong') : ''}${given && given !== 'want' && item.answer === 'want' ? ' missed' : ''}`}
                        onClick={() => handlePick(item.id, 'want')}
                        disabled={!!given}
                        aria-pressed={given === 'want'}
                      >
                        Want
                      </button>
                    </div>
                  </div>
                  {given && (
                    <p className={`feedback ${isCorrect ? 'feedback-success' : 'feedback-warn'}`}>
                      {isCorrect ? 'Correct. ' : `Not quite - it is a ${item.answer}. `}
                      {item.explain}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section band-violet">
        <div className="container">
          <div className="section-header">
            <h2>Before you buy, run the flow</h2>
            <p>A four-step habit that protects your wants budget from impulse buys.</p>
          </div>
          <div className="decision-flow">
            <div className="decision-step">
              <i className="bi bi-bag" aria-hidden="true"></i>
              <h3>Want something</h3>
              <p>You see an item you would like to buy.</p>
            </div>
            <i className="bi bi-arrow-right decision-arrow" aria-hidden="true"></i>
            <div className="decision-step">
              <i className="bi bi-question-circle" aria-hidden="true"></i>
              <h3>Is it essential?</h3>
              <p>Can you live or study normally without it this month?</p>
            </div>
            <i className="bi bi-arrow-right decision-arrow" aria-hidden="true"></i>
            <div className="decision-branch">
              <div className="decision-step">
                <span className="badge badge-green">Yes</span>
                <h3>Compare prices</h3>
                <p>Check a few sellers, then buy only if your wants budget allows it.</p>
              </div>
              <div className="decision-step">
                <span className="badge badge-gold">No</span>
                <h3>Wait 48 hours</h3>
                <p>Give it two days. If the urge fades, you just kept that money.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band no-photo">
            <div className="cta-copy">
              <h2>Next: the 50-30-20 Rule</h2>
              <p className="text-muted mt-1">
                Put a number on it - split any income into needs, wants and
                savings in one simple step.
              </p>
            </div>
            <Link className="btn btn-primary" to="/rule-50-30-20">
              Try the calculator <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
