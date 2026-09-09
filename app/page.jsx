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
