import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Linkedin, Github, ArrowRight, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useIntro } from '../context/IntroContext';
import { ScrambleText, SplitLetters, Magnetic } from './fx/effects';

const useLocalTime = () => {
  const fmt = () =>
    new Intl.DateTimeFormat('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Mexico_City',
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { introDone } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const time = useLocalTime();

  const phrases = t.hero.phrases;

  useEffect(() => setPhraseIdx(0), [phrases]);
  useEffect(() => {
    if (!introDone) return;
    const id = setInterval(() => setPhraseIdx((i) => (i + 1) % phrases.length), 4200);
    return () => clearInterval(id);
  }, [introDone, phrases]);

  // Scroll-out choreography: the two name lines tear apart, everything blurs away
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const xLeft = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const xRight = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.7], ['blur(0px)', 'blur(12px)']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const hudOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  });

  return (
    <section ref={ref} id="top" className="relative w-full min-h-[100svh] flex flex-col justify-center px-5 md:px-12 pt-28 pb-24 overflow-hidden">
      <motion.div style={{ opacity, filter: blur, scale }} className="relative z-10 w-full max-w-[1500px] mx-auto">
        {/* Badge */}
        <motion.div {...appear(0.1)} className="mb-6 md:mb-10 font-tech text-[11px] md:text-sm tracking-[0.18em] md:tracking-[0.35em] text-cyan-400 uppercase flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <ScrambleText text={`[ ${t.hero.badge} ]`} start={introDone} />
        </motion.div>

        {/* Giant name */}
        <h1 className="font-sans font-extrabold uppercase leading-[0.82] tracking-[-0.04em] select-none">
          <motion.span style={{ x: xLeft }} className="block text-white text-[16vw] md:text-[11.5vw]">
            <SplitLetters text="Manuel" show={introDone} delay={0.15} />
          </motion.span>
          <motion.span style={{ x: xRight }} className="block text-[11.6vw] md:text-[11.5vw] md:text-right">
            <SplitLetters
              text="Castellanos"
              show={introDone}
              delay={0.35}
              letterClassName="text-transparent [-webkit-text-stroke:1.5px_rgba(13,214,232,0.9)] md:[-webkit-text-stroke:2px_rgba(13,214,232,0.9)]"
            />
          </motion.span>
        </h1>

        {/* Decoding phrase */}
        <motion.div {...appear(1.0)} className="mt-8 md:mt-12 grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
          <p className="text-xl md:text-3xl text-slate-200 font-light leading-snug [text-shadow:0_2px_24px_rgba(0,12,26,0.95)] max-w-3xl min-h-[3.4em] md:min-h-[2.6em]">
            <span className="text-cyan-400 font-tech mr-3">&gt;</span>
            <ScrambleText text={phrases[phraseIdx]} start={introDone} speed={1.4} />
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="https://wa.me/5215569111742"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-3 pl-7 pr-3 py-3 rounded-full font-bold text-base md:text-lg overflow-hidden bg-cyan-400 text-navy-950 shadow-[0_0_40px_rgba(13,214,232,0.45)]"
              >
                <span className="absolute inset-0 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10">{t.hero.ctaPrimary}</span>
                <span className="relative z-10 grid place-items-center w-10 h-10 rounded-full bg-navy-950 text-cyan-400 group-hover:rotate-[-45deg] transition-transform duration-500">
                  <ArrowRight size={18} />
                </span>
              </a>
            </Magnetic>
            {[
              { href: 'https://linkedin.com/in/manuelceomx', Icon: Linkedin, label: 'LinkedIn' },
              { href: 'https://github.com/ideaspuff', Icon: Github, label: 'GitHub' },
              { href: 'https://youtube.com/c/manuelceo', Icon: Youtube, label: 'YouTube' },
            ].map(({ href, Icon, label }) => (
              <Magnetic key={label} strength={0.5}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid place-items-center w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur text-slate-300 hover:text-navy-950 hover:bg-cyan-400 hover:border-cyan-400 transition-colors duration-300"
                >
                  <Icon size={20} />
                </a>
              </Magnetic>
            ))}
          </div>
        </motion.div>

        {/* Chips */}
        <motion.div {...appear(1.2)} className="mt-10 flex flex-wrap gap-3">
          {t.hero.chips.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={introDone ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.3 + i * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
              className="px-4 py-1.5 rounded-full text-xs md:text-sm border border-white/10 bg-white/[0.04] text-slate-300 font-mono backdrop-blur"
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* HUD corners */}
      <motion.div style={{ opacity: hudOpacity }} className="absolute bottom-6 inset-x-5 md:inset-x-12 z-10 flex justify-between items-end font-tech text-[10px] md:text-xs tracking-[0.25em] uppercase text-slate-500">
        <motion.div {...appear(1.5)} className="hidden md:block">
          <p>CDMX · MX</p>
          <p className="text-slate-400">
            {t.hud.localTime} <span className="text-cyan-400 tabular-nums">{time}</span>
          </p>
        </motion.div>
        <motion.a {...appear(1.6)} href="#manifesto" className="flex flex-col items-center gap-3 mx-auto md:mx-0 md:absolute md:left-1/2 md:-translate-x-1/2 text-slate-400 hover:text-cyan-400 transition-colors">
          <span>{t.hud.scroll}</span>
          <span className="relative block w-px h-14 bg-white/10 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-cyan-400 animate-[scrollcue_1.8s_cubic-bezier(0.76,0,0.24,1)_infinite]" />
          </span>
        </motion.a>
        <motion.div {...appear(1.5)} className="hidden md:block text-right">
          <p>N 19.43° / W 99.13°</p>
          <p className="text-slate-400">© {new Date().getFullYear()}</p>
        </motion.div>
      </motion.div>
    </section>
  );
};
