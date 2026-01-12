import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', enableTilt = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !enableTilt) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!enableTilt) return;
    x.set(0);
    y.set(0);
  };

  const style = enableTilt ? {
    rotateX,
    rotateY,
    transformStyle: "preserve-3d" as const,
  } : {};

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`
        relative overflow-hidden rounded-3xl 
        bg-white/5 backdrop-blur-xl 
        border border-white/5 
        shadow-xl
        transition-all duration-300
        ${!enableTilt && 'hover:scale-[1.02] hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(13,214,232,0.1)]'}
        ${className}
      `}
    >
      {/* Lighting effect for Holo mode */}
      {enableTilt && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 40%)'
          }} 
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Content Parallax Container */}
      <div className={`relative z-10 ${enableTilt ? 'translate-z-10' : ''}`} style={{ transform: enableTilt ? 'translateZ(20px)' : 'none' }}>
        {children}
      </div>
    </motion.div>
  );
};