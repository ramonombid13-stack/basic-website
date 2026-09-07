# Awwwards Showcase Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static MonMenTum clone in `basic-website` with a Next.js + WebGL personal showcase site built around the "chaos → pipeline" scroll narrative.

**Architecture:** A Next.js (App Router, JavaScript) single page. The hero is a client-only React Three Fiber particle scene whose progress is driven by a pinned GSAP ScrollTrigger and fed by pure, unit-tested interpolation functions. Four plain HTML/CSS sections below the hero (About, What I Build, Selected Work, Contact) use a shared GSAP scroll-reveal wrapper. Lenis provides smooth scroll site-wide and is kept in sync with ScrollTrigger.

**Tech Stack:** Next.js 14 (App Router, JS), React 18, three.js, @react-three/fiber, @react-three/drei, gsap (+ScrollTrigger), lenis, Vitest (unit tests for pure logic), Playwright (visual/behavioral verification).

**Spec:** `docs/superpowers/specs/2026-09-07-awwwards-showcase-redesign-design.md`

## Global Constraints

- JavaScript only — no TypeScript (from spec's architecture decision, keeps the codebase approachable).
- `prefers-reduced-motion: reduce` must render a real static fallback, not just fewer particles (spec: Performance & fallbacks).
- Dark data-flow palette: background `#0F0E14` (with `#12111A` as a secondary depth tone), teal accent `#4FADB0`, mauve accent `#C98BA3`. Typefaces: Instrument Serif (display/italic), Inter (body), Space Mono (small labels) — same type system as the current site (spec: Visual direction).
- Reuse the same GitHub repo (`ramonombid13-stack/basic-website`) and Vercel project (`ramonombid13-stacks-projects/basic-website`) — no new repo or project (spec: Deployment).
- Selected Work shows exactly the 3 verified case studies — ELE Insurance, TinkerTribe, 29:11 Dental Clinic. No placeholder cards for the two dropped case studies (spec: Page structure item 4).
- Contact uses the existing placeholder `mailto:you@example.com`, clearly marked for Ramon to replace with a real address before shipping (spec: Open item).
- No unnecessary abstraction — smallest code that satisfies each task (user's standing code-style preference).

---

## Task 1: Project scaffold & dependencies

**Files:**
- Create: `package.json`, `next.config.js`, `jsconfig.json`, `vitest.config.js`, `playwright.config.js`
- Create: `app/layout.jsx` (minimal placeholder body), `app/page.jsx` (minimal placeholder), `app/globals.css` (empty)
- Delete: `index.html`, `styles.css`, `script.js` (old static site, being fully replaced per spec)
- Delete: `assets/hero-video.mp4`, `assets/testimonial-sam.png`, `assets/testimonial-enrique.png`, `assets/logo-mark-alt.png`, `assets/logo.png` (not referenced anywhere in the approved spec's page structure — video and testimonials were dropped, and the MonMenTum arrow-wordmark logo doesn't fit the personal-showcase content pivot, which uses a text identity mark instead; see Task 2)
- Test: none yet (scaffold task — verified by dev server boot, not a unit test)

**Interfaces:**
- Consumes: nothing (first task)
- Produces: a runnable Next.js dev server at `http://localhost:3000` serving an empty page. All later tasks build on this.

- [ ] **Step 1: Remove the old static site and unused assets**

```bash
git rm index.html styles.css script.js
git rm assets/hero-video.mp4 assets/testimonial-sam.png assets/testimonial-enrique.png assets/logo-mark-alt.png assets/logo.png
```

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "basic-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "three": "^0.169.0",
    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.114.0",
    "gsap": "^3.12.5",
    "lenis": "^1.1.14"
  },
  "devDependencies": {
    "vitest": "^2.1.0",
    "@playwright/test": "^1.47.0"
  }
}
```

- [ ] **Step 3: Install dependencies**

```bash
npm install
```

Expected: installs cleanly. If npm reports a peer-dependency conflict, accept the version npm resolves to (it will pick a compatible React 18-line release) — the exact patch versions above are a floor, not a pin.

- [ ] **Step 4: Create `next.config.js`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
```

- [ ] **Step 5: Create `jsconfig.json`** (enables the `@/` import alias used throughout later tasks)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

- [ ] **Step 6: Create a minimal `app/globals.css`**

```css
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 7: Create a minimal `app/layout.jsx`**

```jsx
import './globals.css';

export const metadata = {
  title: 'Ramon Ombid — Systems Builder',
  description:
    "GoHighLevel systems builder. A decade inside other people's systems, now building his own.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create a minimal `app/page.jsx`**

```jsx
export default function Home() {
  return <main>Scaffold OK</main>;
}
```

- [ ] **Step 9: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['lib/**/*.test.js'],
  },
});
```

- [ ] **Step 10: Create `playwright.config.js`**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 30000,
  },
  use: {
    baseURL: 'http://localhost:3000',
  },
});
```

- [ ] **Step 11: Verify the dev server boots and serves the scaffold page**

```bash
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep "Scaffold OK"
kill %1
```

