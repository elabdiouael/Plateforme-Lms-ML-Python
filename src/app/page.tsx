'use client';
import { useState, useEffect } from 'react';
import { slides, chapters } from '@/data/content';

// Import des Composants Modulaires
import Navbar from '@/components/Navbar';
import Landing from '@/components/Landing';
import Background from '@/components/ui/Background/Background';
import ExerciseSlide from '@/components/ui/ExerciseSlide/ExerciseSlide';
import InteractiveCode from '@/components/ui/InteractiveCode/InteractiveCode';
import Typewriter from '@/components/ui/Typewriter';

// 👇 Moteur 3D & Effets
import TiltWrapper from '@/components/ui/3D/TiltWrapper';
import ClickRipple from '@/components/ui/Effects/ClickRipple';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const currentSlide = slides[index];

  // --- RESPONSIVE CHECK ---
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        <Background section="landing" /> 
        <Landing onStart={() => setStarted(true)} />
      </main>
    );
  }

  // --- RENDU: LMS INTERFACE ---
  return (
    <main style={{ 
      minHeight: '100vh', 
      color: '#d4d4d4',
      // 👇 Padding dynamique: 100px f Mobile, 140px f Desktop
      paddingTop: isMobile ? '100px' : '140px', 
      paddingBottom: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflowX: 'hidden' 
    }}>
      
      {/* 1. Background Dynamique */}
      <Background section={getSectionType()} /> 

      {/* 2. Effet Ripple (Shockwave) */}
      <ClickRipple />

      {/* 3. Navbar Fixe (HUD Style + Burger Mobile) */}
      <Navbar onNavigate={handleNavigate} currentIndex={index} />

      {/* 4. CONTENT AREA */}
      <div style={{ width: '100%', maxWidth: '1000px', padding: '0 20px', zIndex: 1 }}>
        
        {/* --- TYPE: EXERCICE --- */}
        {currentSlide.type === 'exercise' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <TiltWrapper>
              <ExerciseSlide 
                key={currentSlide.id}
                data={currentSlide} 
                onNext={goNext} 
              />
            </TiltWrapper>
          </div>
        )}

        {/* --- TYPE: THEORIE --- */}
        {currentSlide.type === 'theory' && (
          <TiltWrapper>
            <div className="glass-panel" style={{ 
              padding: isMobile ? '25px' : '40px', 
              borderRadius: '16px', 
              background: 'rgba(20, 20, 20, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'left',
              animation: 'fadeIn 0.5s',
              height: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
              <h1 style={{ 
                fontSize: isMobile ? '1.8rem' : '2.5rem', 
                marginBottom: '30px', 
                textAlign: 'center',
                background: 'linear-gradient(to right, #fff, #999)', 
                WebkitBackgroundClip: 'text', 
                color: 'transparent',
                textShadow: '0 0 30px rgba(255,255,255,0.1)'
              }}>
                {currentSlide.title}
              </h1>
              
              <div style={{ fontSize: isMobile ? '1rem' : '1.2rem', lineHeight: '1.8', marginBottom: '40px' }}>
                {currentSlide.content.split('\n').map((line: string, i: number) => {
                  const cleanLine = line.trim();
                  const isHeader = cleanLine.startsWith('**');
                  const textToShow = cleanLine.replace(/\*\*/g, '');

                  if (!textToShow) return <br key={i} />;

                  return (
                    <div key={i} style={{ 
                      marginBottom: isHeader ? '10px' : '5px',
                      marginTop: isHeader ? '25px' : '0'
                    }}>
                      <Typewriter 
                        text={textToShow} 
                        speed={5} 
                        color={isHeader ? '#ff4757' : '#eee'} 
                      />
                      {isHeader && (
                        <div style={{ 
                          width: '40px', 
                          height: '2px', 
                          background: '#ff4757', 
                          marginTop: '5px', 
                          opacity: 0.8,
                          boxShadow: '0 0 10px #ff4757'
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                 {index > 0 && (
                  <button onClick={goPrev} style={btnSecondary}>← Retour</button>
                )}
                <button onClick={goNext} style={btnPrimary}>
                  Voir le Code →
                </button>
              </div>
            </div>
          </TiltWrapper>
        )}

        {/* --- TYPE: CODE INTERACTIF --- */}
        {currentSlide.type === 'interactive-code' && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <h2 style={{ color: '#fff', fontSize: isMobile ? '1.4rem' : '1.8rem', fontFamily: 'Consolas' }}>
                {currentSlide.title}
              </h2>
              <span style={{ 
                fontSize: '0.8rem', 
                background: 'rgba(0, 243, 255, 0.1)', 
                color: '#00f3ff',
                padding: '4px 8px', 
                borderRadius: '4px', 
                border: '1px solid rgba(0, 243, 255, 0.3)',
                boxShadow: '0 0 10px rgba(0, 243, 255, 0.2)'
              }}>
                Interactif ⚡
              </span>
            </div>
            
            <TiltWrapper>
               <div style={{ 
                 background: '#1e1e1e', 
                 borderRadius: '12px', 
                 overflow: 'hidden',
                 border: '1px solid #333',
                 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
               }}>
                  <InteractiveCode 
                    code={currentSlide.code} 
                    explanations={currentSlide.explanations} 
                  />
               </div>
            </TiltWrapper>
            
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

// Styles Boutons Responsive
const btnPrimary = {
  padding: '12px 30px', fontSize: '1rem', background: '#007acc', 
  color: 'white', border: 'none', borderRadius: '6px', 
  cursor: 'pointer', fontFamily: 'Consolas', fontWeight: 'bold',
  boxShadow: '0 0 20px rgba(0, 122, 204, 0.4)',
  transition: 'all 0.2s',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  flex: '1 1 auto', // Responsive
  minWidth: '150px'
};

const btnSecondary = {
  padding: '12px 30px', fontSize: '1rem', background: 'transparent', 
  color: '#aaa', border: '1px solid #444', borderRadius: '6px', 
  cursor: 'pointer', fontFamily: 'Consolas',
  transition: 'all 0.2s',
  flex: '1 1 auto',
  minWidth: '120px'
};