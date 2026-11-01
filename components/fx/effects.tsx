import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useVelocity,
  useAnimationFrame,
  MotionValue,
} from 'framer-motion';
import Lenis from 'lenis';
import { prefersReducedMotion } from '../../context/IntroContext';

/* ------------------------------------------------------------------ */
/* Shared reveal trigger                                               */
/* ------------------------------------------------------------------ */
/** Fire reveals slightly BEFORE the element enters the screen (positive bottom margin)
 *  so on phones the animation is already running when the content arrives. */
export const REVEAL_VIEWPORT = { once: true, margin: '0px 0px 18% 0px' } as const;

/** Stagger only where items sit side by side; on a single mobile column it just adds lag. */
export const isNarrow = () => typeof window !== 'undefined' && window.innerWidth < 768;

/* ------------------------------------------------------------------ */
/* Smooth scroll (Lenis)                                               */
/* ------------------------------------------------------------------ */
export const useSmoothScroll = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // Anchor links go through Lenis too
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute('href')!);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: 0 });
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);
};

/* ------------------------------------------------------------------ */
/* Scramble / decode text                                              */
/* ------------------------------------------------------------------ */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEFXYZ';

export const ScrambleText: React.FC<{ text: string; className?: string; speed?: number; start?: boolean }> = ({
  text,
  className,
  speed = 1,
  start = true,
}) => {
  const [out, setOut] = useState(start ? '' : ' ');
  const prev = useRef('');

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setOut(text);
      return;
    }
    const from = prev.current;
    const len = Math.max(from.length, text.length);
    const queue = Array.from({ length: len }, (_, i) => {
      const s = Math.floor(Math.random() * 18);
      return { from: from[i] || '', to: text[i] || '', start: s, end: s + Math.floor(Math.random() * 22) + 8 };
    });
    let frame = 0;
    let raf = 0;
    const step = () => {
      let done = 0;
      let s = '';
      for (const q of queue) {
        if (frame >= q.end) {
          done++;
          s += q.to;
        } else if (frame >= q.start) {
          s += q.to === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        } else {
          s += q.from;
        }
      }
      setOut(s);
      if (done < queue.length) {
        frame += speed;
        raf = requestAnimationFrame(step);
      } else {
        prev.current = text;
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, start]);

  return (
    <span className={className} aria-label={text}>
      {out}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Letter-by-letter mask reveal                                        */
/* ------------------------------------------------------------------ */
export const SplitLetters: React.FC<{
  text: string;
  className?: string;
  letterClassName?: string;
  delay?: number;
  show: boolean;
}> = ({ text, className, letterClassName = '', delay = 0, show }) => (
  <span className={`inline-flex overflow-hidden ${className ?? ''}`} aria-label={text}>
    {text.split('').map((ch, i) => (
      <motion.span
        key={i + ch}
        aria-hidden
        className={`inline-block ${letterClassName}`}
        initial={{ y: '110%', rotate: 8 }}
        animate={show ? { y: '0%', rotate: 0 } : { y: '110%', rotate: 8 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.06 }}
      >
        {ch === ' ' ? ' ' : ch}
      </motion.span>
    ))}
  </span>
);

/* ------------------------------------------------------------------ */
/* Magnetic wrapper                                                    */
/* ------------------------------------------------------------------ */
export const Magnetic: React.FC<{ children: React.ReactNode; strength?: number; className?: string }> = ({
  children,
  strength = 0.35,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ''}`}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Custom cursor                                                       */
/* ------------------------------------------------------------------ */
export const Cursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || prefersReducedMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHover(!!el.closest('a, button, [data-cursor="hover"]'));
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', d);
    window.addEventListener('mouseup', u);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', d);
      window.removeEventListener('mouseup', u);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full border border-cyan-300 mix-blend-difference"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hover ? 72 : 36, height: hover ? 72 : 36, scale: down ? 0.8 : 1, backgroundColor: hover ? 'rgba(13,214,232,1)' : 'rgba(13,214,232,0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[201] w-1.5 h-1.5 rounded-full bg-cyan-300 pointer-events-none"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Scroll progress bar                                                 */
/* ------------------------------------------------------------------ */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[90] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
      style={{ scaleX }}
    />
  );
};

/* ------------------------------------------------------------------ */
/* Velocity-reactive marquee                                           */
/* ------------------------------------------------------------------ */
const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

export const VelocityMarquee: React.FC<{ children: React.ReactNode; baseVelocity?: number; className?: string }> = ({
  children,
  baseVelocity = 3,
  className,
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smoothVelocity, [-2000, 0, 2000], [12, 0, -12]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) dir.current = -1;
    else if (vf > 0) dir.current = 1;
    move += dir.current * move * vf;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className ?? ''}`}>
      <motion.div className="flex whitespace-nowrap" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex shrink-0" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Scroll-linked word highlight                                        */
/* ------------------------------------------------------------------ */
const Word: React.FC<{ progress: MotionValue<number>; range: [number, number]; children: string; accent: boolean }> = ({
  progress,
  range,
  children,
  accent,
}) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [12, 0]);
  const blur = useTransform(progress, range, [6, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return (
    <motion.span
      style={{ opacity, y, filter }}
      className={`inline-block mr-[0.25em] ${accent ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500' : ''}`}
    >
      {children}
    </motion.span>
  );
};

/** Text where `*marked phrases*` get the accent gradient. */
export const ScrollWords: React.FC<{ text: string; progress: MotionValue<number>; className?: string }> = ({
  text,
  progress,
  className,
}) => {
  const tokens: { w: string; accent: boolean }[] = [];
  let accent = false;
  for (const raw of text.split(' ')) {
    let w = raw;
    const opens = w.startsWith('*');
    if (opens) {
      accent = true;
      w = w.slice(1);
    }
    const closes = w.endsWith('*');
    if (closes) w = w.slice(0, -1);
    tokens.push({ w, accent });
    if (closes) accent = false;
  }
  return (
    <p className={className} aria-label={text.replace(/\*/g, '')}>
      {tokens.map((tk, i) => {
        const start = i / tokens.length;
        const end = start + 1 / tokens.length;
        return (
          <Word key={i} progress={progress} range={[start, end]} accent={tk.accent}>
            {tk.w}
          </Word>
        );
      })}
    </p>
  );
};

/* ------------------------------------------------------------------ */
/* Section label: "01 — Expertise" with a drawing line                 */
/* ------------------------------------------------------------------ */
export const SectionLabel: React.FC<{ index: string; label: string; className?: string }> = ({ index, label, className }) => (
  <motion.div
    className={`flex items-center gap-4 font-tech text-xs md:text-sm tracking-[0.3em] uppercase text-cyan-400/80 ${className ?? ''}`}
    initial="hidden"
    whileInView="show"
    viewport={REVEAL_VIEWPORT}
  >
    <span>{index}</span>
    <motion.span
      className="h-px w-16 bg-cyan-400/60 origin-left"
      variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } } }}
    />
    <motion.span variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { delay: 0.25, duration: 0.7 } } }}>
      {label}
    </motion.span>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* Film grain overlay                                                  */
/* ------------------------------------------------------------------ */
export const Grain: React.FC = () => (
  <div
    aria-hidden
    className="grain pointer-events-none fixed -inset-[50%] z-[80] opacity-[0.06] mix-blend-overlay"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
    }}
  />
);
