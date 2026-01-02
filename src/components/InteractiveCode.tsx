'use client';
import React from 'react';

interface LineExplanation {
  line: number;
  text: string;
}

interface InteractiveCodeProps {
  code: string;
  explanations?: LineExplanation[];
}

const InteractiveCode = ({ code, explanations = [] }: InteractiveCodeProps) => {
  const lines = code.trim().split('\n');

  // Fonction Syntax Highlighting (Safe Mode)
  const highlightSyntax = (line: string) => {
    // 1. Clean HTML characters
    let processed = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 2. Strings "..." (Orange)
    processed = processed.replace(/(".*?")/g, '<span style="color:#ce9178">$1</span>');
    
    // 3. Comments #... (Green) - (?<!:) prevents matching color codes like #ce9178
    processed = processed.replace(/(?<!:)(#.*)/g, '<span style="color:#6a9955">$1</span>');

    // 4. Keywords (Blue)
    const keywords = ["def", "class", "if", "else", "elif", "return", "import", "from", "print", "for", "in", "and", "or", "not", "True", "False", "while", "break", "continue"];
    
    keywords.forEach(kw => {
       // Match keyword boundaries, ensure not inside an HTML tag
       const regex = new RegExp(`\\b(${kw})\\b(?![^<]*>)`, 'g');
       processed = processed.replace(regex, '<span style="color:#569cd6">$1</span>');
    });

    // 5. Numbers (Light Green) - (?<!#) prevents matching hex codes
    processed = processed.replace(/(?<!#)\b(\d+)\b/g, '<span style="color:#b5cea8">$1</span>');

    return processed;
  };

  return (
    <div style={{
      background: '#1e1e1e',
      border: '1px solid #333',
      borderRadius: '8px',
      overflow: 'visible', /* Important pour que le tooltip sorte du cadre à droite */
      fontFamily: 'Consolas, monospace',
      fontSize: '16px',
      lineHeight: '1.6',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      marginTop: '20px',
      position: 'relative'
    }}>
      {/* Header VS Code */}
      <div style={{ background: '#252526', padding: '5px 15px', fontSize: '12px', color: '#999', display: 'flex', gap: '10px', borderBottom: '1px solid #333' }}>
        <span style={{color: '#e0e0e0'}}>main.py</span>
        <span style={{marginLeft: 'auto'}}>Python 3.10</span>
      </div>

      <div style={{ padding: '20px 0', overflowX: 'auto' }}>
        {lines.map((rawLine, index) => {
          const lineNumber = index + 1;
          const explanation = explanations.find(e => e.line === lineNumber);
          
          return (
            <div 
              key={index}
              style={{
                position: 'relative',
                display: 'flex',
                cursor: explanation ? 'help' : 'default',
                transition: 'background 0.2s'
              }}
              className="code-line"
            >
              {/* Line Number */}
              <span style={{ 
                minWidth: '40px', 
                textAlign: 'right', 
                paddingRight: '15px', 
                color: '#858585', 
                userSelect: 'none',
                borderRight: '1px solid #333',
                marginRight: '10px'
              }}>
                {lineNumber}
              </span>

              {/* Code Content */}
              <span 
                style={{ color: '#d4d4d4', whiteSpace: 'pre' }}
                dangerouslySetInnerHTML={{ __html: highlightSyntax(rawLine) }} 
              />

              {/* TOOLTIP LOGIC (RIGHT SIDE) */}
              {explanation && (
                <>
                  <style jsx>{`
                    .code-line:hover { background-color: rgba(255, 255, 255, 0.08); }
                    .code-line:hover .tooltip-box { opacity: 1; visibility: visible; transform: translateX(10px); }
                  `}</style>
                  
                  <div className="tooltip-box" style={{
                    position: 'absolute',
                    /* POSITION "F JENB" (A DROITE) */
                    left: '100%',
                    top: '0',
                    
                    /* Style */
                    background: '#252526',
                    border: '1px solid #007acc',
                    borderLeft: '4px solid #007acc', /* Accentuation à gauche */
                    color: '#fff',
                    padding: '10px 15px',
                    borderRadius: '4px',
                    width: '300px', /* Largeur fixe pour que ce soit lisible */
                    zIndex: 100,
                    
                    /* Animation State Initiale */
                    opacity: 0,
                    visibility: 'hidden',
                    transform: 'translateX(0px)',
                    transition: 'all 0.2s ease',
                    pointerEvents: 'none',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
                    
                    /* Texte */
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    <strong style={{display:'block', color: '#007acc', fontSize:'12px', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'1px'}}>
                      💡 Explication Ligne {lineNumber}
                    </strong>
                    {explanation.text}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveCode;