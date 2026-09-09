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