Expected: the grep finds "Scaffold OK" in the response body.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js app, remove old static site"
```

---

## Task 2: Design tokens, fonts, root layout, identity mark

**Files:**
- Modify: `app/globals.css` (add full design token system + base styles)
- Modify: `app/layout.jsx` (add fonts, identity mark)
- Test: `e2e/layout.spec.js`

**Interfaces:**
- Consumes: nothing new
- Produces: CSS custom properties (`--bg`, `--bg-elevated`, `--text`, `--text-muted`, `--teal`, `--mauve`, `--font-serif`, `--font-sans`, `--font-mono`) that every later section relies on. A `.section-pad` and `.eyebrow` utility class used by every section component from Task 10 onward.

- [ ] **Step 1: Write the full `app/globals.css`**

```css
:root {
  --bg: #0f0e14;
  --bg-elevated: #171520;
  --text: #f0eae2;
  --text-muted: #a79da0;
  --teal: #4fadb0;
  --mauve: #c98ba3;
  --border: rgba(255, 255, 255, 0.1);

  --font-serif: 'Instrument Serif', serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Space Mono', monospace;

  --max-w: 1160px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: auto; /* Lenis owns smooth scrolling, not native CSS */
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  display: block;
}

h1,
h2,
h3 {
  margin: 0;
  font-weight: 400;
  font-family: var(--font-serif);
}

p {
  margin: 0;
}

em {
  color: var(--mauve);
  font-style: italic;
}

a {
  color: inherit;
}

:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 3px;
}

.section-pad {
  max-width: var(--max-w);
  margin-inline: auto;
  padding: clamp(3rem, 8vw, 6rem) clamp(1.25rem, 4vw, 2rem);
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.site-mark {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 40;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--text);
  text-decoration: none;
  opacity: 0.9;
}

.site-mark:hover {
  opacity: 1;
}

.btn {
  display: inline-block;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.75rem 1.6rem;
  border-radius: 9999px;
  text-decoration: none;
}

.btn-solid {
  background: var(--teal);
  color: #0f0e14;
}

.btn-solid:hover {
  background: #6fc0c2;
}
```

- [ ] **Step 2: Update `app/layout.jsx`** to load fonts and add the identity mark

```jsx
import './globals.css';

export const metadata = {
  title: 'Ramon Ombid — Systems Builder',
  description:
    "GoHighLevel systems builder. A decade inside other people's systems, now building his own.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="/" className="site-mark">
          Ramon Ombid
        </a>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Write the Playwright test `e2e/layout.spec.js`**

```js
import { test, expect } from '@playwright/test';

test('page loads with dark background and identity mark', async ({ page }) => {
  await page.goto('/');
  const bg = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor
  );
  expect(bg).toBe('rgb(15, 14, 20)'); // #0f0e14
  await expect(page.locator('.site-mark')).toHaveText('Ramon Ombid');
});
```

- [ ] **Step 4: Run the test**

Since Steps 1–2 above already apply the changes this test checks, run it now to confirm it passes (rather than a red/green cycle — there's no separate "implementation" step after the test for this task):

```bash
npx playwright test e2e/layout.spec.js
```

Expected: PASS (1 passed).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add design tokens, fonts, and site identity mark"
```

---

## Task 3: Lenis + GSAP ScrollTrigger provider

**Files:**
- Create: `components/LenisProvider.jsx`
- Modify: `app/layout.jsx` (wrap children in the provider)
- Test: `e2e/lenis.spec.js`

**Interfaces:**
- Consumes: nothing new
- Produces: a running Lenis instance synced to `gsap.ticker`, exposed as `window.__lenis` for test/debug purposes. Every later ScrollTrigger (Task 8's hero pin, Task 10's ScrollReveal) relies on `ScrollTrigger` already being registered and kept in sync by this provider.

- [ ] **Step 1: Create `components/LenisProvider.jsx`**

```jsx
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis();

    if (typeof window !== 'undefined') {
      window.__lenis = lenis;
    }

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (typeof window !== 'undefined') {
        delete window.__lenis;
      }
    };
  }, []);

  return children;
}
```

- [ ] **Step 2: Wire it into `app/layout.jsx`**

```jsx
import './globals.css';
import LenisProvider from '@/components/LenisProvider';

