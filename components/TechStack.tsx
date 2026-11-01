import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionLabel, VelocityMarquee } from './fx/effects';

const ROW_A = ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Firebase', 'React Native'];
const ROW_B = ['Gemini', 'GPT-4o', 'ElevenLabs', 'LangChain', 'GCP', 'Azure', 'Cloudflare', 'Docker', 'Kubernetes', 'Terraform'];

const Item: React.FC<{ name: string; outline?: boolean }> = ({ name, outline }) => (
  <span className="flex items-center shrink-0 px-6 md:px-10 group" data-cursor="hover">
    <span
      className={`font-sans font-extrabold uppercase tracking-tight text-[13vw] md:text-[7.5vw] leading-none transition-colors duration-300 ${
        outline
          ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(148,163,184,0.5)] group-hover:[-webkit-text-stroke:1.5px_#0DD6E8]'
          : 'text-white/90 group-hover:text-cyan-400'
      }`}
    >
      {name}
    </span>
    <span className="ml-12 md:ml-20 text-cyan-400 text-3xl md:text-5xl">✦</span>
  </span>
);

export const TechStack: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="stack" className="relative w-full py-24 md:py-36 border-y border-white/5 bg-[#000a14]/70 backdrop-blur-sm overflow-hidden">
      <div className="px-5 md:px-12 mb-12 md:mb-16 max-w-[1400px] mx-auto flex items-end justify-between gap-6">
        <SectionLabel index="03" label={t.sections.stack} />
        <h3 className="hidden md:block font-tech text-sm text-slate-500 uppercase tracking-[0.3em]">{t.stack.title}</h3>
      </div>
      <div className="space-y-2 md:space-y-4 -rotate-2 scale-105">
        <VelocityMarquee baseVelocity={-2.5}>
          {ROW_A.map((n) => (
            <Item key={n} name={n} />
          ))}
        </VelocityMarquee>
        <VelocityMarquee baseVelocity={2.5}>
          {ROW_B.map((n) => (
            <Item key={n} name={n} outline />
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
};
