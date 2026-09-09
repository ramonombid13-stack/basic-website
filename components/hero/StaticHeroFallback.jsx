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
