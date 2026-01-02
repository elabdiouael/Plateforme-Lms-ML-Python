'use client';
import { useEffect, useState } from 'react';

export default function Background({ section }: { section: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Tracking Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // On normalise entre -1 et 1
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Theme Logic
  let color1 = '#00f3ff'; // Default Blue
  let color2 = '#bc13fe'; // Default Purple
  
  if (section === 'exercise') { // Mode QCM (Action/Danger)
    color1 = '#ff0055'; // Red
    color2 = '#ffae00'; // Orange
  } else if (section === 'algorithms') { // Mode Matrix
    color1 = '#0aff0a'; // Green
    color2 = '#008000'; // Dark Green
  } else if (section === 'lists') { // Mode Data flow
    color1 = '#007cf0'; // Ocean
    color2 = '#00dfd8'; // Cyan
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -1,
      overflow: 'hidden',
      background: '#050505',
      transition: 'all 1s ease'
    }}>
      {/* Orb 1 (Suit la souris inversée) */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '40vw',
        height: '40vw',
        background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`,
        opacity: 0.15,
        filter: 'blur(60px)',
        transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
        transition: 'background 1s ease',
        borderRadius: '50%'
      }} />

      {/* Orb 2 (Suit la souris) */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '35vw',
        height: '35vw',
        background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`,
        opacity: 0.15,
        filter: 'blur(80px)',
        transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        transition: 'background 1s ease',
        borderRadius: '50%'
      }} />

      {/* Grid Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
                          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
      }} />
    </div>
  );
}