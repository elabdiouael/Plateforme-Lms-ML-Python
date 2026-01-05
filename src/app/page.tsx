'use client';
import { useState, useEffect } from 'react';
import { slides, chapters } from '@/data/content';

// Import des Composants Modulaires
import Navbar from '@/components/Navbar';
import Landing from '@/components/Landing';
import Background from '@/components/ui/Background/Background';
import ExerciseSlide from '@/components/ui/ExerciseSlide/ExerciseSlide';
import InteractiveCode from '@/components/ui/InteractiveCode/InteractiveCode';
import TheorySlide from '@/components/ui/TheorySlide/TheorySlide'; // <-- NOUVEL IMPORT

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
    // Note: Assure-toi que tes clés 'chapters' correspondent à celles dans content.ts
    // Exemple : "Project Prepa" au lieu de juste "OOP" si tu as ajouté la nouvelle section
    if (index < chapters["Algorithmes"]) return 'exercise'; // Rouge
    if (index < chapters["Data Structures"]) return 'algorithms'; // Vert
    if (index < chapters["OOP"]) return 'lists'; // Bleu
    if (index < (chapters["Project Prepa"] || 999)) return 'oop'; // Violet
    return 'project'; // Cyan/Tech (Nouveau style pour le projet)
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
        {/* On peut garder Background ici ou laisser Landing gérer son propre fond */}
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

        {/* --- TYPE: THEORIE (BRIEFING DATA) --- */}
        {/* C'est ici qu'on a fait l'upgrade x1000 */}
        {currentSlide.type === 'theory' && (
          <TiltWrapper>
            <TheorySlide 
              data={currentSlide} 
              onNext={goNext} 
            />
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
                {/* Note: InteractiveCode gère son propre style de "card" via son module CSS */}
                 <InteractiveCode 
                   code={currentSlide.code} 
                   explanations={currentSlide.explanations} 
                   globalExplanation={currentSlide.globalExplanation} // Support du nouveau champ global
                 />
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

// Styles Boutons Responsive (Pour la navigation Code Interactif)
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