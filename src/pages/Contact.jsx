import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages-content.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LETTER_RE = /\p{L}/u

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

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
    if (!form.subject.trim()) next.subject = 'Subject is required'
    if (!form.message.trim()) next.message = 'Message is required'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1>Contact Us</h1>
            <p>
              Questions about a module or spotted an error? Reach the team through
              any of the channels on the left.
            </p>
          </div>
          <div className="page-hero-photo">
            <img
              src="/images/mod-contact.webp" fetchPriority="high"
              alt="Person opening a contact form on a laptop"
            />
          </div>
        </div>
      </section>

      <section className="feature-block">
        <div className="container">
          <div className="grid-2">
            <div className="contact-list">
              <div className="card contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <i className="bi bi-envelope"></i>
                </span>
                <div>
                  <h2>Email</h2>
                  <p><a href="mailto:hello@budgetbasics.edu">hello@budgetbasics.edu</a></p>
                </div>
              </div>

              <div className="card contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <i className="bi bi-telephone"></i>
                </span>
                <div>
                  <h2>Phone</h2>
                  <p>+92 300 0000000</p>
                </div>
              </div>

              <div className="card contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <i className="bi bi-share"></i>
                </span>
                <div>
                  <h2>Social</h2>
                  <p>Find the team and the tools we learned from.</p>
                  <div className="social-row">
                    <a
                      className="social-link"
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                    >
                      <i className="bi bi-github" aria-hidden="true"></i>
                    </a>
                    <a
                      className="social-link"
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                    >
                      <i className="bi bi-linkedin" aria-hidden="true"></i>
                    </a>
                    <a
                      className="social-link"
                      href="https://x.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="X (Twitter)"
                    >
                      <i className="bi bi-twitter-x" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="notice">
                <i className="bi bi-clock" aria-hidden="true"></i>
                <span>
                  Typical response time: 1-2 working days.
                </span>
              </div>
            </div>

            <div className="card">
              {sent && (
                <div className="success-banner" role="status">
                  <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                  <span>
                    Message sent. This form runs in your browser only - nothing is
                    emailed or stored anywhere.
                  </span>
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="ct-name">Name</label>
                  <input
                    id="ct-name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={updateField('name')}
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="field">
                  <label htmlFor="ct-email">Email</label>
                  <input
                    id="ct-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateField('email')}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="field">
                  <label htmlFor="ct-subject">Subject</label>
                  <input
                    id="ct-subject"
                    type="text"
                    placeholder="What is this about?"
                    value={form.subject}
                    onChange={updateField('subject')}
                  />
                  {errors.subject && <p className="error">{errors.subject}</p>}
                </div>

                <div className="field">
                  <label htmlFor="ct-message">Message</label>
                  <textarea
                    id="ct-message"
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={updateField('message')}
                  />
                  {errors.message && <p className="error">{errors.message}</p>}
                </div>

                <button type="submit" className="btn btn-primary">Send message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band no-photo">
            <div className="cta-copy">
              <h2>That&apos;s the whole tour</h2>
              <p className="text-muted mt-1">
                Eight modules, five tools and a gallery - all free, all practise
                with fake numbers. Start from the basics whenever you like.
              </p>
            </div>
            <Link className="btn btn-primary" to="/basics">
              Start Learning <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
