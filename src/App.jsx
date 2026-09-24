import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WelcomeStrip from './components/WelcomeStrip'
import Ticker from './components/Ticker'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import './styles/pages.css'
import './styles/pages-tools.css'
import './styles/pages-content.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/global.css'
import './styles/components.css'

const Basics = lazy(() => import('./pages/Basics'))
const NeedsWants = lazy(() => import('./pages/NeedsWants'))
const Rule503020 = lazy(() => import('./pages/Rule503020'))
const SavingsGoals = lazy(() => import('./pages/SavingsGoals'))
const ExpensePlanner = lazy(() => import('./pages/ExpensePlanner'))
const MoneyMistakes = lazy(() => import('./pages/MoneyMistakes'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Feedback = lazy(() => import('./pages/Feedback'))
const Contact = lazy(() => import('./pages/Contact'))
const About = lazy(() => import('./pages/About'))
const Search = lazy(() => import('./pages/Search'))

export default function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark)
  }, [dark])

  return (
    <BrowserRouter>
      <Header dark={dark} onToggleDark={() => setDark(!dark)} />
      <WelcomeStrip />
      <Ticker />
      <main>
        <Suspense
          fallback={
            <div className="route-loading">
              <i className="bi bi-hourglass-split" aria-hidden="true"></i>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basics" element={<Basics />} />
            <Route path="/needs-wants" element={<NeedsWants />} />
            <Route path="/rule-50-30-20" element={<Rule503020 />} />
            <Route path="/savings-goals" element={<SavingsGoals />} />
            <Route path="/expense-planner" element={<ExpensePlanner />} />
            <Route path="/money-mistakes" element={<MoneyMistakes />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  )
}
