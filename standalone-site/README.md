# Bharat Lead Summit 2027 — Standalone Site

A plain HTML/CSS/JS microsite for the Bharat Lead Summit, built from the
documentation set (PRD, Design System, Content Document, Sitemap) supplied
for the site. This is a separate, dependency-free build — no framework,
no build step — that lives alongside the existing React app in this repo.

## Structure
- `index.html` — Home (hero, stats, highlights, gallery, closing CTA)
- `about.html` — Vision & Mission, Leadership, Committees
- `summit.html` — Two-day agenda (Day 1 / Day 2 tabs), highlights, Advisory Board
- `register.html` — 3-step delegate registration flow (category → pass tier → details)
- `sponsorship.html` — Corporate & Educational partnership tiers, current partners
- `contact.html` — Contact form (WhatsApp handoff), venue info, FAQ
- `assets/style.css` — design system (colors, type, glass cards, gradients, motion)
- `assets/main.js` — tabs, reveal-on-scroll, registration flow state, countdown, modal

## Running it
No build tooling required — open `index.html` directly in a browser, or serve
the folder with any static file server, e.g.:

```
npx serve standalone-site
```
