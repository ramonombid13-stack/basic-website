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
