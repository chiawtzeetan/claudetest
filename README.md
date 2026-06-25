# Sterling & Vale Advisory

A single-page marketing/lead-capture site for "Sterling & Vale Advisory," a fictional investment advisory firm. Built with plain HTML, CSS, and JavaScript — no framework, build step, or package manager.

**Live site:** https://chiawtzeetan.github.io/claudetest/

## Running locally

Open `index.html` directly in a browser (double-click, or `open index.html` on macOS) — no local server is required.

## Structure

- `index.html` — page markup: navbar, hero, services, testimonials, contact form, footer
- `styles.css` — theme and layout, including responsive breakpoints
- `script.js` — nav toggle, scroll animations, testimonial carousel, and contact form handling

See `CLAUDE.md` for more detail on architecture and the contact form's FormSubmit integration.

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.
