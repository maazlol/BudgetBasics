import { useState } from 'react'
import { Link } from 'react-router-dom'
import tips from '../data/tips.json'
import faqs from '../data/faqs.json'
import '../styles/pages.css'

const tipPhotos = [
  { photo: '/images/tip-savings.webp', tone: 'mint', alt: 'Plant growing out of a pile of coins' },
  { photo: '/images/tip-coffee.webp', tone: 'blue', alt: 'Friends holding coffee cups over a table' },
  { photo: '/images/tip-calculator.webp', tone: 'violet', alt: 'Calculator and paperwork on a desk' },
]

const quickLinks = [
  { to: '/basics', icon: 'bi-wallet2', tone: 'violet', title: 'Budgeting Basics', text: 'Income, expenses and how a monthly plan comes together.' },
  { to: '/needs-wants', icon: 'bi-tags', tone: 'mint', title: 'Needs vs Wants', text: 'Sort everyday spending into essential and optional.' },
  { to: '/rule-50-30-20', icon: 'bi-pie-chart', tone: 'gold', title: '50-30-20 Rule', text: 'Split any income into needs, wants and savings.' },
  { to: '/savings-goals', icon: 'bi-bullseye', tone: 'blue', title: 'Savings Goals', text: 'Turn a target amount into a simple monthly plan.' },
]

const howSteps = [
  { num: '1', title: 'Pick a lesson', text: 'Start with the basics or jump straight to the rule you want to learn.' },
  { num: '2', title: 'Practise the tool', text: 'Every lesson comes with a calculator, planner or short quiz to try.' },
  { num: '3', title: 'Plan your month', text: 'Use the budget table to split real numbers into needs, wants and savings.' },
]

const moreLinks = [
  { to: '/money-mistakes', icon: 'bi-exclamation-triangle', tone: 'gold', title: 'Money Mistakes', text: 'Common traps that quietly break a student budget.' },
  { to: '/gallery', icon: 'bi-images', tone: 'mint', title: 'Learning Gallery', text: 'Visual guides, charts and cheat sheets for every lesson.' },
  { to: '/about', icon: 'bi-people', tone: 'blue', title: 'About the Project', text: 'Who built BudgetBasics and why it stays completely free.' },
]

const tools = [
  { to: '/rule-50-30-20', icon: 'bi-calculator', tone: 'violet', title: '50-30-20 Calculator', text: 'Type in your monthly income and get the three-way split with a live chart.', cta: 'Try the calculator' },
  { to: '/expense-planner', icon: 'bi-journal-text', tone: 'mint', title: 'Expense Planner', text: 'Add planned expenses, group them by category and watch the remaining balance.', cta: 'Open the planner' },
  { to: '/savings-goals', icon: 'bi-bullseye', tone: 'gold', title: 'Savings Goals', text: 'Set a target, current savings and monthly contribution to get a timeline.', cta: 'Plan a goal' },
]

