'use client';
import { useState } from 'react';
import styles from './ExerciseSlide.module.css';
// Assure-toi que le chemin est correct vers ton nouveau InteractiveCode
import InteractiveCode from '../InteractiveCode/InteractiveCode'; 
import Typewriter from '../Typewriter';

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
    <div className={styles.card}>
      {/* 1. Header */}
      <div className={styles.header}>
        <span style={{ color: '#fff', fontWeight: 'bold' }}>Exercice {data.id}</span>
        <span className={styles.levelBadge}>
          LVL {Math.ceil(data.id / 3)}
        </span>
      </div>

      {/* 2. Question (Rouge + Animation Typewriter) */}
      <div className={styles.question}>
        <Typewriter text={data.question} speed={25} color="#ff4757" />
      </div>

      {/* 3. Le Code (Split View) */}
      <InteractiveCode code={data.code} />

      {/* 4. Les Options (Grid) */}
      <div className={styles.optionsGrid}>
        {data.options.map((opt: string, i: number) => {
          const isWrong = wrongIndices.includes(i);
          const isCorrect = hasSuccess && i === data.correctIndex;
          
          // Styles dynamiques inline pour gérer les états (Succès/Erreur)
          let dynamicStyle = {};
          if (isWrong) {
             dynamicStyle = { 
               borderColor: '#ff4757', 
               background: 'rgba(255, 71, 87, 0.1)', 
               color: '#ff4757',
               animation: 'shake 0.4s' 
             };
          }
          if (isCorrect) {
             dynamicStyle = { 
               borderColor: '#2ecc71', 
               background: 'rgba(46, 204, 113, 0.1)', 
               color: '#2ecc71',
               fontWeight: 'bold'
             };
          }

          return (
            <button
              key={i}
              onClick={() => handleCheck(i)}
              disabled={hasSuccess || isWrong}
              className={styles.optionBtn}
              style={dynamicStyle}
            >
              {opt}
              {isCorrect && <span style={{ float: 'right' }}>✅</span>}
              {isWrong && <span style={{ float: 'right' }}>❌</span>}
            </button>
          );
        })}
      </div>

      {/* 5. Feedback Zone */}
      <div className={styles.feedback}>
        {/* Cas Erreur : On montre la règle */}
        {wrongIndices.length > 0 && !hasSuccess && (
          <div style={{ color: '#aaa', fontSize: '0.9rem', borderLeft: '3px solid #ff4757', paddingLeft: '10px' }}>
            <span style={{ color: '#ff4757', fontWeight: 'bold' }}>Indice :</span> {data.rule}
          </div>
        )}

        {/* Cas Succès : Bouton Suivant */}
        {hasSuccess && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'popIn 0.3s' }}>
            <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>Correct ! Logic Unlocked 🔓</span>
            <button onClick={onNext} className={styles.nextBtn}>
              Niveau Suivant →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}