export const metadata = {
  title: 'Ramon Ombid — Systems Builder',
  description:
    "GoHighLevel systems builder. A decade inside other people's systems, now building his own.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="/" className="site-mark">
          Ramon Ombid
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Write the Playwright test `e2e/lenis.spec.js`**

```js
import { test, expect } from '@playwright/test';

test('Lenis is initialized on page load', async ({ page }) => {
  await page.goto('/');
  const hasLenis = await page.evaluate(() => typeof window.__lenis === 'object');
  expect(hasLenis).toBe(true);
});
```

- [ ] **Step 4: Run the test**

```bash
npx playwright test e2e/lenis.spec.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Lenis smooth scroll synced with GSAP ScrollTrigger"
```

---

## Task 4: Scroll progress logic (`lib/scrollProgress.js`)

**Files:**
- Create: `lib/scrollProgress.js`
- Test: `lib/scrollProgress.test.js`

**Interfaces:**
- Consumes: nothing (pure function module)
- Produces: `getBeatState(progress: number) => { beat: string, beatIndex: number, localProgress: number, globalProgress: number }` and `BEATS` (array of `{ name, start, end }`). Consumed by `ParticleField` (Task 6) and `HeroContent` (Task 7) to know which storyboard beat is active.

- [ ] **Step 1: Write the failing test `lib/scrollProgress.test.js`**

```js
import { describe, it, expect } from 'vitest';
import { getBeatState, clamp01, BEATS } from './scrollProgress';

describe('clamp01', () => {
  it('clamps below 0 to 0', () => {
    expect(clamp01(-0.5)).toBe(0);
  });
  it('clamps above 1 to 1', () => {
    expect(clamp01(1.5)).toBe(1);
  });
  it('passes through in-range values', () => {
    expect(clamp01(0.42)).toBe(0.42);
  });
});

describe('getBeatState', () => {
  it('returns the chaos beat at progress 0', () => {
    const state = getBeatState(0);
    expect(state.beat).toBe('chaos');
    expect(state.localProgress).toBe(0);
  });

  it('returns the resolve beat at progress 1', () => {
    const state = getBeatState(1);
    expect(state.beat).toBe('resolve');
    expect(state.localProgress).toBe(1);
  });

  it('returns the pipeline beat partway through its own range', () => {
    const state = getBeatState(0.78); // pipeline spans 0.66–0.9
    expect(state.beat).toBe('pipeline');
    expect(state.localProgress).toBeCloseTo((0.78 - 0.66) / (0.9 - 0.66), 5);
  });

  it('covers the full 0..1 range without gaps', () => {
    for (let p = 0; p <= 1; p += 0.01) {
      const state = getBeatState(p);
      expect(BEATS.map((b) => b.name)).toContain(state.beat);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npx vitest run lib/scrollProgress.test.js
```

Expected: FAIL — `Cannot find module './scrollProgress'` (file doesn't exist yet).

- [ ] **Step 3: Write `lib/scrollProgress.js`**

```js
// The four storyboard beats from the design spec, as fractions of total
// hero scroll progress (0 = top of pin, 1 = fully resolved).
export const BEATS = [
  { name: 'chaos', start: 0, end: 0.33 },
  { name: 'connecting', start: 0.33, end: 0.66 },
  { name: 'pipeline', start: 0.66, end: 0.9 },
  { name: 'resolve', start: 0.9, end: 1 },
];

export function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

export function getBeatState(progress) {
  const p = clamp01(progress);
  const beat = BEATS.find((b) => p >= b.start && p <= b.end) ?? BEATS[BEATS.length - 1];
  const span = beat.end - beat.start;
  const localProgress = span === 0 ? 1 : clamp01((p - beat.start) / span);
  return {
    beat: beat.name,
    beatIndex: BEATS.indexOf(beat),
    localProgress,
    globalProgress: p,
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx vitest run lib/scrollProgress.test.js
```

Expected: PASS (8 passed).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add scroll progress beat-state logic"
```

---

## Task 5: Particle position logic (`lib/particlePositions.js`)

**Files:**
- Create: `lib/particlePositions.js`
- Test: `lib/particlePositions.test.js`

**Interfaces:**
- Consumes: `getBeatState`'s return shape from Task 4 (`{ beat, localProgress }`) — this task's `interpolateParticle` takes that exact shape as its second argument.
- Produces: `generateParticleSet(count: number, seed?: number) => Array<{ chaos: {x,y,z}, pipeline: {x,y,z}, lane: number }>`, `lerp(a, b, t) => number`, `interpolateParticle(particle, beatState) => {x,y,z}`. Consumed by `ParticleField` (Task 6).

- [ ] **Step 1: Write the failing test `lib/particlePositions.test.js`**

```js
import { describe, it, expect } from 'vitest';
import { generateParticleSet, interpolateParticle, lerp } from './particlePositions';

describe('lerp', () => {
  it('returns a at t=0', () => {
    expect(lerp(0, 10, 0)).toBe(0);
  });
  it('returns b at t=1', () => {
    expect(lerp(0, 10, 1)).toBe(10);
  });
  it('returns the midpoint at t=0.5', () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });
});

describe('generateParticleSet', () => {
  it('generates the requested count', () => {
    expect(generateParticleSet(50).length).toBe(50);
  });

  it('is deterministic for the same seed', () => {
    const a = generateParticleSet(20, 7);
    const b = generateParticleSet(20, 7);
    expect(a).toEqual(b);
  });

  it('produces different chaos positions for different particles', () => {
    const set = generateParticleSet(20, 1);
    expect(set[0].chaos).not.toEqual(set[1].chaos);
  });
});

describe('interpolateParticle', () => {
  const set = generateParticleSet(10, 3);

  it('matches the chaos position at the chaos beat', () => {
    const result = interpolateParticle(set[0], { beat: 'chaos', localProgress: 0.5 });
    expect(result).toEqual(set[0].chaos);
  });

  it('matches the pipeline position at the resolve beat', () => {
    const result = interpolateParticle(set[0], { beat: 'resolve', localProgress: 1 });
    expect(result).toEqual(set[0].pipeline);
  });

  it('lands strictly between chaos and pipeline mid-connecting beat', () => {
    const result = interpolateParticle(set[0], { beat: 'connecting', localProgress: 0.5 });
    const lo = Math.min(set[0].chaos.y, set[0].pipeline.y);
    const hi = Math.max(set[0].chaos.y, set[0].pipeline.y);
    expect(result.y).toBeGreaterThanOrEqual(lo - 0.001);
    expect(result.y).toBeLessThanOrEqual(hi + 0.001);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npx vitest run lib/particlePositions.test.js
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write `lib/particlePositions.js`**

```js
// Deterministic pseudo-random generator so particle layouts are
// reproducible across renders and in tests.
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const LANES = 3;

export function generateParticleSet(count, seed = 1) {
  const rand = seededRandom(seed);
  const particles = [];

  for (let i = 0; i < count; i++) {
    const chaos = {
      x: (rand() - 0.5) * 10,
      y: (rand() - 0.5) * 6,
      z: (rand() - 0.5) * 4,
    };

    const lane = i % LANES;
    const laneY = (lane - (LANES - 1) / 2) * 1.5;
    const pipeline = {
      x: -5 + rand() * 10,
      y: laneY,
      z: 0,
    };

    particles.push({ chaos, pipeline, lane });
  }

  return particles;
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function interpolateParticle(particle, beatState) {
  const { beat, localProgress } = beatState;

  if (beat === 'chaos') return { ...particle.chaos };
  if (beat === 'resolve') return { ...particle.pipeline };

  // 'connecting' eases the first 60% of the journey toward the pipeline
  // lane; 'pipeline' covers the remaining 40%, so the transition feels
  // continuous across both beats rather than snapping at the boundary.
  const t = beat === 'connecting' ? localProgress * 0.6 : 0.6 + localProgress * 0.4;

  return {
    x: lerp(particle.chaos.x, particle.pipeline.x, t),
    y: lerp(particle.chaos.y, particle.pipeline.y, t),
    z: lerp(particle.chaos.z, particle.pipeline.z, t),
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx vitest run lib/particlePositions.test.js
```

Expected: PASS (7 passed).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add particle chaos-to-pipeline interpolation logic"
```

---

## Task 6: ParticleField R3F component

**Files:**
- Create: `components/hero/ParticleField.jsx`
- Test: `e2e/particle-field.spec.js`

**Interfaces:**
- Consumes: `generateParticleSet`, `interpolateParticle` from Task 5; `getBeatState` from Task 4. Also consumes a `progress` prop shaped as a React ref object (`{ current: number }`, range 0–1) rather than a plain number — this lets the per-frame Three.js update read the latest scroll value without triggering a React re-render every frame, which matters once Task 8 drives it from a GSAP ScrollTrigger `onUpdate` firing on every scroll tick.
- Produces: a `<ParticleField progress={progressRef} isMobile={boolean} />` component that renders a `THREE.Points` cloud inside an R3F `<Canvas>`. Consumed by `HeroScene` (Task 8).

This component can't be exercised standalone yet (it needs a `<Canvas>` parent), so this task builds a minimal test harness page to verify it renders without errors, then Task 8 replaces that harness with the real hero wiring.

- [ ] **Step 1: Write `components/hero/ParticleField.jsx`**

```jsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { generateParticleSet, interpolateParticle } from '@/lib/particlePositions';
import { getBeatState } from '@/lib/scrollProgress';

const PARTICLE_COUNT_DESKTOP = 400;
const PARTICLE_COUNT_MOBILE = 150;

export default function ParticleField({ progress, isMobile = false }) {
  const pointsRef = useRef();
  const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
  const particles = useMemo(() => generateParticleSet(count, 42), [count]);
  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame(() => {
    const beatState = getBeatState(progress.current);
    for (let i = 0; i < particles.length; i++) {
      const pos = interpolateParticle(particles[i], beatState);
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;
    }
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4FADB0"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}
```

- [ ] **Step 2: Create a temporary test harness route `app/dev-particle-test/page.jsx`**

```jsx
'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleField from '@/components/hero/ParticleField';

export default function ParticleTestPage() {
  const progress = useRef(0.5);
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0f0e14' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ParticleField progress={progress} />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 3: Write the Playwright test `e2e/particle-field.spec.js`**

```js
import { test, expect } from '@playwright/test';

test('particle field renders a canvas with no console errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/dev-particle-test');
  await page.waitForTimeout(500);

  await expect(page.locator('canvas')).toBeVisible();
  expect(errors).toEqual([]);
});
```

- [ ] **Step 4: Run the test**

```bash
npx playwright test e2e/particle-field.spec.js
```

Expected: PASS. If it fails with a `@react-three/drei` or `three` resolution error, re-run `npm install` — it likely means Task 1's dependency versions need npm's auto-resolved patch bump, which is expected and fine.

- [ ] **Step 5: Delete the temporary test harness route**

```bash
rm -rf app/dev-particle-test
```

(The route was only needed to exercise `ParticleField` in isolation before `HeroScene` exists in Task 8. Its Playwright test is deleted too, since Task 8 adds an equivalent real-page test.)

```bash
rm e2e/particle-field.spec.js
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add ParticleField R3F component"
```

---

## Task 7: Hero headline overlay (`HeroContent`)

**Files:**
- Create: `components/hero/HeroContent.jsx`
- Test: covered by Task 8's `e2e/hero.spec.js` (this component has no meaningful behavior to test standalone — it's a pure render of a progress number into an opacity style, verified once wired into the real hero)

**Interfaces:**
- Consumes: a `progress` prop as a plain number (0–1) — unlike `ParticleField`, this drives a React re-render each update since it's a lightweight DOM update, not a per-frame 3D one.
- Produces: `<HeroContent progress={number} />`, rendering the resolved headline with opacity that ramps in only during the final 15% of scroll (the "resolve" beat). Consumed by `HeroScene` (Task 8).

- [ ] **Step 1: Write `components/hero/HeroContent.jsx`**

```jsx
'use client';

export default function HeroContent({ progress }) {
  const opacity = Math.max(0, Math.min(1, (progress - 0.85) / 0.15));

  return (
    <div className="hero-content" style={{ opacity }}>
      <p className="hero-headline">
        A decade inside other people&rsquo;s systems.
        <br />
        <em>Now building his own.</em>
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "Add hero headline overlay component"
```

(Verified end-to-end in Task 8, where it's wired into the real hero and scroll-tested.)

---

## Task 8: HeroScene — Canvas + ScrollTrigger pin/scrub, wired into the page

**Files:**
- Create: `components/HeroScene.jsx`
- Modify: `app/page.jsx` (render `HeroScene`, dynamically imported)
- Modify: `app/globals.css` (add `.hero-scene`, `.hero-placeholder`, `.hero-content`, `.hero-headline` rules)
- Test: `e2e/hero.spec.js`

**Interfaces:**
- Consumes: `ParticleField` (Task 6), `HeroContent` (Task 7). Registers `ScrollTrigger` (already registered by `LenisProvider` in Task 3, but registering again here is a documented safe no-op — GSAP dedupes plugin registration).
- Produces: the pinned, scroll-scrubbed hero section. `app/page.jsx` now renders real content instead of "Scaffold OK".

- [ ] **Step 1: Write `components/HeroScene.jsx`**

```jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleField from './hero/ParticleField';
import HeroContent from './hero/HeroContent';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        setDisplayProgress(self.progress);
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="hero-scene" aria-label="Intro animation">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ParticleField progress={progressRef} isMobile={isMobile} />
      </Canvas>
      <HeroContent progress={displayProgress} />
    </section>
  );
}
```

- [ ] **Step 2: Add hero styles to `app/globals.css`**

```css
.hero-scene {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: var(--bg);
}

.hero-scene canvas {
  position: absolute;
  inset: 0;
}

.hero-placeholder {
  height: 100vh;
  width: 100%;
  background: var(--bg);
}

.hero-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.hero-headline {
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  line-height: 1.25;
  text-align: center;
  color: var(--text);
  max-width: 20ch;
  padding: 0 1.5rem;
}
```

- [ ] **Step 3: Update `app/page.jsx`** to render `HeroScene` via dynamic import (WebGL needs `window`, so it must be client-only and excluded from SSR)

```jsx
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/HeroScene'), {
  ssr: false,
  loading: () => <div className="hero-placeholder" aria-hidden="true" />,
});

export default function Home() {
  return (
    <main>
      <HeroScene />
    </main>
  );
}
```

- [ ] **Step 4: Write the Playwright test `e2e/hero.spec.js`**

```js
import { test, expect } from '@playwright/test';

test('hero pins and the particle scene renders across the scroll sequence', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/');
  await expect(page.locator('.hero-scene canvas')).toBeVisible();

  // Scroll partway into the pinned range and confirm the section is still pinned.
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(300);
  const heroBox = await page.locator('.hero-scene').boundingBox();
  expect(heroBox.y).toBeCloseTo(0, 0);

  // Scroll through the full pinned range; headline should end visible.
  await page.mouse.wheel(0, 4000);
  await page.waitForTimeout(500);
  const opacity = await page
    .locator('.hero-content')
    .evaluate((el) => parseFloat(getComputedStyle(el).opacity));
  expect(opacity).toBeGreaterThan(0.5);

  expect(errors).toEqual([]);
});
```

- [ ] **Step 5: Run the test**

```bash
npx playwright test e2e/hero.spec.js
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Wire HeroScene into the page with scroll-driven pin"
```

---

## Task 9: Reduced-motion fallback

**Files:**
- Create: `components/hero/StaticHeroFallback.jsx`
- Create: `components/Hero.jsx` (motion-preference switch, replaces direct `HeroScene` usage in `page.jsx`)
- Create: `public/hero-pipeline-resolved.svg`
- Modify: `app/page.jsx` (use `Hero` instead of `HeroScene` directly)
- Modify: `app/globals.css` (add `.hero-static`, `.hero-static-image`)
- Test: `e2e/hero-reduced-motion.spec.js`

**Interfaces:**
- Consumes: `HeroScene` (Task 8), `HeroContent` (Task 7, reused at full opacity for the static case).
- Produces: `<Hero />`, the component `app/page.jsx` renders going forward — it decides between the WebGL scene and the static fallback based on `prefers-reduced-motion`.

- [ ] **Step 1: Create the static fallback image `public/hero-pipeline-resolved.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <rect width="800" height="400" fill="#0f0e14" />
  <line x1="80" y1="140" x2="720" y2="140" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
  <line x1="80" y1="200" x2="720" y2="200" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
  <line x1="80" y1="260" x2="720" y2="260" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
  <g filter="url(#glow)">
    <circle cx="180" cy="140" r="4" fill="#4fadb0" />
    <circle cx="340" cy="140" r="4" fill="#4fadb0" />
    <circle cx="500" cy="140" r="4" fill="#4fadb0" />
    <circle cx="240" cy="200" r="4" fill="#c98ba3" />
    <circle cx="420" cy="200" r="4" fill="#c98ba3" />
    <circle cx="600" cy="200" r="4" fill="#c98ba3" />
    <circle cx="200" cy="260" r="4" fill="#4fadb0" />
    <circle cx="380" cy="260" r="4" fill="#4fadb0" />
    <circle cx="560" cy="260" r="4" fill="#4fadb0" />
  </g>
</svg>
```

- [ ] **Step 2: Write `components/hero/StaticHeroFallback.jsx`**

```jsx
import HeroContent from './HeroContent';

export default function StaticHeroFallback() {
  return (
    <section className="hero-scene hero-static" aria-label="Intro">
      <img
        src="/hero-pipeline-resolved.svg"
        alt=""
        aria-hidden="true"
        className="hero-static-image"
      />
      <HeroContent progress={1} />
    </section>
  );
}
```

- [ ] **Step 3: Add the fallback styles to `app/globals.css`**

```css
.hero-static-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

- [ ] **Step 4: Write `components/Hero.jsx`**

```jsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import StaticHeroFallback from './hero/StaticHeroFallback';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <div className="hero-placeholder" aria-hidden="true" />,
});

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reducedMotion === null) {
    return <div className="hero-placeholder" aria-hidden="true" />;
  }

  return reducedMotion ? <StaticHeroFallback /> : <HeroScene />;
}
```

- [ ] **Step 5: Update `app/page.jsx`** to use `Hero` instead of importing `HeroScene` directly

```jsx
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 6: Write the Playwright test `e2e/hero-reduced-motion.spec.js`**

```js
import { test, expect } from '@playwright/test';

test('shows the static fallback when reduced motion is preferred', async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');

  await expect(page.locator('.hero-static')).toBeVisible();
  await expect(page.locator('.hero-scene canvas')).toHaveCount(0);

  await context.close();
});

test('shows the WebGL scene when motion is not reduced', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-scene canvas')).toBeVisible();
  await expect(page.locator('.hero-static')).toHaveCount(0);
});
```

- [ ] **Step 7: Run the tests**

```bash
npx playwright test e2e/hero-reduced-motion.spec.js
```

Expected: PASS (2 passed).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Add reduced-motion static fallback for the hero"
```

---

## Task 10: Shared ScrollReveal + About section

**Files:**
- Create: `components/ScrollReveal.jsx`
- Create: `components/sections/About.jsx`
- Create: `public/headshot.png` (moved from `assets/headshot.png`)
- Modify: `app/page.jsx` (render `About` after `Hero`)
- Modify: `app/globals.css` (add `.about-grid`, `.about-photo`, `.about-copy`, `.about-stats`, `.stat`, `.stat-num`, `.stat-label`)
- Test: `e2e/about.spec.js`

**Interfaces:**
- Consumes: nothing new
- Produces: `<ScrollReveal className?>` — a reusable fade+rise-on-scroll wrapper. Consumed by every remaining section (Tasks 11–13).

- [ ] **Step 1: Move the headshot asset**

```bash
git mv assets/headshot.png public/headshot.png
```

- [ ] **Step 2: Write `components/ScrollReveal.jsx`**

```jsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Write `components/sections/About.jsx`**

```jsx
import ScrollReveal from '@/components/ScrollReveal';

export default function About() {
  return (
    <section id="about" className="section-pad">
      <ScrollReveal className="about-grid">
        <img src="/headshot.png" alt="Ramon Ombid" className="about-photo" />
        <div className="about-copy">
          <p className="eyebrow">ABOUT</p>
          <h2>
            A decade inside other people&rsquo;s systems.
            <br />
            <em>Now building his own.</em>
          </h2>
          <p>
            I spent more than a decade in operations across different
            industries learning firsthand how good businesses lose money to
            small, repeatable gaps. The forgotten follow-up. The lead nobody
            logged. The no-show nobody chased.
          </p>
          <p>
            So I don&rsquo;t think like a &ldquo;tech guy.&rdquo; I think
            like an operator who happens to build in GoHighLevel. I care less
            about features and more about whether the system matches how the
            day actually runs.
          </p>
          <div className="about-stats">
            <div className="stat">
              <p className="stat-num">10+ years</p>
              <p className="stat-label">IN OPERATIONS &amp; SYSTEMS</p>
            </div>
            <div className="stat">
              <p className="stat-num">GHL Certified</p>
              <p className="stat-label">SPECIALIST</p>
            </div>
            <div className="stat">
              <p className="stat-num">5+ industries</p>
              <p className="stat-label">WORKED ACROSS</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 4: Add About styles to `app/globals.css`**

```css
.about-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
}

.about-photo {
  border-radius: 16px;
  width: 100%;
}

.about-copy p {
  margin-top: 1.1rem;
  color: var(--text-muted);
  max-width: 60ch;
}

.about-stats {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-num {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--text);
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

@media (max-width: 780px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Update `app/page.jsx`**

```jsx
import Hero from '@/components/Hero';
import About from '@/components/sections/About';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  );
}
```

- [ ] **Step 6: Write the Playwright test `e2e/about.spec.js`**

```js
import { test, expect } from '@playwright/test';

test('About section renders content and reveals on scroll', async ({ page }) => {
  await page.goto('/');
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  await expect(page.locator('#about h2')).toContainText(
    "A decade inside other people's systems"
  );
  const opacity = await page
    .locator('#about .about-grid')
    .evaluate((el) => parseFloat(getComputedStyle(el).opacity));
  expect(opacity).toBeGreaterThan(0.9);
});
```

- [ ] **Step 7: Run the test**

```bash
npx playwright test e2e/about.spec.js
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Add ScrollReveal utility and About section"
```

---

## Task 11: What I Build section

**Files:**
- Create: `components/sections/WhatIBuild.jsx`
- Modify: `app/page.jsx` (render after `About`)
- Modify: `app/globals.css` (add `.capability-grid`, `.capability-card`, `.capability-label`)
- Test: `e2e/what-i-build.spec.js`

**Interfaces:**
- Consumes: `ScrollReveal` (Task 10)
- Produces: nothing consumed by later tasks — this section is a leaf.

- [ ] **Step 1: Write `components/sections/WhatIBuild.jsx`**

```jsx
import ScrollReveal from '@/components/ScrollReveal';

const CAPABILITIES = [
  {
    label: 'LEAD CAPTURE',
    title: 'Systems that never lose a lead',
    body: 'Every call, form, and DM lands in one place and gets an instant first response, even when nobody is watching.',
  },
  {
    label: 'AUTOMATION',
    title: 'Follow-up that runs itself',
    body: 'New leads get nurtured automatically until they book or buy, in messages that sound like a person, not a robot.',
  },
  {
    label: 'BOOKING',
    title: 'Calendars that fill themselves',
    body: 'Prospects book in, get reminders, and show up — the system confirms and recovers no-shows on its own.',
  },
  {
    label: 'REACTIVATION',
    title: 'Old databases, woken back up',
    body: 'Past leads who went quiet become booked appointments again, often within the first week of a campaign.',
  },
];

export default function WhatIBuild() {
  return (
    <section id="what-i-build" className="section-pad">
      <ScrollReveal>
        <p className="eyebrow">WHAT I BUILD</p>
        <h2>Systems, not just software.</h2>
      </ScrollReveal>
      <div className="capability-grid">
        {CAPABILITIES.map((c) => (
          <ScrollReveal key={c.label} className="capability-card">
            <p className="capability-label">{c.label}</p>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add styles to `app/globals.css`**

```css
.capability-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.capability-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.75rem 1.5rem;
}

.capability-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.05em;
  color: var(--teal);
  margin-bottom: 0.6rem;
}

.capability-card h3 {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 1.05rem;
  margin-bottom: 0.6rem;
}

.capability-card p:last-child {
  color: var(--text-muted);
  font-size: 0.92rem;
}

@media (max-width: 900px) {
  .capability-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .capability-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Update `app/page.jsx`**

```jsx
import Hero from '@/components/Hero';
import About from '@/components/sections/About';
import WhatIBuild from '@/components/sections/WhatIBuild';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WhatIBuild />
    </main>
  );
}
```

- [ ] **Step 4: Write the Playwright test `e2e/what-i-build.spec.js`**

```js
import { test, expect } from '@playwright/test';

test('What I Build section shows all four capability cards', async ({ page }) => {
  await page.goto('/');
  await page.locator('#what-i-build').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const cards = page.locator('#what-i-build .capability-card');
  await expect(cards).toHaveCount(4);
  await expect(cards.nth(0)).toContainText('LEAD CAPTURE');
  await expect(cards.nth(3)).toContainText('REACTIVATION');
});
```

- [ ] **Step 5: Run the test**

```bash
npx playwright test e2e/what-i-build.spec.js
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add What I Build capability section"
```

---

## Task 12: Selected Work section

**Files:**
- Create: `components/sections/Work.jsx`
- Create: `public/result-ele-insurance.png`, `public/result-tinkertribe.png`, `public/result-dental.png` (moved from `assets/`)
- Modify: `app/page.jsx` (render after `WhatIBuild`)
- Modify: `app/globals.css` (add `.work-grid`, `.work-card`, `.work-client`, `.work-image`, `.work-meta`, `.work-result`)
- Test: `e2e/work.spec.js`

**Interfaces:**
- Consumes: `ScrollReveal` (Task 10)
- Produces: nothing consumed by later tasks — leaf section.

- [ ] **Step 1: Move the case-study images**

```bash
git mv assets/result-ele-insurance.png public/result-ele-insurance.png
git mv assets/result-tinkertribe.png public/result-tinkertribe.png
git mv assets/result-dental.png public/result-dental.png
```

- [ ] **Step 2: Write `components/sections/Work.jsx`**

```jsx
import ScrollReveal from '@/components/ScrollReveal';

const CASE_STUDIES = [
  {
    client: 'NON-LIFE INSURANCE AGENT — ELE INSURANCE (PH)',
    image: '/result-ele-insurance.png',
    before: 'Leads came from everywhere, tracked nowhere. Cold leads piled up.',
    built: 'Full lead pipeline with stage-based automation and instant follow-up.',
    result: 'Zero Lead Loss System',
    resultDetail: 'cold leads — every inquiry followed up in minutes',
  },
  {
    client: 'COMPLETE GHL ECOSYSTEM — TINKERTRIBE (PH)',
    image: '/result-tinkertribe.png',
    before: 'New operation, no CRM, everything manual.',
    built: 'Capture, pipeline, automation, calendar & reporting — the full stack.',
    result: 'Zero → Full',
    resultDetail: 'from manual to fully automated',
  },
  {
    client: 'PATIENT MANAGEMENT SYSTEM — 29:11 DENTAL CLINIC (PH)',
    image: '/result-dental.png',
    before: 'Patient inquiries, appointments, and follow-ups were handled manually.',
    built: 'Automated CRM with booking, reminders, treatment tracking, and recalls.',
    result: 'First Inquiry → Lifelong Care',
    resultDetail: 'one connected patient journey',
  },
];

export default function Work() {
  return (
    <section id="work" className="section-pad">
      <ScrollReveal>
        <p className="eyebrow">SELECTED WORK</p>
        <h2>Systems I&rsquo;ve built.</h2>
      </ScrollReveal>
      <div className="work-grid">
        {CASE_STUDIES.map((cs) => (
          <ScrollReveal key={cs.client} className="work-card">
            <p className="work-client">{cs.client}</p>
            <img src={cs.image} alt={cs.client} className="work-image" />
            <p className="work-meta">
              <span>BEFORE</span> {cs.before}
            </p>
            <p className="work-meta">
              <span>BUILT</span> {cs.built}
            </p>
            <p className="work-result">
              <em>{cs.result}</em> <span>{cs.resultDetail}</span>
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add styles to `app/globals.css`**

```css
.work-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.work-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
}

.work-client {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--teal);
  line-height: 1.4;
  margin-bottom: 1rem;
}

.work-image {
  border-radius: 10px;
  border: 1px solid var(--border);
  margin-bottom: 1rem;
  max-height: 220px;
  object-fit: cover;
  width: 100%;
}

.work-meta {
  font-size: 0.86rem;
  color: var(--text-muted);
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.work-meta span {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text);
  flex-shrink: 0;
  padding-top: 0.15rem;
}

.work-result {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.work-result span {
  font-size: 0.82rem;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .work-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Update `app/page.jsx`**

```jsx
import Hero from '@/components/Hero';
import About from '@/components/sections/About';
import WhatIBuild from '@/components/sections/WhatIBuild';
import Work from '@/components/sections/Work';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WhatIBuild />
      <Work />
    </main>
  );
}
```

- [ ] **Step 5: Write the Playwright test `e2e/work.spec.js`**

```js
import { test, expect } from '@playwright/test';

test('Selected Work section shows exactly the 3 verified case studies', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('#work').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const cards = page.locator('#work .work-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.nth(0)).toContainText('ELE INSURANCE');
  await expect(cards.nth(1)).toContainText('TINKERTRIBE');
  await expect(cards.nth(2)).toContainText('29:11 DENTAL CLINIC');

  for (const img of await page.locator('#work .work-image').all()) {
    await expect(img).toBeVisible();
  }
});
```

- [ ] **Step 6: Run the test**

```bash
npx playwright test e2e/work.spec.js
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add Selected Work section with verified case studies"
```

---

## Task 13: Contact section

**Files:**
- Create: `components/sections/Contact.jsx`
- Modify: `app/page.jsx` (render after `Work`)
- Modify: `app/globals.css` (add `.contact-inner`)
- Test: `e2e/contact.spec.js`

**Interfaces:**
- Consumes: `ScrollReveal` (Task 10)
- Produces: nothing — final section.

- [ ] **Step 1: Write `components/sections/Contact.jsx`**

```jsx
import ScrollReveal from '@/components/ScrollReveal';

// Placeholder address carried over from the previous site (see spec's
// "Open item"). Replace with a real contact address before this ships.
const CONTACT_EMAIL = 'you@example.com';

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <ScrollReveal className="contact-inner">
        <p className="eyebrow">GET IN TOUCH</p>
        <h2>
          Let&rsquo;s build something that
          <br />
          <em>actually runs itself.</em>
        </h2>
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-solid">
          Email me
        </a>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 2: Add styles to `app/globals.css`**

```css
.contact-inner {
  text-align: center;
  padding-block: clamp(2rem, 6vw, 4rem);
}

.contact-inner h2 {
  margin-block: 1rem 1.75rem;
  font-size: clamp(1.8rem, 3.6vw, 2.6rem);
}
```

- [ ] **Step 3: Update `app/page.jsx`**

```jsx
import Hero from '@/components/Hero';
import About from '@/components/sections/About';
import WhatIBuild from '@/components/sections/WhatIBuild';
import Work from '@/components/sections/Work';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WhatIBuild />
      <Work />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 4: Write the Playwright test `e2e/contact.spec.js`**

```js
import { test, expect } from '@playwright/test';

test('Contact section renders a working mailto link', async ({ page }) => {
  await page.goto('/');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const link = page.locator('#contact a.btn-solid');
  await expect(link).toHaveText('Email me');
  await expect(link).toHaveAttribute('href', 'mailto:you@example.com');
});
```

- [ ] **Step 5: Run the test**

```bash
npx playwright test e2e/contact.spec.js
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add Contact section"
```

---

## Task 14: Full-page QA pass

**Files:**
- Create: `e2e/full-page.spec.js`
- Test: itself

**Interfaces:**
- Consumes: the fully assembled page from Tasks 1–13.
- Produces: a pass/fail signal covering desktop, mobile, and reduced-motion in one sweep, plus a manual Lighthouse check recorded in this task's notes.

- [ ] **Step 1: Write `e2e/full-page.spec.js`**

```js
import { test, expect, devices } from '@playwright/test';

test.describe('desktop', () => {
  test('full page scrolls through all sections with no console errors', async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    for (const id of ['#about', '#what-i-build', '#work', '#contact']) {
      await page.locator(id).scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }

    expect(errors).toEqual([]);
  });
});

test.describe('mobile', () => {
  test.use({ ...devices['iPhone 13'] });

  test('full page renders on a mobile viewport with no console errors', async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    for (const id of ['#about', '#what-i-build', '#work', '#contact']) {
      await page.locator(id).scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }

    expect(errors).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the full suite**

```bash
npm run test
npx playwright test
```

Expected: all Vitest and Playwright tests pass.

- [ ] **Step 3: Run a manual Lighthouse check and record the result**

```bash
npm run build
npm run start &
sleep 3
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"
kill %1
```

Read `lighthouse-report.json`'s `categories.performance.score`. This is a
heavy WebGL hero on a showcase site, so there is no pass/fail gate here —
record the score in the commit message in Step 4 so it's visible in history,
and flag it to Ramon if it's below roughly 0.5 (a much lower bar than the
static site, intentionally, per the spec's explicit priority on visual craft
over load speed).

- [ ] **Step 4: Commit**

```bash
rm lighthouse-report.json
git add -A
git commit -m "Add full-page QA test covering desktop, mobile, and console errors"
```

---

## Task 15: Deploy

**Files:** none (deployment/verification only)

**Interfaces:**
- Consumes: the completed app from Tasks 1–14.
- Produces: a live deployment at the existing Vercel project URL.

- [ ] **Step 1: Push to GitHub**

```bash
git push origin main
```

Expected: the existing GitHub→Vercel integration (set up previously) triggers an automatic production deploy.

- [ ] **Step 2: Verify the deploy on Vercel**

```bash
vercel ls
```

Find the newest deployment for `basic-website`, confirm its state is `Ready`, and confirm the framework Vercel detected is `Next.js` (not a stale "Other" preset from the previous static-site deploy).

- [ ] **Step 3: Smoke-test the live URL**

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://basic-website-amber.vercel.app
```

Expected: `200`.

- [ ] **Step 4: Visually confirm in a real browser**

Open `https://basic-website-amber.vercel.app`, scroll through the hero
sequence, and confirm the particle animation, headline resolve, and all four
sections below render as designed.

---

## Post-plan note (not a task)

The Contact section ships with the same placeholder email
(`you@example.com`) the previous site had — this was an explicit "Open
item" in the approved spec, not something for the implementer to resolve.
Before this goes live as an actual portfolio link Ramon shares, replace
`CONTACT_EMAIL` in `components/sections/Contact.jsx` with a real address.
