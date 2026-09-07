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
