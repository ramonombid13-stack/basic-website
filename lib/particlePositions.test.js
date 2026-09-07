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
