# Design: Awwwards-caliber personal showcase redesign

Date: 2026-09-07
Status: Approved by user in brainstorming session, pending spec review

## Purpose

Replace the current `basic-website` repo content — currently a static clone of the
live MonMenTum/GHL business site (havemonmentum.com) — with a personal portfolio
piece for Ramon Ombid designed to be Awwwards-submission caliber. This is a skill
showcase, not a lead-generation funnel: conversion speed and SMB-friendly load
times are explicitly **not** the priority here. Visual craft and technical depth
(real WebGL, not a lightweight substitute) are the priority.

The current MonMenTum clone content (GHL services pitch, case studies as sales
material, FAQ, booking CTAs) is being replaced, not extended. The `basic-website`
GitHub repo and Vercel project are reused (same URLs), but the codebase is
effectively a new project.

## Concept & narrative

Source: Ramon's own existing "Why me" copy — *"A decade inside other people's
systems. Now building his own."* The redesign makes this literal in the hero:
a visual of scattered, chaotic signals (representing the mess of "other
people's systems" — missed calls, no-shows, forgotten follow-ups) resolving
into one clean, flowing pipeline as the visitor scrolls. The rest of the page
carries the same "operator turned builder" story forward in plain content.

## Visual direction

**Dark data-flow.** Near-black background (~#0F0E14 / #12111A), glowing
particle/line accents in teal (~#4FADB0) and mauve (~#C98BA3) — carried over
from the current site's accent mauve, shifted into a glow-on-dark treatment
rather than the current cream/mauve daylight palette. Instrument Serif
(italic) continues as the display typeface for headline moments; Inter for
body; Space Mono for small mono labels — same type system as the current
site, new color/motion treatment.

This direction was chosen after comparing 4 mood directions (dark data-flow,
editorial kinetic type, 3D network object, fluid gradient/glass) via the
visual brainstorming companion — dark data-flow was selected because it ties
directly to the "systems" narrative rather than being a generic trend pick.

## Page structure

1. **Hero** — the WebGL scroll-driven sequence (signature moment, see below)
2. **About/Story** — the operator-to-builder narrative, real photo (existing
   headshot asset), credentials (10+ years, GHL Certified, 5+ industries —
   reuse existing stat copy)
3. **What I build** — capability showcase, adapted from the current "What I
   do" outcome cards (Lead Capture / Automation / Booking / Reactivation),
   reframed as skills/capabilities rather than services-for-hire
4. **Selected work** — 3 case studies, reusing the verified-safe assets and
   copy already in the repo: ELE Insurance (non-life insurance lead
   pipeline), TinkerTribe (complete GHL ecosystem build), 29:11 Dental Clinic
   (patient management system). Framed as "systems I've built," not a sales
   pitch. The two case studies that never got real images (Instagram/stylist,
   Slack/medspa) are dropped from this redesign rather than carried forward
   as placeholders.
5. **Contact** — direct, simple; real contact method still needed from Ramon
   (current site has a placeholder `mailto:you@example.com`)

## Hero scroll sequence (storyboard)

Approved after comparing 3 animation concepts (chaos→pipeline,
erratic-pulse→steady-signal, falling-signals-caught-by-rising-line) via the
visual companion. **Chaos → Pipeline** was selected:

| Scroll position | Visual |
|---|---|
| 0% | Scattered, dim signal points with small mono-font labels ("missed call," "no-show," "forgotten follow-up"). Disconnected, no order. |
| ~33% | Faint threads begin linking the scattered points; motion becomes directional instead of random. |
| ~66% | Clean lanes form; particles flow smoothly and fast along them. Order has visibly replaced chaos. |
| 100% | Particle flow settles into calm ambient motion behind the resolved headline: *"A decade inside other people's systems. Now building his own."* Scroll-hijack releases; normal page scroll continues from here into About. |

The hero section is pinned (via GSAP ScrollTrigger) while this sequence
scrubs; once resolved, scroll behaves normally for the rest of the page.

## Technical architecture

**Stack:** Next.js (App Router), plain JavaScript (not TypeScript — keeps the
codebase approachable for Ramon to read/maintain), React Three Fiber for the
hero WebGL scene, GSAP + ScrollTrigger for the scroll-driven timeline, Lenis
for smooth scroll across the whole page.

This was chosen over a lighter Vite + vanilla Three.js approach: Next.js +
R3F is the more standard, more extensible stack for this category of site,
and is a better long-term skill investment for a site that is itself selling
"I build systems." The tradeoff (a real React/Next learning curve) was
explicitly accepted.

**Structure:**
- `app/page.jsx` — assembles the page sections
- `components/HeroScene.jsx` — the R3F `<Canvas>` and particle system. A GSAP
  ScrollTrigger pins the hero and scrubs a 0→1 progress value through the
  four storyboard beats as the visitor scrolls.
- `components/sections/{About,WhatIBuild,Work,Contact}.jsx` — plain
  HTML/CSS, each with one consistent, restrained GSAP scroll-reveal
  (fade + slight rise on entry). Not a different effect per section — one
  motion language throughout, per "spend your boldness in one place."
- Lenis wraps the page (`RootLayout` or a client-side provider) and feeds
  `ScrollTrigger.update` on its scroll event, with `gsap.ticker` driving
  `lenis.raf` — the documented Lenis+GSAP integration pattern — so smooth
  scroll and the pinned hero scrub stay in sync.

**Performance & fallbacks:**
- `prefers-reduced-motion: reduce` → skip the particle scrub entirely; show
  the resolved "pipeline" frame as a static image/SVG instead of the R3F
  canvas.
- The Three.js/R3F bundle loads via dynamic import with `ssr: false` so it
  doesn't block first paint or the rest of the page's content.
- Particle count and `devicePixelRatio` are capped, with a reduced particle
  count on small/mobile viewports.
- A static gradient placeholder renders while the canvas and fonts
  initialize — no layout shift, no blank flash.

**QA:** Playwright screenshots across desktop/mobile breakpoints (same
approach used for the earlier static clone), a Lighthouse pass to catch
performance regressions from the WebGL bundle, and manual scroll-scrub
testing of the hero sequence at multiple speeds. Reduced-motion fallback is
tested explicitly (OS-level toggle), not just coded and assumed correct.

**Deployment:** Same Vercel project (`ramonombid13-stacks-projects/basic-website`,
same GitHub repo `ramonombid13-stack/basic-website`). Next.js deploys to
Vercel natively — no new project setup, just a change in what's being built
and deployed from the same repo. The GitHub→Vercel auto-deploy connection
already in place continues to work unchanged.

## Explicitly out of scope for this redesign

- Live-funnel conversion concerns (booking-call CTAs, urgency copy, SMB
  sales framing) — this is a showcase piece, not the business's live funnel.
- The two dropped case studies (Instagram/stylist, Slack/medspa) — no
  replacement images are being sourced as part of this redesign; if Ramon
  wants them back later, that's a separate follow-up with real assets.
- Exact particle-shader implementation details, exact copy for
  About/Skills sections beyond what already exists, and final color hex
  refinement beyond the approved mood direction — these are implementation
  details to be resolved during the implementation plan / build, not
  upfront design decisions.

## Open item

Contact method (currently a placeholder `mailto:you@example.com` in the
existing site) still needs a real value from Ramon before this ships.
