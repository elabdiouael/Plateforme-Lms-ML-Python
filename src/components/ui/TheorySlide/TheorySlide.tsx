'use client';
import React, { useEffect, useState } from 'react';
import styles from './TheorySlide.module.css';

interface TheorySlideProps {
  data: {
    id?: number;
    title: string;
    content: string;
  };
  onNext: () => void;
}

export default function TheorySlide({ data, onNext }: TheorySlideProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Parser Intelligent
  const parseContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      const cleanLine = line.trim();
      if (!cleanLine) return <br key={index} />;

      const delayStyle = { animationDelay: `${index * 0.1}s` };

      // Titres de section (**Titre**)
      // On les rend Bleu Néon
      if (cleanLine.startsWith('**') && cleanLine.endsWith('**')) {
         return (
            <h3 key={index} className={styles.textBlock} style={{
                ...delayStyle, 
                color: '#00f3ff', 
                marginTop:'30px', 
                marginBottom:'15px',
                textTransform:'uppercase', 
                letterSpacing:'2px', 
                fontSize:'0.9rem', 
                borderLeft:'3px solid #00f3ff', 
                paddingLeft:'15px',
                textShadow: '0 0 10px rgba(0, 243, 255, 0.4)'
            }}>
               {cleanLine.replace(/\*\*/g, '')}
            </h3>
         )
      }

      // Listes avec puces (* ou -)
      if (cleanLine.startsWith('*') || cleanLine.startsWith('-') || cleanLine.startsWith('•')) {
        return (
          <div key={index} className={`${styles.textBlock} ${styles.listItem}`} style={delayStyle}>
            <span className={styles.bulletPoint}>›</span>
            {/* On applique le highlightText aussi à l'intérieur des listes */}
            <span>{highlightText(cleanLine.substring(1).trim())}</span>
          </div>
        );
      }

      // Paragraphe normal
      return (
        <p key={index} className={styles.textBlock} style={delayStyle}>
          {highlightText(cleanLine)}
        </p>
      );
    });
  };

  // Fonction pour rendre le texte important "Lumineux"
  const highlightText = (text: string) => {
    // Regex pour capturer **texte**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Applique la classe .glowingText
        return <span key={i} className={styles.glowingText}>{part.slice(2, -2)}</span>;
      }
      return part;
    });
  };

  return (
    <div className={styles.card}>
      
      {/* Texture de grain "Cinéma" */}
      <div className={styles.noiseOverlay}></div>

      {/* Header Système */}
      <div className={styles.headerBar}>
        <div className={styles.statusIndicator}>
          <div className={styles.dotPulse}></div>
          <span>SECURE_CONN_ESTABLISHED</span>
        </div>
        <div className={styles.statusIndicator} style={{ opacity: 0.5 }}>
          DATA_PACKET_{data.id || '00'}
        </div>
      </div>

      {/* Contenu */}
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>
          {data.title}
        </h1>
        
        <div>
          {parseContent(data.content)}
        </div>
      </div>

      {/* Footer / Bouton */}
      <button onClick={onNext} className={styles.actionBtn}>
        INITIALISER L'ÉTAPE SUIVANTE
      </button>

    </div>
  );
}