import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ScrollWords, SectionLabel } from './fx/effects';

export const Manifesto: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  // Words light up one by one while the section travels through the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'end 0.6'] });

  return (
    <section ref={ref} id="manifesto" className="relative w-full px-6 md:px-12 py-40 md:py-64 min-h-[110vh] flex items-center">
      <div className="max-w-[1300px] mx-auto w-full">
        <SectionLabel index="00" label={t.sections.manifesto} className="mb-10 md:mb-16" />
        <ScrollWords
          key={t.manifesto}
          text={t.manifesto}
          progress={scrollYProgress}
          className="font-sans font-semibold text-white text-[9vw] md:text-[5.4vw] leading-[1.1] tracking-[-0.02em]"
        />
      </div>
    </section>
  );
};
