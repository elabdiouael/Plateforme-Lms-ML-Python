'use client';
import { useState } from 'react';
import { slides, chapters } from '@/data/content';

// Import des Composants Modulaires
import Navbar from '@/components/Navbar';
import Landing from '@/components/Landing';
import Background from '@/components/ui/Background/Background';
import ExerciseSlide from '@/components/ui/ExerciseSlide/ExerciseSlide';
import InteractiveCode from '@/components/ui/InteractiveCode/InteractiveCode';
import Typewriter from '@/components/ui/Typewriter';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  
  const currentSlide = slides[index];

  // --- LOGIC: Déterminer la section pour le Background ---
  const getSectionType = () => {
    if (index < chapters["Algorithmes"]) return 'exercise'; // Rouge
    if (index < chapters["Data Structures"]) return 'algorithms'; // Vert
    if (index < chapters["OOP"]) return 'lists'; // Bleu
    return 'oop'; // Violet
  };

  // --- NAVIGATION ---
  const handleNavigate = (newIndex: number) => {
    setIndex(newIndex);
    window.scrollTo(0, 0);
  };

  const goNext = () => {
    if (index < slides.length - 1) handleNavigate(index + 1);
  };

  const goPrev = () => {
    if (index > 0) handleNavigate(index - 1);
  };

  // --- RENDU: LANDING PAGE ---
  if (!started) {
    return (
      <main>
        <Background /> {/* Le fond 3D tourne en arrière plan */}
        <Landing onStart={() => setStarted(true)} />
      </main>
    );
  }

  // --- RENDU: LMS INTERFACE ---
  return (
    <main style={{ 
      minHeight: '100vh', 
      color: '#d4d4d4',
      paddingTop: '80px', // Espace pour la Navbar
      paddingBottom: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    }}>
      
      {/* 1. Background Dynamique */}
      {/* On peut passer une prop 'section' si Background le supporte, ex: section={getSectionType()} */}
      <Background /> 

      {/* 2. Navbar Fixe */}
      <Navbar onNavigate={handleNavigate} currentIndex={index} />

      {/* 3. CONTENT AREA */}
      <div style={{ width: '100%', maxWidth: '1000px', padding: '0 20px', zIndex: 1 }}>
        
        {/* --- TYPE: EXERCICE --- */}
        {currentSlide.type === 'exercise' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ExerciseSlide 
              key={currentSlide.id} // Key force le reset du state entre les questions
              data={currentSlide} 
              onNext={goNext} 
            />
          </div>
        )}

        {/* --- TYPE: THEORIE (Mise à jour avec Logique Rouge) --- */}
        {currentSlide.type === 'theory' && (
          <div className="glass-panel" style={{ 
            padding: '40px', 
            borderRadius: '16px', 
            background: 'rgba(20, 20, 20, 0.6)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'left', // Align left pour lecture
            animation: 'fadeIn 0.5s'
          }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '30px', 
              textAlign: 'center',
              background: 'linear-gradient(to right, #fff, #999)', 
              WebkitBackgroundClip: 'text', 
              color: 'transparent' 
            }}>
              {currentSlide.title}
            </h1>
            
            <div style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '40px' }}>
              {/* LOGIQUE: Parser ligne par ligne pour trouver les **Titres** */}
              {currentSlide.content.split('\n').map((line: string, i: number) => {
                const cleanLine = line.trim();
                // Si la ligne commence par ** (Markdown Bold), on la traite comme un Titre Rouge
                const isHeader = cleanLine.startsWith('**');
                // On enlève les ** pour l'affichage
                const textToShow = cleanLine.replace(/\*\*/g, '');

                if (!textToShow) return <br key={i} />; // Ligne vide

                return (
                  <div key={i} style={{ 
                    marginBottom: isHeader ? '10px' : '5px',
                    marginTop: isHeader ? '25px' : '0'
                  }}>
                    <Typewriter 
                      text={textToShow} 
                      speed={5} 
                      // COULEUR: Rouge (#ff4757) si titre, Blanc cassé (#eee) sinon
                      color={isHeader ? '#ff4757' : '#eee'} 
                    />
                    {isHeader && (
                      <div style={{ 
                        width: '40px', 
                        height: '2px', 
                        background: '#ff4757', 
                        marginTop: '5px', 
                        opacity: 0.5,
                        boxShadow: '0 0 10px #ff4757'
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
               {index > 0 && (
                <button onClick={goPrev} style={btnSecondary}>← Retour</button>
              )}
              <button onClick={goNext} style={btnPrimary}>
                Voir le Code →
              </button>
            </div>
          </div>
        )}

        {/* --- TYPE: CODE INTERACTIF --- */}
        {currentSlide.type === 'interactive-code' && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <h2 style={{ color: '#fff', fontSize: '1.8rem', fontFamily: 'Consolas' }}>
                {currentSlide.title}
              </h2>
              <span style={{ fontSize: '0.8rem', background: '#333', padding: '4px 8px', borderRadius: '4px', border: '1px solid #555' }}>
                Interactif ⚡
              </span>
            </div>
            
            {/* Le nouveau composant Split View */}
            <InteractiveCode 
              code={currentSlide.code} 
              explanations={currentSlide.explanations} 
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
              <button onClick={goPrev} style={btnSecondary}>← Retour</button>
              <button onClick={goNext} style={btnPrimary}>Suivant →</button>
            </div>
          </div>
        )}

      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}

// Styles Boutons
const btnPrimary = {
  padding: '12px 30px', fontSize: '1rem', background: '#007acc', 
  color: 'white', border: 'none', borderRadius: '6px', 
  cursor: 'pointer', fontFamily: 'Consolas', fontWeight: 'bold',
  boxShadow: '0 5px 15px rgba(0, 122, 204, 0.3)',
  transition: 'transform 0.2s'
};

const btnSecondary = {
  padding: '12px 30px', fontSize: '1rem', background: 'transparent', 
  color: '#aaa', border: '1px solid #444', borderRadius: '6px', 
  cursor: 'pointer', fontFamily: 'Consolas',
  transition: 'background 0.2s'
};