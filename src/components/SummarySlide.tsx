'use client';
import React from 'react';

export default function SummarySlide({ data, onRestart }: any) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '40px 20px', animation: 'popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
      
      {/* Icone / Emoji Celebration */}
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>
        🏆
      </div>

      <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#4ec9b0' }}>
        {data.title}
      </h1>

      <div style={{ 
        background: '#252526', 
        padding: '30px', 
        borderRadius: '12px', 
        border: '1px solid #333',
        marginBottom: '40px',
        color: '#d4d4d4',
        fontSize: '1.2rem',
        lineHeight: '1.6'
      }}>
        <p style={{ marginBottom: '20px' }}>{data.content}</p>
        
        {/* Next Steps List */}
        <div style={{ textAlign: 'left', marginTop: '30px', borderTop: '1px solid #444', paddingTop: '20px' }}>
          <strong style={{ color: '#007acc', display: 'block', marginBottom: '10px' }}>🚀 Prochaine étape :</strong>
          <ul style={{ listStyle: 'none' }}>
            {data.nextSteps?.map((step: string, i: number) => (
              <li key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#4ec9b0' }}>✓</span> {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button 
        onClick={onRestart}
        style={{ 
          padding: '15px 40px', 
          fontSize: '1.1rem', 
          background: '#2ecc71', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 5px 15px rgba(46, 204, 113, 0.3)'
        }}
      >
        🔄 Recommencer le Module
      </button>

      <style jsx>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}