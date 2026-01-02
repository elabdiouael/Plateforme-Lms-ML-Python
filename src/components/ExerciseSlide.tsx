'use client';
import { useState } from 'react';
import InteractiveCode from './InteractiveCode';

export default function ExerciseSlide({ data, onNext }: any) {
  const [hasSuccess, setHasSuccess] = useState(false);
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);

  const handleCheck = (index: number) => {
    if (hasSuccess) return;
    if (index === data.correctIndex) {
      setHasSuccess(true);
    } else {
      if (!wrongIndices.includes(index)) {
        setWrongIndices([...wrongIndices, index]);
      }
    }
  };

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '20px 20px 40px 20px', /* Padding thtani zayed bach bouton yban */
      animation: 'fadeIn 0.5s',
      /* FIX SCROLL: Bach bouton next mayghberch ila kan code twil */
      maxHeight: '85vh', 
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#444 #1e1e1e' 
    }}>
      <h2 style={{ marginBottom: '20px', color: '#fff', fontSize: '1.5rem' }}>
        📝 Exercice {data.id}: {data.question}
      </h2>
      
      {/* Code sans explication pour l'exercice */}
      <InteractiveCode code={data.code} />

      {/* OPTIONS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px' }}>
        {data.options.map((opt: string, i: number) => {
          const isWrong = wrongIndices.includes(i);
          const isCorrect = hasSuccess && i === data.correctIndex;
          
          return (
            <button
              key={i}
              onClick={() => handleCheck(i)}
              disabled={hasSuccess || isWrong}
              style={{
                padding: '20px',
                background: isWrong ? 'rgba(231, 76, 60, 0.1)' : (isCorrect ? 'rgba(46, 204, 113, 0.2)' : '#252526'),
                border: `2px solid ${isWrong ? '#e74c3c' : (isCorrect ? '#2ecc71' : '#333')}`,
                color: '#fff',
                fontSize: '18px',
                borderRadius: '8px',
                textAlign: 'left',
                cursor: (hasSuccess || isWrong) ? 'default' : 'pointer',
                opacity: (isWrong && !hasSuccess) ? 0.6 : 1,
                transition: 'all 0.2s',
                fontFamily: 'Consolas, monospace'
              }}
            >
              {opt}
              {isCorrect && <span style={{ float: 'right' }}>✅</span>}
              {isWrong && <span style={{ float: 'right' }}>❌</span>}
            </button>
          );
        })}
      </div>

      {/* FEEDBACK ZONE */}
      <div style={{ marginTop: '30px', minHeight: '60px' }}>
        {(wrongIndices.length > 0 || hasSuccess) && (
          <div style={{ 
            background: hasSuccess ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)', 
            borderLeft: `4px solid ${hasSuccess ? '#2ecc71' : '#e74c3c'}`,
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '0 8px 8px 0',
            animation: 'fadeIn 0.3s'
          }}>
            <strong style={{ color: hasSuccess ? '#2ecc71' : '#e74c3c', display: 'block', marginBottom: '5px' }}>
              {hasSuccess ? "Exact !" : "Attention !"}
            </strong>
            <span style={{ color: '#d4d4d4', fontSize: '1.1rem' }}>
              💡 <b>La Règle :</b> {data.rule}
            </span>
          </div>
        )}

        {/* BOUTON SUIVANT */}
        {hasSuccess && (
           <div style={{ textAlign: 'right', paddingBottom: '20px' }}>
             <button 
               onClick={onNext}
               style={{ 
                 padding: '12px 30px', 
                 background: '#007acc', 
                 border: 'none', 
                 color: 'white', 
                 borderRadius: '6px', 
                 fontSize: '16px', 
                 cursor: 'pointer',
                 fontWeight: 'bold',
                 boxShadow: '0 4px 10px rgba(0,122,204,0.3)',
                 transition: 'transform 0.2s'
               }}
               onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
               onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
             >
               Suivant →
             </button>
           </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}