const pathSteps = [
  { num: 1, to: '/basics', title: 'Budgeting Basics', text: 'The six building blocks of every budget.' },
  { num: 2, to: '/needs-wants', title: 'Needs vs Wants', text: 'Sort essentials from optional spending.' },
  { num: 3, to: '/rule-50-30-20', title: '50-30-20 Rule', text: 'Split income with one simple ratio.' },
  { num: 4, to: '/savings-goals', title: 'Savings Goals', text: 'Turn a target into a monthly plan.' },
  { num: 5, to: '/expense-planner', title: 'Expense Planner', text: 'Lay out the whole month before it starts.' },
  { num: 6, to: '/money-mistakes', title: 'Money Mistakes', text: 'Five traps and how to dodge each one.' },
  { num: 7, to: '/gallery', title: 'Gallery & Guides', text: 'Visual cheat sheets for every lesson.' },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0)
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>
              Master your money, <span className="accent-word">one rule</span> at a time.
            </h1>
            <p>
              BudgetBasics is a free learning space where students pick up real
              budgeting fundamentals - needs vs wants, the 50-30-20 rule, monthly
              budgets and simple challenges. No real money and no accounts, just
              clear lessons you can practise today.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/basics">
                Start Learning <i className="bi bi-arrow-right" aria-hidden="true"></i>
              </Link>
              <Link className="btn btn-secondary" to="/rule-50-30-20">
                <i className="bi bi-calculator" aria-hidden="true"></i> Try the Calculator
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-photo">
              <img
                src="/images/hero-student.webp" fetchPriority="high"
                alt="Student writing notes and planning a budget at a desk"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="how-block">
        <div className="container how-grid">
          <div className="how-copy">
            <h2>How it works</h2>
            <p>
              BudgetBasics turns money lessons into three small moves. Read a
              short page, play with the built-in tool, then copy the habit into
              your own month. No sign-up, no real cash, no pressure.
            </p>
            <Link className="btn btn-on-violet" to="/basics">
              Explore the lessons <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="how-steps">
            {howSteps.map((step) => (
              <div className="how-step" key={step.num}>
                <span className="how-num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured budgeting tips</h2>
            <p>Short, practical habits that make student money easier to manage.</p>
          </div>
          <div className="grid-3">
            {tips.slice(0, 3).map((tip, i) => (
              <article className="card photo-card" key={tip.id}>
                <div className="photo-wrap">
                  <img src={tipPhotos[i].photo} alt={tipPhotos[i].alt} loading="lazy" />
                </div>
                <div className="card-body">
                  <span className={`tag ${tipPhotos[i].tone}`}>{tip.topic}</span>
                  <h3>{tip.title}</h3>
                  <p>{tip.text}</p>
                  <span className="card-arrow" aria-hidden="true">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-block">
        <div className="container">
          <div className="section-header">
            <h2>Practise with the built-in tools</h2>
            <p>
              Three calculators and planners that run entirely in your browser.
              Use pretend numbers, make a wrong call, then try again.
            </p>
          </div>
          <div className="grid-3">
            {tools.map((tool) => (
              <div className="feature-item" key={tool.to}>
                <span className={`icon-chip ${tool.tone}`}>
                  <i className={`bi ${tool.icon}`} aria-hidden="true"></i>
                </span>
                <h3>{tool.title}</h3>
                <p>{tool.text}</p>
                <Link className="feature-link" to={tool.to}>
                  {tool.cta} <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-white">
        <div className="container">
          <div className="section-header">
            <h2>Quick links</h2>
            <p>Jump straight into any learning module.</p>
          </div>
          <div className="grid-4">
            {quickLinks.map((link) => (
              <Link className="card quick-card" to={link.to} key={link.to}>
                <span className="card-arrow" aria-hidden="true">
                  <i className="bi bi-arrow-right"></i>
                </span>
                <span className={`icon-chip ${link.tone}`}>
                  <i className={`bi ${link.icon}`} aria-hidden="true"></i>
                </span>
                <h3>{link.title}</h3>
                <p>{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Your path through BudgetBasics</h2>
            <p>
              Seven small stops in the order that makes them click - every page
              ends with a button to the next one.
            </p>
          </div>
          <div className="path-list">
            {pathSteps.map((step) => (
              <Link className="card path-step" to={step.to} key={step.to}>
                <span className="path-num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <span className="card-arrow" aria-hidden="true">
                  <i className="bi bi-arrow-right"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-violet">
        <div className="container">
          <div className="section-header">
            <h2>More from BudgetBasics</h2>
            <p>Guides, galleries and the story behind the project.</p>
          </div>
          <div className="grid-3">
            {moreLinks.map((link) => (
              <Link className="card quick-card" to={link.to} key={link.to}>
                <span className="card-arrow" aria-hidden="true">
                  <i className="bi bi-arrow-right"></i>
                </span>
                <span className={`icon-chip ${link.tone}`}>
                  <i className={`bi ${link.icon}`} aria-hidden="true"></i>
                </span>
                <h3>{link.title}</h3>
                <p>{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-block">
        <div className="container">
          <div className="section-header">
            <h2>Common questions</h2>
            <p>
              Quick answers to what students ask first. The full list, plus the
              feedback form, lives on the feedback page.
            </p>
          </div>
          <div className="accordion">
            {faqs.slice(0, 4).map((f, i) => {
              const open = openFaq === i
              return (
                <div className={`accordion-item${open ? ' open' : ''}`} key={f.id}>
                  <button
                    type="button"
                    className="accordion-btn"
                    aria-expanded={open}
                    aria-controls={`home-faq-${f.id}`}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    <span className="acc-title">{f.question}</span>
                    <i className="bi bi-chevron-down acc-chevron" aria-hidden="true"></i>
                  </button>
                  {open && (
                    <div className="accordion-panel" id={`home-faq-${f.id}`}>
                      <p>{f.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <Link className="btn btn-on-violet mt-3" to="/feedback">
            All questions &amp; feedback <i className="bi bi-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div className="cta-photo">
              <img src="/images/cta-desk.webp" alt="Laptop, mug and notepad on a wooden desk" loading="lazy" />
            </div>
            <div className="cta-copy">
              <h2>Ready to plan your first budget?</h2>
              <p className="text-muted mt-1">
                Add a few expenses and see where your money goes. Nothing is
                saved or sent anywhere.
              </p>
            </div>
            <Link className="btn btn-accent" to="/expense-planner">
              Open Expense Planner <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
