import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Database, Smartphone, Globe, ShieldCheck, Workflow, Brain, Plug } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionLabel } from './fx/effects';

/** Card with a cursor-following spotlight, glowing border and subtle 3D tilt. */
const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  color?: string;
  index: number;
}> = ({ children, className = '', color = '13,214,232', index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const bg = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(${color},0.16), transparent 45%)`;
  const border = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, rgba(${color},0.9), transparent 45%)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: 18, clipPath: 'inset(30% 0% 0% 0% round 28px)' }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.12 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
      }}
      onMouseLeave={() => {
        mx.set(-500);
        my.set(-500);
        rx.set(0);
        ry.set(0);
      }}
      className={`group relative rounded-[28px] p-px ${className}`}
    >
      {/* Glowing border layer */}
      <motion.div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: border }} />
      <div className="absolute inset-0 rounded-[28px] border border-white/10" />
      <div className="relative h-full rounded-[27px] bg-[#000e1f]/85 backdrop-blur-xl overflow-hidden p-7 md:p-9">
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: bg }} />
        <div className="relative z-10 h-full flex flex-col">{children}</div>
      </div>
    </motion.div>
  );
};

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-[11px] md:text-xs font-tech tracking-wider uppercase border border-white/10 bg-white/5 text-slate-300">
    {children}
  </span>
);

const IconBox: React.FC<{ Icon: typeof Database; className: string }> = ({ Icon, className }) => (
  <div className={`grid place-items-center w-14 h-14 rounded-2xl border mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 ${className}`}>
    <Icon size={26} />
  </div>
);

export const TechnicalEcosystem: React.FC = () => {
  const { t } = useLanguage();
  const c = t.ecosystem.cards;
  const headRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: headRef, offset: ['start end', 'end start'] });
  const titleX = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section id="ecosystem" className="relative w-full px-5 md:px-12 py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headRef} className="mb-16 md:mb-24 grid md:grid-cols-[1.2fr_1fr] gap-10 items-end">
          <div>
            <SectionLabel index="02" label={t.sections.ecosystem} className="mb-8" />
            <motion.h2
              style={{ x: titleX }}
              className="font-sans font-extrabold uppercase text-white leading-[0.9] tracking-tight text-[12vw] md:text-[6vw]"
            >
              {t.ecosystem.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">{t.ecosystem.titleHighlight}</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl leading-relaxed"
          >
            {t.ecosystem.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[minmax(260px,auto)]">
          <SpotlightCard index={0} color="251,146,60" className="md:col-span-2 md:row-span-2">
            <IconBox Icon={Database} className="bg-orange-500/10 border-orange-500/30 text-orange-400" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{c.database.title}</h3>
            <p className="text-slate-400 leading-relaxed mb-8">{c.database.description}</p>
            <ul className="mt-auto space-y-3">
              {c.database.items.map((it, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="w-6 h-px bg-orange-400" />
                  {it}
                </li>
              ))}
            </ul>
          </SpotlightCard>

          <SpotlightCard index={1} className="md:col-span-4">
            <div className="flex flex-col md:flex-row md:items-center gap-8 h-full">
              <div className="flex-1">
                <span className="inline-block mb-5 px-3 py-1 rounded-full text-xs font-tech tracking-widest uppercase bg-cyan-400/10 border border-cyan-400/30 text-cyan-300">
                  {c.web.badge}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{c.web.title}</h3>
                <p className="text-slate-400 leading-relaxed max-w-xl">{c.web.description}</p>
              </div>
              <div className="relative w-36 h-36 md:w-44 md:h-44 shrink-0 mx-auto">
                <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-[spin_18s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/30 animate-[spin_12s_linear_infinite_reverse]" />
                <div className="absolute inset-0 grid place-items-center text-cyan-300">
                  <Globe size={56} strokeWidth={1.2} />
                </div>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard index={2} color="96,165,250" className="md:col-span-2">
            <IconBox Icon={Smartphone} className="bg-blue-500/10 border-blue-500/30 text-blue-400" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{c.mobile.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{c.mobile.description}</p>
            <div className="mt-auto flex gap-2 flex-wrap">{c.mobile.tags.map((x) => <Tag key={x}>{x}</Tag>)}</div>
          </SpotlightCard>

          <SpotlightCard index={3} color="52,211,153" className="md:col-span-2">
            <IconBox Icon={ShieldCheck} className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{c.security.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{c.security.description}</p>
            <div className="mt-auto"><Tag>{c.security.tag}</Tag></div>
          </SpotlightCard>

          <SpotlightCard index={4} color="167,139,250" className="md:col-span-2">
            <IconBox Icon={Workflow} className="bg-violet-500/10 border-violet-500/30 text-violet-400" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{c.devops.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{c.devops.description}</p>
            <div className="mt-auto flex gap-2 flex-wrap">{c.devops.tags.map((x) => <Tag key={x}>{x}</Tag>)}</div>
          </SpotlightCard>

          <SpotlightCard index={5} color="244,114,182" className="md:col-span-2">
            <IconBox Icon={Brain} className="bg-pink-500/10 border-pink-500/30 text-pink-400" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{c.aiEng.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{c.aiEng.description}</p>
            <div className="mt-auto flex gap-2 flex-wrap">{c.aiEng.tags.map((x) => <Tag key={x}>{x}</Tag>)}</div>
          </SpotlightCard>

          <SpotlightCard index={6} color="250,204,21" className="md:col-span-2">
            <IconBox Icon={Plug} className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{c.api.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{c.api.description}</p>
            <div className="mt-auto flex gap-2 flex-wrap">{c.api.tags.map((x) => <Tag key={x}>{x}</Tag>)}</div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
