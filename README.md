# BudgetBasics - NextGen BudgetBee

## Problem Definition

Managing personal finances is an important life skill. Many students start handling allowances, scholarships, internship income, or part-time earnings without a simple way to plan and track their money. Small daily expenses can quickly reduce the money available for important requirements, learning resources, transportation, and savings.

A student-friendly website can make financial concepts easier to understand by using clear explanations, relatable examples, visual infographics, and simple interactive tools. BudgetBasics is proposed as a solution that helps learners understand where money comes from, how it is spent, and how small planning decisions can build better money habits.

## Project Overview

BudgetBasics is a responsive educational Single Page Application built with React (Vite) and JavaScript. It helps students learn personal budgeting fundamentals through beginner-friendly guides, infographics, examples, and interactive financial awareness tools.

The website covers budgeting basics, needs vs wants, the 50-30-20 rule, savings goals, an expense planner, common money mistakes, a learning gallery, and search/filter. It does not provide banking services or real financial transactions.

There is no backend, database, login storage, or server-side data. Form submissions use client-side validation and show a confirmation message only. Content (tips, FAQs, budget examples, gallery items) lives in pre-populated JSON files under `src/data/`.

## Features

### Global (every page)
- Header with BudgetBasics logo, project tagline, welcome banner, and responsive navigation with active, hover, and focus states
- Featured budgeting tips, quick facts, and clear calls to action
- Simulated visitor counter and real-time date/time display
- Sitemap link, footer navigation, and back-to-top control
- Financial tips ticker
- Optional dark mode with readable contrast
- Search across learning content (keywords such as saving, needs, expenses, goals), topic filters for tips and infographics, and a clear "no results found" message

### 1. Budgeting Basics Module
- Cards for income, fixed expenses, variable expenses, requirements, wants, and savings
- Student monthly budget with clearly labeled currency values
- Short knowledge check with interactive feedback

### 2. Needs vs Wants Module
- Examples of essential vs optional spending categories
- Interactive classifier: users mark items as Need or Want and get feedback with an explanation
- Visual decision guide to help delay non-essential purchases

### 3. 50-30-20 Rule Module
- Explains the 50% needs / 30% wants / 20% savings split
- Calculator accepts a monthly income and calculates the three suggested amounts
- Results shown with labels, progress bars, and a Chart.js doughnut chart
- Educational note: the split is a guideline, adjustable, and an estimate for learning only
- Blank and invalid inputs are validated with clear error messages

### 4. Savings Goals Module
- Inputs: goal name, target amount, current savings, expected monthly contribution
- Outputs: remaining amount, estimated months, progress bar, and an encouraging savings tip
- Validates empty, negative, and non-numeric values
- Handles edge cases (goal already reached, monthly contribution of 0)

### 5. Expense Planner
- Add expense entries: date, category, description, amount
- Categories: Food, Transport, Education, Entertainment, Shopping, Utilities, Miscellaneous
- Temporary on-screen table for the current session only (refresh clears entries)
- Edit and remove entries
- Total planned expenses and remaining balance with over-budget warning

### 6. Money Mistakes Module
- Covers impulse buying, ignoring small expenses, late payments, unused subscriptions, and spending without a plan
- Each mistake includes a realistic student scenario and a corrective action
- Expand/collapse interactive cards (accordion style)

### 7. Infographics and Learning Gallery
- Original visuals: Needs vs Wants, 50-30-20 split, monthly budget cycle, and saving challenges
- Readable captions and alternative text on all images
- Filter the gallery by topic; modal view for a larger image

### 8. Search, Sort, and Filter
- Search learning content by keywords (saving, needs, expenses, goals, and more)
- Filter tips, examples, and infographics by topic
- Clear message when no matching content is found

### 9. About Us, Feedback, and Contact Us
- About: purpose of the website and creator information
- Feedback form: name, email, star rating, comments - client-side validation only, then a confirmation message (nothing is stored or transmitted)
- Contact form: name, email, subject, message with email format validation and confirmation
- Contact information and social-style links displayed on the page

### 10. Additional Website Features
- Responsive navigation menu with active, hover, and focus states
- Dark mode with readable contrast
- Smooth, subtle section transitions and learning cards
- Financial tips ticker
- Back-to-top control and clear footer navigation
- Keyboard-accessible controls and visible focus indicators

