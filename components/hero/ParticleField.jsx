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
