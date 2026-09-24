import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'
import gallery from '../data/gallery.json'
import '../styles/pages-content.css'

const filters = [
  { label: 'All', topic: null },
  { label: 'Needs vs Wants', topic: 'needs-wants' },
  { label: '50-30-20', topic: '50-30-20' },
  { label: 'Saving Challenges', topic: 'saving-challenges' },
  { label: 'Budgeting', topic: 'budgeting' },
]

const topicLabels = {
  'needs-wants': 'Needs vs Wants',
  '50-30-20': '50-30-20',
  'saving-challenges': 'Saving Challenges',
  budgeting: 'Budgeting',
}

export default function Gallery() {
  const [activeTopic, setActiveTopic] = useState(null)
  const [selected, setSelected] = useState(null)

  const items = activeTopic
    ? gallery.filter((g) => g.topic === activeTopic)
    : gallery

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1>Infographics &amp; Visual Guides</h1>
            <p>
              Browse every visual guide in the project. Filter by topic and open
              any card larger to read it properly.
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

      <section className="section band-white">
        <div className="container">
          <div className="filter-pills" role="group" aria-label="Filter infographics by topic">
            {filters.map((f) => (
              <button
                type="button"
                key={f.label}
                className={`filter-pill${activeTopic === f.topic ? ' active' : ''}`}
                aria-pressed={activeTopic === f.topic}
                onClick={() => setActiveTopic(f.topic)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {items.length === 0 ? (
            <p className="gallery-empty">No infographics found for this topic.</p>
          ) : (
            <div className="grid-3">
              {items.map((item) => (
                <article className="card gallery-card" key={item.id}>
                  <img className="gallery-img" src={item.image} alt={item.alt} />
                  <div className="gallery-body">
                    <h2>{item.title}</h2>
                    <span className="badge badge-violet">{topicLabels[item.topic] || item.topic}</span>
                    <p className="gallery-caption">{item.caption}</p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setSelected(item)}
                    >
                      View larger
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="feature-block">
        <div className="container">
          <div className="cta-band no-photo on-feature">
            <div className="cta-copy">
              <h2>Next: About the Project</h2>
              <p className="text-muted mt-1">
                Who built BudgetBasics, what it covers, and why every lesson
                stays free for students.
              </p>
            </div>
            <Link className="btn btn-primary" to="/about">
              Read the story <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>

      <Modal
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? selected.title : ''}
      >
        {selected && (
          <>
            <img className="gallery-modal-img" src={selected.image} alt={selected.alt} />
            <p className="gallery-modal-caption">{selected.caption}</p>
            <p className="gallery-modal-alt">Alt text: {selected.alt}</p>
          </>
        )}
      </Modal>
    </>
  )
}