## Languages and Technologies Used
- **React 19 (Vite 8)** - SPA structure, components, and client-side routing
- **JavaScript (JSX)** - application logic, calculations, and form validation
- **React Router 7** - page routing without a server
- **CSS3** - custom handwritten styles, CSS variables for the theme, flexbox, grid, media queries (no CSS framework)
- **Chart.js 4 + react-chartjs-2** - 50-30-20 doughnut chart
- **Bootstrap Icons** - all icons across the site (no emojis anywhere)
- **Plus Jakarta Sans** - self-hosted woff2 fonts (headings and body)
- **JSON** - tips, FAQs, budgets, classifier items, and gallery content
- **Local SVG illustrations** - original flat artwork under `public/images/` (no broken external image links)

## Tools We Used
- VS Code for writing the code
- Chrome DevTools (device toolbar) for testing the responsive layout on mobile, tablet, and desktop sizes
- Chrome as the main testing browser (also checked on Firefox and Edge)
- Google Lighthouse for performance, accessibility, and SEO checks

## Folder Structure
```
BudgetBasics/
├── index.html
├── netlify.toml
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── fonts/                   (self-hosted Plus Jakarta Sans woff2)
│   └── images/                  (photo WebP files, infographics, spot SVGs, empty-state)
├── src/
│   ├── main.jsx
│   ├── App.jsx                 (routes, dark mode, shell layout)
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   ├── Ticker.jsx
│   │   ├── WelcomeStrip.jsx
│   │   └── BackToTop.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Basics.jsx
│   │   ├── NeedsWants.jsx
│   │   ├── Rule503020.jsx
│   │   ├── SavingsGoals.jsx
│   │   ├── ExpensePlanner.jsx
│   │   ├── MoneyMistakes.jsx
│   │   ├── Gallery.jsx
│   │   ├── Feedback.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   └── Search.jsx
│   ├── data/
│   │   ├── tips.json
│   │   ├── faqs.json
│   │   ├── budgets.json
│   │   ├── classifier.json
│   │   └── gallery.json
│   ├── styles/
│   │   ├── global.css
│   │   ├── components.css
│   │   ├── app-ui.css
│   │   ├── pages.css
│   │   ├── pages-tools.css
│   │   └── pages-content.css
│   └── assets/
└── README.md
```

## How to Run
1. Install Node.js 18 or newer
2. Open a terminal in the project folder
3. Run `npm install`
4. Run `npm run dev` and open the URL printed in the terminal (default `http://localhost:5173`)
5. For a production build: `npm run build`, then `npm run preview` to serve the `dist` folder
6. No backend or database installation is needed - everything runs in the browser

## Assumptions
1. There is no server - form submissions are validated on the client and only show a confirmation message; nothing is saved or sent
2. Expense planner entries live in component state for the current session only; a refresh clears them
3. Visitor counter is simulated in the browser (not a real analytics service)
4. Currency values use the label "Rs" and are example figures, not real financial data
5. Calculations (50-30-20 split, savings timeline, expense totals) use labeled educational formulas with assumptions stated in the UI
6. All illustrations are original local files so the site has no broken image links
7. Dark mode is optional and session-only (not persisted unless the user toggles it again)

## Project Scope Notes
- No backend, database, server storage, login persistence, or payment integration
- Your data stays yours - nothing you type is stored or sent anywhere

## Non-Functional Focus
- Safe to use (no unexpected downloads; clear external links)
- Accessible (keyboard navigation, labels, alt text, visible focus, readable contrast)
- User-friendly language and consistent controls
- Reliable calculations with correct formulas and labeled assumptions
- Fast load and smooth, subtle animations
- Responsive on desktop, tablet, and mobile
- Works on recent Chrome, Firefox, Edge, and Safari
- Organized, commented, modular code for maintainability
- No sensitive financial or banking data is collected

## Documentation
Full project documentation is provided separately as a PDF (cover, table of contents, and 10 chapters covering overview, features, architecture, design system, data, assumptions, how to run, tools, non-functional requirements, and code conventions). It is not stored in this repository.

## Notes
- No readymade templates were used - the design and CSS are fully custom
- No emojis are used anywhere in the UI or code
- Bootstrap Icons are used for all iconography
- Code is kept clean, modular, and easy to follow

## License
Content and visuals are original work and are not financial advice.
