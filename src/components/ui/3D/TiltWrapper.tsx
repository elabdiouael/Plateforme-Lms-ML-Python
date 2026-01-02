'use client';
import React, { useRef } from 'react';

export default function TiltWrapper({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotation Limitée (Max 7deg pour pas trop déformer)
    const rotateX = ((y - centerY) / centerY) * -7; 
    const rotateY = ((x - centerX) / centerX) * 7;

    // DIRECT DOM MANIPULATION (0 Lag, pas de Re-render React)
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Update Glow Position
    glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 80%)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    
    // Reset Doux
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    glowRef.current.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0), transparent 100%)`;
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '20px' // Espace pour l'effet 3D
      }}
    >
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          transition: 'transform 0.1s ease-out', // Smooth movement
          willChange: 'transform', // Optimisation GPU
          transformStyle: 'preserve-3d',
          borderRadius: '16px',
        }}
      >
        {/* LAYER 1: GLOW (En arrière plan mais visible) */}
        <div 
          ref={glowRef}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: '16px',
            pointerEvents: 'none', // CLICK-THROUGH FIX: L-souris kat-douz mnno
            zIndex: 2, // Fo9 background
            mixBlendMode: 'overlay'
          }} 
        />

        {/* LAYER 2: CONTENT (Les boutons sont ici) */}
        <div style={{ 
          position: 'relative', 
          zIndex: 10, // SUPER IMPORTANT: Hada fo9 l-glow -> Clics garantis
          transform: 'translateZ(20px)' // Ykhrej 3ndk chwiya
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}