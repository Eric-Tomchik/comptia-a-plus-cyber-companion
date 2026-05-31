# CompTIA A+ Cyber Study Guide — Online Companion

Official online companion for the **CompTIA A+ Cyber Study Guide, 2026 Edition** by Eric Tomchik.

Published by **ArcLight Press**

## 🌐 Live Site

[erictomchik.com/comptia-a-plus-cyber-companion](https://erictomchik.com/comptia-a-plus-cyber-companion)

## 📁 Site Structure

```
├── index.html              # Home page
├── chapters/index.html     # Chapter resources & domain mapping
├── reference/index.html    # Quick reference cards (ports, commands, Event IDs)
├── labs/index.html          # Lab setup guide & exercise overview
├── glossary/index.html      # Searchable glossary of key terms
├── flashcards/index.html    # Interactive flashcard study tool
├── quiz/index.html          # Scenario-based practice quiz
├── errata/index.html        # Errata & updates
├── css/style.css            # Global styles
└── js/app.js                # Interactive features
```

## ✨ Features

- **Chapter Resources** — Learning objectives, key topics, and Security+ domain mapping for all 10 chapters
- **Quick Reference Cards** — Ports & protocols, Windows Event IDs, Linux commands, PowerShell commands, risk formulas, CVSS ranges, order of volatility, and regulatory frameworks
- **Lab Setup Guide** — Hardware requirements, VM download links, and overview of all 7 hands-on lab exercises
- **Searchable Glossary** — All key terms with instant search/filter
- **Interactive Flashcards** — Click-to-flip flashcards with keyboard navigation and shuffle
- **Practice Quiz** — 15 scenario-based questions with instant feedback and detailed explanations
- **Errata & Updates** — Corrections and CompTIA program updates

## 🚀 Deployment

This is a static site — no build tools required. Deploy via GitHub Pages:

1. Go to **Settings** → **Pages** in this repository
2. Set **Source** to **Deploy from a branch**
3. Select **main** branch and **/ (root)** folder
4. Click **Save**

The site will be available at `https://eric-tomchik.github.io/comptia-a-plus-cyber-companion/`

### Custom Domain (erictomchik.com)

To serve from `erictomchik.com/comptia-a-plus-cyber-companion/`:
- If your main site is also on GitHub Pages, this repo will automatically be accessible at that path
- If your main site is hosted elsewhere, you can use a subdomain like `companion.erictomchik.com` with a CNAME record

## 🛠 Tech Stack

- Pure HTML, CSS, JavaScript — no frameworks, no build step
- Google Fonts (Inter, JetBrains Mono)
- Responsive design (mobile-friendly)
- Dark cybersecurity theme
- Print-friendly styles

## 📝 Updating Content

- **Add glossary terms**: Edit `glossary/index.html` — add new `<div class="glossary-item">` blocks
- **Add flashcards**: Edit `flashcards/index.html` — add entries to the `FLASHCARD_DATA` array
- **Add quiz questions**: Edit `quiz/index.html` — add entries to the `QUIZ_DATA` array
- **Add errata**: Edit `errata/index.html` — uncomment and populate the corrections table

## 📄 License

© 2026 Eric Tomchik. All rights reserved.

CompTIA A+ Cyber is a trademark of CompTIA, Inc. This site is not affiliated with or endorsed by CompTIA.
