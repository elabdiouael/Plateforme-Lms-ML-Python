'use client';
import React, { useState } from 'react';
import styles from './InteractiveCode.module.css';
import Typewriter from '../Typewriter'; // On réutilise l'effet

interface LineExplanation {
  line: number;
  text: string;
}

interface InteractiveCodeProps {
  code: string;
  explanations?: LineExplanation[];
}

export default function InteractiveCode({ code, explanations = [] }: InteractiveCodeProps) {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const lines = code.trim().split('\n');

  // Trouver l'explication pour la ligne active
  const activeExplanation = explanations.find(e => e.line === activeLine);

  return (
    <div className={styles.container}>
      
      {/* 1. ZONE CODE */}
      <div className={styles.codePanel}>
        <div style={{ color: '#666', fontSize: '0.8rem', marginBottom: '10px' }}>main.py</div>
        {lines.map((lineContent, i) => {
          const lineNum = i + 1;
          const hasInfo = explanations.some(e => e.line === lineNum);
          
          return (
            <div 
              key={i}
              className={`${styles.line} ${activeLine === lineNum ? styles.lineActive : ''}`}
              onMouseEnter={() => hasInfo && setActiveLine(lineNum)}
              style={{ opacity: hasInfo ? 1 : 0.7 }} // Focus visuel sur les lignes importantes
            >
              <span style={{ color: '#555', marginRight: '15px', userSelect: 'none' }}>{lineNum}</span>
              {lineContent}
            </div>
          );
        })}
      </div>

      {/* 2. ZONE INFO (Sidebar) */}
      <div className={styles.infoPanel}>
        {activeExplanation ? (
          <div>
            <div className={styles.infoTitle}>Analyse Ligne {activeLine}</div>
            <div className={styles.infoText}>
              {/* Le Typewriter effect se relance à chaque changement de ligne */}
              <Typewriter key={activeLine} text={activeExplanation.text} speed={15} color="#fff" />
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            Survolez le code pour voir <br/> la logique "Risk Manager" 🧠
          </div>
        )}
      </div>

    </div>
  );
}