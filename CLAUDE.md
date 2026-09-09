# Project: Personal showcase site (Awwwards-caliber)

Adds to the global CLAUDE.md. Applies only to this folder.

## What this is
Ramon Ombid's personal design/dev skill-showcase site — NOT a lead-gen funnel.
Superseded the earlier plain "simple portfolio" idea (Poppins, orange/navy/cream) and
the earlier havemonmentum.com static clone. Content centers on Ramon as a builder
("A decade inside other people's systems. Now building his own."), not on selling GHL
services directly — conversion speed is explicitly deprioritized in favor of visual craft.

Spec: `docs/superpowers/specs/2026-09-07-awwwards-showcase-redesign-design.md`
Plan: `docs/superpowers/plans/2026-09-07-awwwards-showcase-redesign.md`

## Stack
- Next.js (App Router), plain JavaScript — no TypeScript.
- React Three Fiber / Three.js for the hero WebGL particle scene.
- GSAP + ScrollTrigger for scroll-driven animation; Lenis for smooth scroll.
- Deploys to the existing Vercel project (`ramonombid13-stacks-projects/basic-website`),
  auto-deploy from GitHub `ramonombid13-stack/basic-website` on push to `main`.

## Design system
- Dark data-flow palette: bg `#0F0E14`, elevated surface `#12111A`, teal accent `#4FADB0`,
  mauve accent `#C98BA3`.
- Type: Instrument Serif (display/italic), Inter (body), Space Mono (small labels).

## Process notes
- Built via superpowers brainstorming → spec → plan → Subagent-Driven Development.
- Working directly on `main`, no git worktree (explicit user preference).
- `.gitignore` must cover `node_modules/`, `.next/`, `.claude/` — a `git add -A` habit
  committed all three early on before this was caught in review; fixed, but worth knowing
  if a future task's `git add -A` sweeps in something new.
- Progress tracked in `.superpowers/sdd/2026-09-07-awwwards-showcase-redesign/progress.md`
  (ledger — survives context loss, trust it over memory).

## Known issue (not part of this repo, flagged separately)
Two case-study images pulled from Ramon's live havemonmentum.com carousel exposed his
personal phone/email — his live site's public carousel may still be showing this.
