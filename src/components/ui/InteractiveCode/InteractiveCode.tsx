'use client';
import React, { useState } from 'react';
import styles from './InteractiveCode.module.css';
import Typewriter from '../Typewriter';

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

  // Advanced Syntax Highlighting (Class-based pour éviter les bugs regex)
  const highlightSyntax = (line: string) => {
    let processed = line
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // 1. Strings (Orange) - On le fait en premier pour protéger le contenu
    // On utilise un placeholder temporaire pour ne pas casser les autres regex
    const strings: string[] = [];
    processed = processed.replace(/(".*?"|'.*?')/g, (match) => {
      strings.push(match);
      return `__STR_${strings.length - 1}__`;
    });

    // 2. Comments (Green)
    if (processed.trim().startsWith('#')) {
      // Si toute la ligne est un commentaire
      processed = `<span class="${styles.tokenComment}">${processed}</span>`;
    } else {
        // Commentaire inline (à la fin de la ligne)
        // On doit faire attention à ne pas matcher le # dans les strings (déjà protégés)
        processed = processed.replace(/(#.*)/g, `<span class="${styles.tokenComment}">$1</span>`);

        // 3. Keywords (Violet)
        const keywords = ["def", "class", "if", "else", "elif", "return", "import", "from", "print", "for", "in", "match", "case", "with", "as", "pass", "break", "continue"];
        keywords.forEach(kw => {
          const regex = new RegExp(`\\b(${kw})\\b`, 'g');
          processed = processed.replace(regex, `<span class="${styles.tokenKeyword}">$1</span>`);
        });

        // 4. Built-ins & Logic (Cyan)
        const builtins = ["range", "len", "enumerate", "zip", "int", "float", "str", "list", "dict", "set", "abs", "round"];
        builtins.forEach(bi => {
          const regex = new RegExp(`\\b(${bi})\\b`, 'g');
          processed = processed.replace(regex, `<span class="${styles.tokenBuiltin}">$1</span>`);
        });
        
        // 5. Booléens & Null (Bleu)
        processed = processed.replace(/\b(True|False|None)\b/g, `<span class="${styles.tokenBool}">$1</span>`);

        // 6. Numbers (Light Green)
        // Le bug était ici : le regex matchait les chiffres dans les codes Hexa.
        // Maintenant qu'on utilise des classes CSS, il n'y a PLUS de codes Hexa dans la string 'processed' !
        processed = processed.replace(/\b(\d+)\b/g, `<span class="${styles.tokenNumber}">$1</span>`);
    }

    // Restore Strings
    processed = processed.replace(/__STR_(\d+)__/g, (_, id) => {
      return `<span class="${styles.tokenString}">${strings[Number(id)]}</span>`;
    });

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
          <div className={styles.status}>
            <div className={styles.statusDot}></div>
            LIVE
          </div>
        </div>

        {/* BODY */}
        <div className={styles.body}>
          
          {/* GAUCHE : CODE */}
          <div className={styles.codeArea}>
            {lines.map((lineContent, i) => {
              const lineNum = i + 1;
              const hasInfo = explanations.some(e => e.line === lineNum);
              const isActive = activeLine === lineNum;
              const isDimmed = activeLine !== null && !isActive;

              return (
                <div 
                  key={i}
                  className={`${styles.lineRow} ${isActive ? styles.activeRow : ''}`}
                  onMouseEnter={() => hasInfo && setActiveLine(lineNum)}
                  onMouseLeave={() => setActiveLine(null)}
                  style={{ opacity: hasInfo ? 1 : 0.7 }}
                >
                  <span className={styles.lineNum}>{lineNum}</span>
                  <span 
                    className={`${styles.codeContent} ${isDimmed ? styles.dimmed : ''}`}
                    dangerouslySetInnerHTML={{ __html: highlightSyntax(lineContent) }} 
                  />
                </div>
              );
            })}
          </div>

          {/* DROITE : ANALYSE */}
          <div className={styles.infoArea}>
            <div className={styles.gridBg}></div>
            
            {activeExplanation ? (
              <div className={styles.infoContent} key={`exp-${activeLine}`}>
                <div className={styles.infoLabel}>
                  <span>⚡ ANALYSE LIGNE {activeLine}</span>
                </div>
                <div className={styles.infoText}>
                  <Typewriter text={activeExplanation.text} speed={15} color="#fff" />
                </div>
              </div>
            ) : (
              <div className={styles.infoContent} key="global">
                <div className={styles.infoLabel}>
                  <span>🧠 LOGIQUE DU MODULE</span>
                </div>
                <div className={styles.infoText}>
                   {globalExplanation ? (
                     globalExplanation
                   ) : (
                     <div className={styles.emptyState}>
                       <div className={styles.scannerLine}></div>
                       <span>En attente de sélection...</span>
                     </div>
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