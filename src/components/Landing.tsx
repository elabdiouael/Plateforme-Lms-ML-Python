'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function Landing({ onStart }: { onStart: () => void }) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State pour la souris
  const [mouse, setMouse] = useState({ x: 0, y: 0, centerX: 0, centerY: 0 });

  useEffect(() => {
    // Petit délai pour être sûr que le CSS est chargé avant d'afficher
    setTimeout(() => {
      setMounted(true);
    }, 100);
    
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      
      const xPct = (e.clientX / innerWidth - 0.5) * 2;
      const yPct = (e.clientY / innerHeight - 0.5) * 2;
      
      setMouse({ 
        x: xPct, 
        y: yPct,
        centerX: e.clientX,
        centerY: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="landing-root" ref={containerRef}>
      
      {/* 1. DYNAMIC BACKGROUND */}
      <div className="noise-overlay"></div>
      <div 
        className="spotlight" 
        style={{ 
          background: `radial-gradient(600px circle at ${mouse.centerX}px ${mouse.centerY}px, rgba(255,255,255,0.07), transparent 40%)` 
        }}
      />

      {/* 2. 3D CONTAINER */}
      <div 
        className="tilt-wrapper"
        style={{
          transform: `perspective(1000px) rotateX(${mouse.y * -2}deg) rotateY(${mouse.x * 2}deg)`
        }}
      >
        
        {/* HERO CONTENT (Caché par défaut pour éviter le Flash) */}
        <div className={`hero-content ${mounted ? 'active' : ''}`}>
          
          {/* BADGE SUPERIEUR */}
          <div className="top-badge">
            <span className="live-dot"></span>
            <span className="badge-txt">SYSTEM ONLINE • V2.0</span>
          </div>

          {/* TITRE MASSIF */}
          <h1 className="mega-title">
            <span className="line line-1">MASTER THE</span>
            <span className="line line-2">ALGORITHM.</span>
          </h1>

          {/* SOUS-TITRE */}
          <div className="sub-container">
            <div className="vertical-bar"></div>
            <p className="description">
              Devenez un <strong>Ingénieur Data Confirmé</strong>. <br/>
              Une approche structurelle du code brut à l'intelligence artificielle.
            </p>
          </div>

          {/* SIGNATURE DE L'ARCHITECTE (Position Fixée) */}
          <div className="architect-badge">
            <div className="arch-avatar">L</div>
            <div className="arch-info">
              <span className="arch-label">Realized by</span>
              <span className="arch-name">ELABDI OUAIL</span>
              <span className="arch-role">Prof & Ingénieur</span>
            </div>
          </div>

          {/* BOUTON D'ENTRÉE */}
          <button onClick={onStart} className="enter-btn">
            <span className="btn-bg"></span>
            <span className="btn-text">INITIALISER LE PROTOCOLE</span>
            <span className="btn-icon">→</span>
          </button>

        </div>
      </div>

      {/* FOOTER */}
      <div className={`footer-hud ${mounted ? 'visible' : ''}`}>
        <div className="hud-item">
          <span className="hud-label">LATENCY</span>
          <span className="hud-val text-green">12ms</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">CORE</span>
          <span className="hud-val">PYTHON 3.10</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">SECURE</span>
          <span className="hud-val text-blue">ENCRYPTED</span>
        </div>
      </div>

      <style jsx>{`
        /* --- GLOBAL --- */
        .landing-root {
          min-height: 100vh;
          width: 100vw;
          background-color: #050505;
          color: #fff;
          overflow-x: hidden;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .noise-overlay {
          position: absolute; inset: 0; opacity: 0.05; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .spotlight { position: absolute; inset: 0; z-index: 2; pointer-events: none; }

        .tilt-wrapper {
          position: relative; z-index: 10; width: 100%; max-width: 1200px;
          display: flex; justify-content: center; align-items: center;
          transition: transform 0.1s ease-out; transform-style: preserve-3d;
        }

        /* --- CONTENT (Anti-Flash Fix) --- */
        .hero-content {
          text-align: center;
          display: flex; flex-direction: column; align-items: center;
          transform: translateZ(50px);
          opacity: 0; /* CACHÉ PAR DÉFAUT */
          transition: opacity 1s ease; /* Transition douce */
        }
        .hero-content.active { opacity: 1; }

        /* Badge */
        .top-badge {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 30px;
          background: rgba(255,255,255,0.03); margin-bottom: 40px;
          transform: translateY(-20px); transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .active .top-badge { transform: translateY(0); }
        
        .live-dot { width: 6px; height: 6px; background: #00f3ff; border-radius: 50%; box-shadow: 0 0 10px #00f3ff; animation: pulse 2s infinite; }
        .badge-txt { font-size: 0.7rem; letter-spacing: 2px; color: #888; font-weight: 600; }

        /* Mega Title */
        .mega-title {
          display: flex; flex-direction: column;
          font-size: 7rem; line-height: 0.9; font-weight: 800; letter-spacing: -4px;
          margin-bottom: 40px; position: relative;
        }
        .line {
          display: block; background: linear-gradient(to bottom, #fff 30%, #666 100%);
          -webkit-background-clip: text; color: transparent;
          opacity: 0; transform: translateY(50px) rotateX(20deg); transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .line-2 { 
          transition-delay: 0.1s; 
          background: linear-gradient(to bottom, #fff 20%, #00f3ff 100%); -webkit-background-clip: text;
        }
        .active .line { opacity: 1; transform: translateY(0) rotateX(0); }

        /* Description */
        .sub-container {
          display: flex; align-items: center; gap: 20px; margin-bottom: 60px;
          opacity: 0; transform: translateY(20px); transition: all 1s 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .active .sub-container { opacity: 1; transform: translateY(0); }
        .vertical-bar { width: 2px; height: 40px; background: #333; }
        .description { text-align: left; font-size: 1.1rem; color: #888; line-height: 1.5; }
        .description strong { color: #fff; font-weight: 500; }

        /* Architect Badge (CORRECTED POSITION) */
        .architect-badge {
          position: absolute;
          right: -50px; /* Moins loin */
          top: 60%; /* Ajusté */
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          opacity: 0; transform: translateX(20px); transition: all 1s 0.6s ease;
          width: 150px; /* Largeur fixe pour éviter le drift */
        }
        .active .architect-badge { opacity: 1; transform: translateX(0); }

        .arch-avatar {
          width: 60px; height: 60px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          font-weight: bold; color: #fff; font-size: 2rem; /* Taille "L" */
          background: #000;
          font-family: 'Times New Roman', serif; /* Font Death Note style */
          box-shadow: 0 0 20px rgba(0,0,0,0.8);
        }
        .arch-info { display: flex; flex-direction: column; text-align: center; }
        .arch-label { font-size: 0.5rem; color: #555; text-transform: uppercase; letter-spacing: 1px; }
        .arch-name { font-size: 0.9rem; color: #fff; letter-spacing: 1px; font-weight: 700; margin-top: 2px; }
        .arch-role { font-size: 0.6rem; color: #00f3ff; margin-top: 2px; }

        /* Button */
        .enter-btn {
          position: relative; padding: 20px 50px; background: transparent; border: 1px solid rgba(255,255,255,0.2);
          color: #fff; font-size: 1rem; font-weight: 600; letter-spacing: 2px; cursor: pointer; overflow: hidden;
          transition: all 0.4s ease; opacity: 0; transform: translateY(20px); 
          transition: opacity 1s 0.4s, transform 1s 0.4s, border-color 0.3s;
        }
        .active .enter-btn { opacity: 1; transform: translateY(0); }
        .enter-btn:hover { border-color: #fff; transform: scale(1.05); }
        .btn-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #fff; transform: scaleX(0); transform-origin: left; transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); z-index: 0; }
        .enter-btn:hover .btn-bg { transform: scaleX(1); }
        .btn-text { position: relative; z-index: 1; transition: color 0.4s; }
        .enter-btn:hover .btn-text { color: #000; }
        .btn-icon { position: relative; z-index: 1; margin-left: 10px; transition: color 0.4s, transform 0.4s; display: inline-block; }
        .enter-btn:hover .btn-icon { color: #000; transform: translateX(5px); }

        /* Footer */
        .footer-hud {
          position: absolute; bottom: 40px; width: 100%; display: flex; justify-content: center; gap: 60px;
          opacity: 0; transition: opacity 1s 0.8s;
        }
        .visible.footer-hud { opacity: 1; }
        
        .hud-item { display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .hud-label { font-size: 0.6rem; color: #444; letter-spacing: 2px; font-weight: 700; }
        .hud-val { font-size: 0.8rem; color: #666; font-family: 'Consolas', monospace; }
        .text-green { color: #00ff41; text-shadow: 0 0 10px rgba(0, 255, 65, 0.3); }
        .text-blue { color: #00f3ff; text-shadow: 0 0 10px rgba(0, 243, 255, 0.3); }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        /* --- MOBILE --- */
        @media (max-width: 768px) {
          .landing-root { padding: 20px 0; height: auto; min-height: 100vh; }
          .tilt-wrapper { transform: none !important; padding: 0; flex-direction: column; }
          .mega-title { font-size: 3.2rem; letter-spacing: -2px; margin-bottom: 20px; }
          .sub-container { flex-direction: column; text-align: center; gap: 10px; margin-bottom: 40px; }
          .vertical-bar { width: 40px; height: 2px; margin-bottom: 10px; }
          .description { text-align: center; font-size: 1rem; padding: 0 10px; }
          
          /* Mobile Badge Placement */
          .architect-badge { 
            position: relative; right: auto; top: auto; margin-top: 40px; margin-bottom: 20px; 
            transform: none !important; opacity: 1 !important; 
          }
          
          .footer-hud { position: relative; bottom: auto; margin-top: 30px; gap: 20px; flex-wrap: wrap; }
          .enter-btn { width: 100%; padding: 15px; font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
}