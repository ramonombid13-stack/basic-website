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
