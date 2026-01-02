'use client';
import { useEffect, useState } from 'react';
import styles from './Background.module.css';

export default function Background() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid} />
      
      {/* Orb qui suit la souris */}
      <div 
        className={styles.orb} 
        style={{
          top: `${mouse.y}%`, left: `${mouse.x}%`,
          width: '30vw', height: '30vw',
          background: 'radial-gradient(circle, #00f3ff 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)'
        }} 
      />
      
      {/* Orb Fixe pour ambiance */}
      <div 
        className={styles.orb} 
        style={{
          bottom: '0%', right: '0%',
          width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, #bc13fe 0%, transparent 70%)',
        }} 
      />
    </div>
  );
}