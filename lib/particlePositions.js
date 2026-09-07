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
