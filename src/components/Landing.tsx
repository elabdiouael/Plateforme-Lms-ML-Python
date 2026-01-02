'use client';
import React from 'react';

export default function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      {/* 3D CUBE EFFECT (CSS Pure) */}
      <div className="scene" style={{ perspective: '1000px', marginBottom: '50px' }}>
        <div className="cube" style={{
          width: '100px', height: '100px', position: 'relative',
          transformStyle: 'preserve-3d', animation: 'spin3D 10s infinite linear'
        }}>
          {/* Faces du cube (Abstraites) */}
          <div style={{...faceStyle, transform: 'rotateY(0deg) translateZ(50px)', border: '2px solid #00f3ff', background: 'rgba(0,243,255,0.1)'}}></div>
          <div style={{...faceStyle, transform: 'rotateY(90deg) translateZ(50px)', border: '2px solid #bc13fe', background: 'rgba(188,19,254,0.1)'}}></div>
          <div style={{...faceStyle, transform: 'rotateY(180deg) translateZ(50px)', border: '2px solid #00f3ff', background: 'rgba(0,243,255,0.1)'}}></div>
          <div style={{...faceStyle, transform: 'rotateY(-90deg) translateZ(50px)', border: '2px solid #bc13fe', background: 'rgba(188,19,254,0.1)'}}></div>
          <div style={{...faceStyle, transform: 'rotateX(90deg) translateZ(50px)', border: '2px solid #fff', background: 'rgba(255,255,255,0.1)'}}></div>
          <div style={{...faceStyle, transform: 'rotateX(-90deg) translateZ(50px)', border: '2px solid #fff', background: 'rgba(255,255,255,0.1)'}}></div>
        </div>
      </div>

      {/* TITRES */}
      <h1 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-2px', marginBottom: '10px' }}>
        <span style={{ color: '#fff' }}>SEO</span>
        <span style={{ color: '#00f3ff', textShadow: '0 0 20px rgba(0,243,255,0.5)' }}>MANIAK</span>
      </h1>
      
      <h2 style={{ fontSize: '1.2rem', color: '#888', marginBottom: '40px', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase' }}>
        Elabdi Ouail <span style={{ color: '#bc13fe' }}>//</span> Séance 1 : Python Fundamentals & ML Prep
      </h2>

      {/* START BUTTON */}
      <button 
        onClick={onStart}
        style={{
          padding: '15px 50px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#000',
          background: '#00f3ff',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(0,243,255,0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 40px rgba(0,243,255,0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0,243,255,0.4)';
        }}
      >
        Lancer la simulation 🚀
      </button>

    </div>
  );
}

const faceStyle: React.CSSProperties = {
  position: 'absolute', width: '100px', height: '100px',
  boxShadow: '0 0 15px inset rgba(255,255,255,0.1)'
};