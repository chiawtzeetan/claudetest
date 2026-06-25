# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page marketing/lead-capture site for "Sterling & Vale Advisory," a fictional investment advisory firm. Built as plain HTML/CSS/JS with no framework, build step, or package manager.

## Running and testing

There is no build process. Open `index.html` directly in a browser (double-click, or `open index.html` on macOS) — no local server is required.

There are no automated tests or lint configs in this repo. Verify changes manually in the browser:
- Resize the viewport to ~375px, ~768px, and ~1280px to check responsive breakpoints (defined in `styles.css`)
- Check the browser console for errors
- Exercise the nav hamburger menu (mobile), testimonial carousel, and contact form validation

## Architecture

Three files, each with a single responsibility:
- `index.html` — all markup for the page's sections in order: sticky navbar, hero, services grid, testimonials carousel, contact form, footer
- `styles.css` — theme and layout. Colors, fonts, and spacing are defined as CSS custom properties in `:root` at the top of the file; change values there rather than hardcoding colors elsewhere. Mobile-first with `@media (min-width: 768px)` and `@media (min-width: 1280px)` breakpoints.
- `script.js` — all behavior, organized into independent sections (each with a `// ---------- Section ----------` comment banner): footer year, mobile nav toggle, scroll-in fade animations (IntersectionObserver on elements with the `.fade-in` class), testimonial carousel (auto-rotating, with manual prev/next/dot controls), and the contact form submission handler.

### Contact form

The enquiry form in `index.html` posts via `fetch()` as JSON to FormSubmit's AJAX endpoint (`https://formsubmit.co/ajax/...`) rather than a normal HTML form POST, so the page doesn't redirect. Key things to know when touching this:
- The destination email is a placeholder — search `script.js` for `REPLACE_WITH_YOUR_EMAIL` before this form can actually deliver mail.
- FormSubmit requires a one-time activation: the first submission to a new address triggers a confirmation email, and the form won't deliver subsequent submissions until that link is clicked.
- Client-side validation (required fields + email regex) runs in `validateForm()` before any network request is made.
- A hidden honeypot field (`_honey`) is used for basic spam filtering — if it has a value, the submit handler is supposed to be treated as a likely-bot submission.
