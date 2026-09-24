import { useState } from 'react'
import { Link } from 'react-router-dom'
import faqs from '../data/faqs.json'
import '../styles/pages-content.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LETTER_RE = /\p{L}/u

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', comments: '' })
  const [rating, setRating] = useState(0)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const visibleFaqs = faqs.slice(0, 5)

  function updateField(key) {
    return (e) => {
      const { value } = e.target
      setForm((prev) => ({ ...prev, [key]: value }))
      setErrors((prev) => {
        if (!prev[key]) return prev
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    else if (!LETTER_RE.test(form.name)) next.name = 'Name must include letters'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Enter a valid email format'
    if (!rating) next.rating = 'Please pick a star rating'
    if (!form.comments.trim()) next.comments = 'Comments are required'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSent(true)
      setForm({ name: '', email: '', comments: '' })
      setRating(0)
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1>Feedback</h1>
            <p>
              Tell us what helped and what confused you. This form runs entirely in
              your browser - nothing is stored or sent anywhere.
            </p>
          </div>
          <div className="page-hero-photo">
            <img
              src="/images/mod-feedback.webp" fetchPriority="high"
              alt="Person typing feedback on a laptop"
            />
          </div>
        </div>
      </section>

      <section className="section band-white">
        <div className="container">
          <div className="grid-2">
            <div className="card">
              {sent && (
                <div className="success-banner" role="status">
                  <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                  <span>Thank you! Your feedback was recorded for this session only.</span>
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="fb-name">Name</label>
                  <input
                    id="fb-name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={updateField('name')}
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="field">
                  <label htmlFor="fb-email">Email</label>
                  <input
                    id="fb-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateField('email')}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="field">
                  <label id="fb-rating-label" htmlFor="fb-star-1">Rating</label>
                  <div className="star-row" role="group" aria-labelledby="fb-rating-label">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        id={`fb-star-${n}`}
                        type="button"
                        className={`star-btn${rating >= n ? ' filled' : ''}`}
                        aria-label={`${n} star${n > 1 ? 's' : ''}`}
                        aria-pressed={rating === n}
                        onClick={() => {
                          setRating(n)
                          setErrors((prev) => {
                            if (!prev.rating) return prev
                            const nextErr = { ...prev }
                            delete nextErr.rating
                            return nextErr
                          })
                        }}
                      >
                        <i className={`bi ${rating >= n ? 'bi-star-fill' : 'bi-star'}`} aria-hidden="true"></i>
                      </button>
                    ))}
                  </div>
                  {errors.rating && <p className="error">{errors.rating}</p>}
                </div>

                <div className="field">
                  <label htmlFor="fb-comments">Comments</label>
                  <textarea
                    id="fb-comments"
                    placeholder="What worked, what confused you, what we should add..."
                    value={form.comments}
                    onChange={updateField('comments')}
                  />
                  {errors.comments && <p className="error">{errors.comments}</p>}
                </div>

                <button type="submit" className="btn btn-primary">Submit feedback</button>
              </form>
            </div>

            <div>
              <h2 className="faq-heading">Common questions</h2>
              <div className="accordion mt-2">
                {visibleFaqs.map((f, i) => {
                  const open = openFaq === i
                  return (
                    <div className={`accordion-item${open ? ' open' : ''}`} key={f.id}>
                      <button
                        type="button"
                        className="accordion-btn"
                        aria-expanded={open}
                        aria-controls={`faq-panel-${f.id}`}
                        onClick={() => setOpenFaq(open ? -1 : i)}
                      >
                        <span className="acc-title">{f.question}</span>
                        <i className="bi bi-chevron-down acc-chevron" aria-hidden="true"></i>
                      </button>
                      {open && (
                        <div className="accordion-panel" id={`faq-panel-${f.id}`}>
                          <p>{f.answer}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-block">
        <div className="container">
          <div className="cta-band no-photo on-feature">
            <div className="cta-copy">
              <h2>Need a direct answer?</h2>
              <p className="text-muted mt-1">
                Check the contact page for project details, or drop the question
                you expected the FAQs to cover.
              </p>
            </div>
            <Link className="btn btn-primary" to="/contact">
              Open contact <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
