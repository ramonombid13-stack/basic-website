import Hero from '@/components/Hero';
import About from '@/components/sections/About';
import WhatIBuild from '@/components/sections/WhatIBuild';
import Work from '@/components/sections/Work';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WhatIBuild />
      <Work />
    </main>
  );
}
