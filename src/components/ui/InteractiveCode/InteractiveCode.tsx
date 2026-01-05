'use client';
import React, { useState } from 'react';
import styles from './InteractiveCode.module.css';

interface LineExplanation {
  line: number;
  text: string;
}

interface InteractiveCodeProps {
  code: string;
  explanations?: LineExplanation[];
  globalExplanation?: string;
}

export default function InteractiveCode({ code, explanations = [], globalExplanation }: InteractiveCodeProps) {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const lines = code.trim().split('\n');

  const activeExplanation = explanations.find(e => e.line === activeLine);

  // --- ROBUST SYNTAX HIGHLIGHTING ---
  // Uses placeholders to prevent HTML tag conflicts (like 'class')
  const highlightSyntax = (line: string) => {
    // 1. Escape HTML special chars
    let processed = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Temporary storage for protected content
    const placeholders: string[] = [];
    const store = (content: string, className: string) => {
      placeholders.push(`<span class="${className}">${content}</span>`);
      return `___PH_${placeholders.length - 1}___`;
    };

    // 2. Protect Strings (Orange)
    processed = processed.replace(/(".*?"|'.*?')/g, (match) => store(match, styles.tokenString));

    // 3. Protect Comments (Green)
    if (processed.includes('#')) {
      const parts = processed.split('#');
      const codePart = parts[0];
      const commentPart = '#' + parts.slice(1).join('#');
      processed = codePart + store(commentPart, styles.tokenComment);
    }

    // 4. Keywords & Builtins
    const keywords = ["def", "class", "if", "else", "elif", "return", "import", "from", "print", "for", "in", "match", "case", "with", "as", "pass", "break", "continue", "self", "try", "except"];
    const builtins = ["range", "len", "enumerate", "zip", "int", "float", "str", "list", "dict", "set", "abs", "round", "np", "pd", "plt", "sns"];

    const replaceWords = (text: string, words: string[], style: string) => {
      // Regex matches whole words only
      const regex = new RegExp(`\\b(${words.join('|')})\\b`, 'g');
      return text.replace(regex, (match) => {
        if (match.startsWith("___PH")) return match; // Skip if inside placeholder
        return store(match, style);
      });
    };

    processed = replaceWords(processed, keywords, styles.tokenKeyword);
    processed = replaceWords(processed, builtins, styles.tokenBuiltin);

    // 5. Numbers (Light Green)
    processed = processed.replace(/\b(\d+)\b/g, (match) => {
       if (match.startsWith("___PH")) return match;
       return store(match, styles.tokenNumber);
    });

    // 6. Restore Placeholders (Iterative for safety)
    let hasPlaceholders = true;
    while (hasPlaceholders) {
      hasPlaceholders = false;
      processed = processed.replace(/___PH_(\d+)___/g, (_, id) => {
        hasPlaceholders = true;
        return placeholders[Number(id)];
      });
      if (!processed.includes("___PH_")) hasPlaceholders = false;
    }

    return processed;
  };

  return (
    <div className={styles.container}>
      <div className={styles.noiseOverlay}></div>

      <div className={styles.innerWrapper}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.controls}>
            <div className={`${styles.dot} ${styles.red}`}></div>
            <div className={`${styles.dot} ${styles.yellow}`}></div>
            <div className={`${styles.dot} ${styles.green}`}></div>
          </div>
          <div className={styles.tabTitle}>main.py</div>
          <div className={styles.status}>LIVE</div>
        </div>

        {/* BODY */}
        <div className={styles.body}>
          
          {/* LEFT: CODE */}
          <div className={styles.codeArea}>
            {lines.map((lineContent, i) => {
              const lineNum = i + 1;
              const hasInfo = explanations.some(e => e.line === lineNum);
              const isActive = activeLine === lineNum;
              
              return (
                <div 
                  key={i}
                  className={`${styles.lineRow} ${isActive ? styles.activeRow : ''}`}
                  onMouseEnter={() => hasInfo && setActiveLine(lineNum)}
                  onMouseLeave={() => setActiveLine(null)}
                  style={{ opacity: hasInfo ? 1 : (activeLine ? 0.4 : 0.8) }}
                >
                  <span style={{ 
                    minWidth: '30px', textAlign: 'right', marginRight: '20px', 
                    color: '#52525b', fontSize: '0.8rem', userSelect: 'none' 
                  }}>
                    {lineNum}
                  </span>
                  <span 
                    className={styles.codeContent}
                    dangerouslySetInnerHTML={{ __html: highlightSyntax(lineContent) }} 
                  />
                </div>
              );
            })}
          </div>

          {/* RIGHT: ANALYSIS HUD */}
          <div className={styles.infoArea}>
            <div className={styles.gridBg}></div>
            
            {activeExplanation ? (
              <div className={styles.infoContent} key={`exp-${activeLine}`}>
                <div style={{ 
                  color: '#00f3ff', fontFamily: 'Consolas', fontSize: '0.75rem', 
                  letterSpacing: '2px', marginBottom: '15px', borderBottom: '1px solid rgba(0,243,255,0.3)',
                  paddingBottom: '5px' 
                }}>
                  ⚡ ANALYSE LIGNE {activeLine}
                </div>
                <div className={styles.infoText}>
                  {activeExplanation.text}
                </div>
              </div>
            ) : (
              <div className={styles.infoContent} key="global">
                <div style={{ 
                  color: '#bc13fe', fontFamily: 'Consolas', fontSize: '0.75rem', 
                  letterSpacing: '2px', marginBottom: '15px', borderBottom: '1px solid rgba(188,19,254,0.3)',
                  paddingBottom: '5px' 
                }}>
                  🧠 LOGIQUE DU MODULE
                </div>
                <div className={styles.infoText}>
                   {globalExplanation ? globalExplanation : (
                     <span style={{opacity: 0.5}}>Survolez une ligne pour voir l'analyse...</span>
                   )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}