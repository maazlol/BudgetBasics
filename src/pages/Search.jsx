import { useState } from 'react'
import { Link } from 'react-router-dom'
import tips from '../data/tips.json'
import faqs from '../data/faqs.json'
import gallery from '../data/gallery.json'
import classifierItems from '../data/classifier.json'
import '../styles/pages-content.css'

const modules = [
  { title: 'Budgeting Basics', path: '/basics', desc: 'Core ideas: income, expenses, tracking and why a budget matters.' },
  { title: 'Needs vs Wants', path: '/needs-wants', desc: 'Sort spending into essentials and extras with everyday examples.' },
  { title: 'The 50-30-20 Rule', path: '/rule-50-30-20', desc: 'Split income into needs, wants and savings with a simple ratio.' },
  { title: 'Savings Goals', path: '/savings-goals', desc: 'Set targets, timelines and milestones for the money you keep.' },
  { title: 'Expense Planner', path: '/expense-planner', desc: 'Plan monthly spending categories before the month starts.' },
  { title: 'Money Mistakes', path: '/money-mistakes', desc: 'Common traps like impulse buys, late fees and unused subscriptions.' },
  { title: 'Learning Gallery', path: '/gallery', desc: 'Infographics and visual guides for budgets, goals and saving.' },
  { title: 'About BudgetBasics', path: '/about', desc: 'How BudgetBasics helps you manage money and who built it.' },
]

const TOPICS = [
  { label: 'All', key: 'all' },
  { label: 'Budgeting', key: 'budgeting' },
  { label: 'Saving', key: 'saving' },
  { label: 'Needs vs Wants', key: 'needs' },
  { label: 'Expenses', key: 'expenses' },
  { label: 'Goals', key: 'goals' },
]

const TOPIC_ALIASES = {
  '50-30-20': 'budgeting',
  'saving-challenges': 'saving',
  'needs-wants': 'needs',
}

const badgeByType = {
  Tip: 'badge-green',
  FAQ: 'badge-violet',
  Infographic: 'badge-gold',
  Module: 'badge-blue',
  Example: 'badge-blue',
}

const linkLabelByType = {
  Module: 'Open module',
  Infographic: 'View in gallery',
  Example: 'See in lesson',
}

function normTopic(topic) {
  return TOPIC_ALIASES[topic] || topic
}

function truncate(text) {
  const value = text || ''
  if (value.length <= 120) return value
  return value.slice(0, 120).trimEnd() + '...'
}

const searchable = [
  ...tips.map((t) => ({ type: 'Tip', title: t.title, snippet: t.text, topic: normTopic(t.topic), path: '' })),
  ...gallery.map((g) => ({ type: 'Infographic', title: g.title, snippet: g.caption, topic: normTopic(g.topic), path: '/gallery' })),
  ...classifierItems.map((i) => ({ type: 'Example', title: i.label, snippet: i.explain, topic: 'needs', path: '/needs-wants' })),
  ...faqs.map((f) => ({ type: 'FAQ', title: f.question, snippet: f.answer, topic: null, path: '' })),
  ...modules.map((m) => ({ type: 'Module', title: m.title, snippet: m.desc, topic: null, path: m.path })),
]

const browseable = searchable.filter((item) => item.topic)

export default function Search() {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('all')
  const q = query.trim().toLowerCase()
  const topicLabel = TOPICS.find((t) => t.key === topic).label

  let items
  if (q) {
    items = searchable.filter(
      (item) =>
        (topic === 'all' || item.topic === topic) &&
        `${item.title} ${item.snippet}`.toLowerCase().includes(q)
    )
  } else {
    items = topic === 'all' ? browseable : browseable.filter((item) => item.topic === topic)
  }

  const status = q
    ? `${items.length} result${items.length === 1 ? '' : 's'} for "${query}"${topic !== 'all' ? ` in ${topicLabel}` : ''}`
    : `${items.length} item${items.length === 1 ? '' : 's'}${topic !== 'all' ? ` in ${topicLabel}` : ' to browse'}`

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1>Search BudgetBasics</h1>
            <p>
              Look up tips, FAQs, examples and visual guides by keyword, or
              filter the whole library by topic.
            </p>
          </div>
          <div className="page-hero-photo">
            <img
              src="/images/mod-gallery.webp" fetchPriority="high"
              alt="Laptop screen showing colourful charts and graphs"
            />
          </div>
        </div>
      </section>

      <div className="container content-wrap">
        <div className="field search-field">
          <label htmlFor="site-search">Search the site</label>
          <div className="search-wrap">
            <i className="bi bi-search" aria-hidden="true"></i>
            <input
              id="site-search"
              type="search"
              placeholder="saving, 50-30-20, subscriptions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-pills" role="group" aria-label="Filter content by topic">
          {TOPICS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`filter-pill${topic === t.key ? ' active' : ''}`}
              aria-pressed={topic === t.key}
              onClick={() => setTopic(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="search-count">{status}</p>

        {items.length === 0 ? (
          <p className="search-hint">
            No results found for "{query}"{topic !== 'all' ? ` in ${topicLabel}` : ''}.
            Try a different keyword or topic.
          </p>
        ) : (
          <div className="search-grid">
            {items.map((item, i) => (
              <article className="card result-card" key={`${item.type}-${item.title}-${i}`}>
                <div className="result-top">
                  <span className={`badge ${badgeByType[item.type]}`}>{item.type}</span>
                  <h2>{item.title}</h2>
                </div>
                <p className="snippet">{truncate(item.snippet)}</p>
                {item.path && (
                  <Link className="result-link" to={item.path}>
                    {linkLabelByType[item.type]}
                  </Link>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
