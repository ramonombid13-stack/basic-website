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
