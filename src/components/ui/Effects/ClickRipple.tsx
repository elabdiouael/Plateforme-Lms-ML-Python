'use client';
import React, { useEffect, useState } from 'react';

export default function ClickRipple() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setRipples((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);

      // Nettoyage automatique après 1 seconde
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99999 }}>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: '0px',
            height: '0px',
            borderRadius: '50%',
            border: '2px solid #00f3ff',
            boxShadow: '0 0 10px #00f3ff, inset 0 0 20px #00f3ff',
            animation: 'rippleEffect 0.6s linear forwards',
            opacity: 1
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes rippleEffect {
          0% { width: 0px; height: 0px; opacity: 1; border-width: 5px; }
          100% { width: 500px; height: 500px; opacity: 0; border-width: 0px; }
        }
      `}</style>
    </div>
  );
}