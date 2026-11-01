import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Bot, Cloud, Code2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionLabel } from './fx/effects';

type CardKey = 'ai' | 'cloud' | 'dev';

/** Vertical scroll px per horizontal px. >1 makes the sideways travel calmer. */
const RUNWAY = 1.8;

const CARDS: { key: CardKey; Icon: typeof Bot; accent: string; glow: string; stroke: string }[] = [
  { key: 'ai', Icon: Bot, accent: 'text-cyan-400', glow: 'from-cyan-500/30', stroke: 'rgba(13,214,232,0.22)' },
  { key: 'cloud', Icon: Cloud, accent: 'text-blue-400', glow: 'from-blue-500/30', stroke: 'rgba(96,165,250,0.22)' },
  { key: 'dev', Icon: Code2, accent: 'text-violet-400', glow: 'from-violet-500/30', stroke: 'rgba(167,139,250,0.22)' },
];

const Panel: React.FC<{
  index: number;
  total: number;
  progress: MotionValue<number>;
  card: (typeof CARDS)[number];
}> = ({ index, total, progress, card }) => {
  const { t } = useLanguage();
  const data = t.expertise.cards[card.key];
  // Each panel's number drifts against the scroll for parallax depth
  const seg = 1 / total;
  const numX = useTransform(progress, [seg * index - seg, seg * index + seg], ['30%', '-30%']);
  const rotate = useTransform(progress, [seg * index - seg, seg * index, seg * index + seg], [4, 0, -4]);

  return (
    <motion.article
      style={{ rotate }}
      className="group relative shrink-0 w-[84vw] md:w-[58vw] lg:w-[46vw] h-[66vh] md:h-[70vh] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.01] backdrop-blur-xl overflow-hidden p-7 md:p-12 flex flex-col"
    >
      <div className={`absolute -top-1/3 -right-1/4 w-[80%] h-[80%] rounded-full bg-gradient-to-br ${card.glow} to-transparent blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700`} />

      <motion.span
        style={{ x: numX, WebkitTextStroke: `2px ${card.stroke}` }}
        className="absolute -bottom-[6vh] right-0 font-sans font-extrabold text-transparent leading-none text-[38vw] md:text-[22vw] select-none pointer-events-none"
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <div className="relative z-10 flex items-start justify-between">
        <div className={`grid place-items-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 ${card.accent}`}>
          <card.Icon size={30} />
        </div>
        <ArrowUpRight className={`${card.accent} opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500`} size={32} />
      </div>

      <h3 className="relative z-10 mt-auto md:mt-14 text-3xl md:text-5xl font-bold text-white leading-tight max-w-[14ch]">{data.title}</h3>

      <ul className="relative z-10 mt-6 md:mt-10 space-y-3 md:space-y-4 max-w-md">
        {data.items.map((txt, i) => (
          <li key={i} className="flex items-baseline gap-4 text-slate-300 text-base md:text-lg border-b border-white/5 pb-3">
            <span className={`font-tech text-xs ${card.accent}`}>{`0${i + 1}`}</span>
            {txt}
          </li>
        ))}
      </ul>

      <p className={`relative z-10 mt-6 md:mt-auto font-tech text-xs tracking-[0.3em] uppercase ${card.accent}`}>{data.focus}</p>
    </motion.article>
  );
};

export const Expertise: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const barScale = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="relative w-full"
      // Vertical runway for the horizontal travel
      style={{ height: `calc(100vh + ${Math.round(distance * RUNWAY)}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-8 md:gap-12 pl-6 md:pl-12 pr-[10vw] will-change-transform">
          {/* Intro panel */}
          <div className="shrink-0 w-[84vw] md:w-[38vw] pr-4">
            <SectionLabel index="01" label={t.sections.expertise} className="mb-8" />
            <h2 className="font-sans font-extrabold uppercase text-white leading-[0.9] tracking-tight text-[13vw] md:text-[6.5vw]">
              {t.expertise.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400">
                {t.expertise.titleHighlight}
              </span>
            </h2>
            <p className="mt-8 text-slate-400 text-lg max-w-md">{t.expertise.description}</p>
          </div>

          {CARDS.map((card, i) => (
            <Panel key={card.key} index={i} total={CARDS.length} progress={smooth} card={card} />
          ))}
        </motion.div>

        {/* Progress rail */}
        <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 h-px bg-white/10">
          <motion.div style={{ scaleX: barScale }} className="h-full origin-left bg-cyan-400" />
        </div>
      </div>
    </section>
  );
};
