'use client';
import React, { useRef, useEffect, useState } from 'react';

export default function TiltWrapper({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // DETECT MOBILE
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // SECURITY CHECK: Si mobile, on arrête TOUT de suite
    if (isMobile || !cardRef.current || !glowRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotation légère pour éviter trop de déformation
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.05), transparent 80%)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    glowRef.current.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0), transparent 100%)`;
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',
        padding: isMobile ? '10px 0' : '20px'
      }}
    >
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          transition: 'transform 0.1s ease-out',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          borderRadius: '16px',
          width: '100%',
          
          /* --- FIX FLOU (BLUR) IMPORTANT --- */
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)', // Force GPU crisp rendering
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        {!isMobile && (
          <div 
            ref={glowRef}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              borderRadius: '16px', pointerEvents: 'none', zIndex: 5, mixBlendMode: 'overlay'
            }} 
          />
        )}
        <div style={{ position: 'relative', zIndex: 10, transform: isMobile ? 'none' : 'translateZ(20px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}