import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ScrollWords, SectionLabel } from './fx/effects';

export const Manifesto: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  // Words light up one by one while the section travels through the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] });

  return (
    <section ref={ref} id="manifesto" className="relative w-full px-5 md:px-12 py-32 md:py-48">
      <div className="max-w-[1300px] mx-auto">
        <SectionLabel index="00" label={t.sections.manifesto} className="mb-10 md:mb-16" />
        <ScrollWords
          key={t.manifesto}
          text={t.manifesto}
          progress={scrollYProgress}
          className="font-sans font-semibold text-white text-[8.5vw] md:text-[5.2vw] leading-[1.08] tracking-[-0.02em]"
        />
      </div>
    </section>
  );
};
