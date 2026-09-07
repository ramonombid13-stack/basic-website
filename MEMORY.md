# Project Memory

Progress log for the portfolio website. Append dated sections on "save progress".

## 2026-09-07
- Project started: portfolio site for Ramon Ombid, aspiring VA/Freelancer (GHL Specialist, MonMenTum).
- Decided: plain HTML/CSS/JS, no framework.
- Design: Poppins font. Colors — orange, navy blue, cream beige (exact hex not set yet).
- Folder was empty at start — created CLAUDE.md and MEMORY.md as first files.
- Built the site: index.html, styles.css, script.js.
  - Final palette: cream #F2E8D5 (bg), cream-deep #E9DBBE (surface bands), navy #17263D (text/headers), navy-soft #4A5C74 (secondary text), orange #E2601C (accent/CTA), orange-deep #B84A12 (hover).
  - Layout: hero with inline SVG "lead → automated follow-up → booked call" diagram, About, "How I work" 4-stage pipeline (Audit/Build/Automate/Support), "Recent work" as pipeline-style rows (placeholder case studies), Contact section inverted to solid navy.
  - Verified in headless Chromium at desktop (1440px) and mobile (375px): Poppins loads, no console errors, mobile hamburger nav works, hero SVG draw-in animation respects prefers-reduced-motion.
- Still placeholder / needs real content before launch:
  - Contact email is `you@example.com` — swap for real address.
  - LinkedIn/Facebook links in contact section are `#` — need real URLs.
  - Portfolio "Recent work" entries (3 case studies) are made-up example results — replace with real client work/numbers.
  - Hosting/deploy target not decided.

## 2026-09-07 (later same day) — full rebuild as clone of havemonmentum.com
- User asked to replicate the real live site (www.havemonmentum.com) exactly instead of the simple portfolio above. Confirmed with user before overwriting; they chose to replace.
- Scraped the live site (Playwright): full copy, exact fonts (Instrument Serif, Inter, Space Mono via Google Fonts), exact color tokens, all lucide icon SVGs, and downloaded his real assets (logo, hero video, headshot, case-study screenshots, testimonial screenshots) from his own filesafe.space media library.
- Site is a GHL AI Studio ("vibe") built page — confirmed via `<meta name="author" content="Vibe">` in the page source.
- Rebuilt as static HTML/CSS/JS (index.html, styles.css, script.js) in `assets/` for media. Includes light/dark theme toggle (persisted via localStorage), FAQ accordion (single-open), mobile nav, sticky header.
- **Important finding, flagged to user**: two of the "Results" case-study images pulled from the live site's carousel (for the Instagram/stylist and Slack/medspa cards) actually contained Ramon's own personal info — full name, phone number, and personal Gmail (ombidramon13@gmail.com) — from an unrelated HR-profile screenshot and a test DM thread, not the intended client work. The live site's carousel appears to rotate through images non-deterministically, so **his live public site may currently be showing this too**. Did not use those two images; replaced with "Screenshot not yet added" placeholders in the clone. User should check the live carousel on those two case cards.
- Logo asset had a baked-in white background (no alpha channel) — processed with sharp (installed temporarily in scratchpad) to key out white and trim padding; saved back over assets/logo.png.
- Still placeholder in the clone:
  - Final-CTA "See if we're a good fit" button is `mailto:you@example.com` — original likely links to a real GHL booking calendar; need the real URL.
  - Two case-study images (Instagram/stylist, Slack/medspa) are empty placeholders — need safe replacement screenshots from Ramon directly (not scraped from the carousel).
  - Dark-mode exact colors are an approximation (site's own toggle didn't respond to scripted click) — based on the site's existing dark "How it works" section palette, not independently confirmed.
- Verified via headless Chromium: desktop, mobile, dark mode, FAQ accordion, mobile nav — no console errors, layout matches source screenshots closely.
