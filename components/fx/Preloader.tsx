import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useIntro, prefersReducedMotion } from '../../context/IntroContext';
import { useLanguage } from '../../context/LanguageContext';

const DURATION = 2600; // ms for the counter to reach 100

export const Preloader: React.FC = () => {
  const { introDone, finishIntro } = useIntro();
  const { t } = useLanguage();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      finishIntro();
      return;
    }
    document.documentElement.style.overflow = 'hidden';
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-in-out with a little hesitation near the end
      const eased = p < 0.85 ? (p / 0.85) * 0.92 : 0.92 + ((p - 0.85) / 0.15) * 0.08;
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finishIntro, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (introDone) document.documentElement.style.overflow = '';
  }, [introDone]);

  const visibleLines = Math.min(t.intro.lines.length, Math.floor((count / 100) * (t.intro.lines.length + 0.4)));

  return (
    <AnimatePresence>
      {!introDone && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex cursor-pointer"
          onClick={finishIntro}
          exit={{ pointerEvents: 'none' }}
        >
          {/* Two curtains that split apart on exit */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#000a14] border-b border-cyan-400/40"
            exit={{ y: '-100%' }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#000a14] border-t border-cyan-400/40"
            exit={{ y: '100%' }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          />

          <motion.div
            className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-12"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex justify-between font-tech text-xs md:text-sm text-cyan-400/70 tracking-widest">
              <span>MC//SYS</span>
              <span>{t.intro.skip}</span>
            </div>

            <div className="font-tech text-sm md:text-base text-slate-400 space-y-1">
              {t.intro.lines.slice(0, visibleLines).map((line, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  {line}
                  <span className={i === t.intro.lines.length - 1 ? 'text-cyan-400' : 'text-emerald-400'}>
                    {i === t.intro.lines.length - 1 ? ' ✓' : ' … ok'}
                  </span>
                </motion.p>
              ))}
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="h-[2px] flex-1 bg-white/10 mb-4 md:mb-8 overflow-hidden">
                <div className="h-full bg-cyan-400 shadow-[0_0_12px_#0DD6E8]" style={{ width: `${count}%` }} />
              </div>
              <span className="font-sans font-extrabold leading-none text-white tabular-nums text-[22vw] md:text-[14vw] tracking-tighter">
                {String(count).padStart(3, '0')}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
