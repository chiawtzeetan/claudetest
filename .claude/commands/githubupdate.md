---
description: Security-scan, commit, push, deploy via GitHub Pages, and sync README/repo metadata
---

Run the full publish workflow for this repo, in this exact order. Stop and report if any step fails — do not skip ahead.

## 1. Security scan (must pass before anything is pushed)

Scan the working tree and the diff that's about to be committed for secrets or sensitive data:
- `git status` and `git diff` to see what's changing.
- Grep for likely secrets: API keys, tokens, private keys, AWS-style keys (`AKIA...`), `.env` contents, passwords, connection strings (e.g. `grep -rEni "(api[_-]?key|secret|token|password|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z]+ PRIVATE KEY-----)" --include=*.* .` excluding `.git`).
- Confirm no `.env`, credentials, or key files are staged (`git status --porcelain` against `.gitignore`).
- Per `CLAUDE.md`, the contact form destination email in `script.js` is a placeholder (`REPLACE_WITH_YOUR_EMAIL`) and is expected — not a secret to flag.
- If anything suspicious is found, **stop** and report it instead of committing/pushing. Do not attempt to redact and push automatically — let the user decide.

## 2. Update README

Review `README.md` against the current state of `index.html`, `styles.css`, `script.js`, and `.github/workflows/deploy.yml`. Update it if structure, deployment steps, or the live site URL have changed. Keep it concise and consistent with the existing style (it already documents structure, local running, and deployment — don't restructure it, just keep it accurate).

## 3. Verify the GitHub Pages deploy workflow

Check `.github/workflows/deploy.yml` still matches how the site should be built/deployed (static, no build step). Don't modify it unless it's actually broken or out of date — flag any issues rather than rewriting it speculatively.

## 4. Commit and push

If there are changes to commit:
- Stage only the relevant files (never `git add -A`/`git add .` blindly — review what's staged).
- Write a commit message describing the why, following this repo's existing commit style (see `git log`).
- Show the user a one-line summary of what will be pushed and confirm before pushing, since this pushes to the shared `main` branch and triggers a live deploy.
- Push to `origin main`.

If there's nothing to commit, skip straight to step 5 but still verify Pages is deployed and up to date.

## 5. Confirm GitHub Pages deployment

After pushing (or if already up to date), use `gh run list --workflow=deploy.yml --limit 1` and `gh run watch` (or `gh run view`) to confirm the deploy workflow succeeded. If `gh` isn't authenticated or installed, tell the user to check the Actions tab manually and give them the URL.

## 6. Update repo "About" (description + homepage link)

Use `gh repo edit` to set/update:
- `--description` — a short one-line description of the site (Sterling & Vale Advisory marketing/lead-capture site).
- `--homepage` — the live GitHub Pages URL (currently `https://chiawtzeetan.github.io/claudetest/`, per README — confirm it matches the actual Pages URL via `gh api repos/{owner}/{repo}/pages` or the Settings > Pages UI if unsure).

This is a visible change to the public repo — confirm the exact description/homepage text with the user before applying if it's not obvious from existing README content.

## Final report

End with a short summary: what was scanned, what was committed (if anything), the commit hash, deploy workflow run status, and the final repo description/homepage. Flag anything that still needs manual action (e.g. FormSubmit activation email, `gh` not installed/authenticated).
