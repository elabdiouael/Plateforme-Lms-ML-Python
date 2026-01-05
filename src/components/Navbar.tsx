// src/components/Navbar.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { slides, chapters } from '@/data/content';
import styles from './Navbar.module.css';

interface NavbarProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

// --- CONFIGURATION DES SÉANCES ---
const SESSIONS = {
  S1: ["Exercices", "Algorithmes", "Data Structures", "OOP"],
  S2: ["Project Prepa", "Project DS"] // <-- 1. AJOUT DE PROJECT DS
};

export default function Navbar({ onNavigate, currentIndex }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  
  // State pour la Session (Par défaut S1)
  const [activeSession, setActiveSession] = useState<'S1' | 'S2'>('S1');
  
  // Smart Scroll Logic
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMobileOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isMobileOpen]);

  // --- LOGIC DE FILTRAGE ---
  const allSections = Object.entries(chapters);
  
  const visibleSections = allSections.filter(([name]) => 
    SESSIONS[activeSession].includes(name)
  );

  const getSectionSlides = (sectionName: string, startIndex: number) => {
    const keys = Object.keys(chapters);
    const keyIndex = keys.indexOf(sectionName);
    const nextKey = keys[keyIndex + 1];
    const realNextIndex = nextKey ? chapters[nextKey as keyof typeof chapters] : slides.length;

    return slides.slice(startIndex, realNextIndex).map((slide, localIdx) => ({
      globalIndex: startIndex + localIdx,
      title: slide.title || `Question ${slide.id}`,
      type: slide.type
    }));
  };

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* FIX ALIGNMENT: 
         1. justifyContent: 'flex-start' -> Bach kolchi ybda mn lisser.
         2. gap: '20px' -> Espace bin logo, switcher w menu.
      */}
      <nav 
        className={styles.nav}
        style={{ 
          transform: isVisible ? 'translate(-50%, 0)' : 'translate(-50%, -150%)',
          justifyContent: 'flex-start', 
          gap: '20px'
        }}
      >
        <div className={styles.logo} onClick={() => { onNavigate(0); setIsMobileOpen(false); }}>
          SEO<span>MANIAK</span>
        </div>

        {/* FIX SWITCHER: 
           marginRight: '0' (oula sghir) -> Bach maydfe3ch l-menu l ga3 3la limen.
           Kan-overrider l 'margin-right: auto' dyal CSS.
        */}
        <div className={styles.sessionSwitcher} style={{ marginRight: '10px' }}>
          <button 
            className={`${styles.sessionBtn} ${activeSession === 'S1' ? styles.sessionBtnActive : ''}`}
            onClick={() => setActiveSession('S1')}
          >
            S1: BASICS
          </button>
          <button 
            className={`${styles.sessionBtn} ${activeSession === 'S2' ? styles.sessionBtnActive : ''}`}
            onClick={() => setActiveSession('S2')}
          >
            S2: PROJECT
          </button>
        </div>

        {/* --- DESKTOP MENU --- */}
        <div className={styles.menu}>
          {visibleSections.map(([name, startIndex]) => {
            const sectionItems = getSectionSlides(name, startIndex);
            const keys = Object.keys(chapters);
            const keyIndex = keys.indexOf(name);
            const nextKey = keys[keyIndex + 1];
            const endIndex = nextKey ? chapters[nextKey as keyof typeof chapters] : slides.length;
            
            const isActive = currentIndex >= startIndex && currentIndex < endIndex;

            return (
              <div 
                key={name} 
                className={styles.itemContainer}
                onMouseEnter={() => setHoveredSection(name)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <button 
                  onClick={() => onNavigate(startIndex)}
                  className={`${styles.btn} ${isActive ? styles.activeBtn : ''}`}
                >
                  {name}
                </button>
                {hoveredSection === name && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownContent}>
                      <div className={styles.dropdownHeader}>// {name}_PROTOCOL</div>
                      <div className={styles.dropdownList}>
                        {sectionItems.map((item, idx) => (
                          <div
                            key={item.globalIndex}
                            style={{ animationDelay: `${idx * 0.05}s` }}
                            className={`${styles.dropdownItem} ${currentIndex === item.globalIndex ? styles.dropdownActive : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate(item.globalIndex);
                              setHoveredSection(null);
                            }}
                          >
                            <span className={styles.typeIcon}>{item.type === 'exercise' ? 'Q' : 'DOC'}</span>
                            {item.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FIX MOBILE HAMBURGER:
           marginLeft: 'auto' -> Bach f Mobile yb9a dima collé l limen
        */}
        <button 
          className={`${styles.hamburger} ${isMobileOpen ? styles.open : ''}`} 
          onClick={toggleMobile}
          style={{ marginLeft: 'auto' }}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }} />
        </div>
      </nav>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <div className={`${styles.mobileMenu} ${isMobileOpen ? styles.open : ''}`}>
        
        {/* Mobile Session Switcher */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
             <button 
                className={`${styles.sessionBtn} ${activeSession === 'S1' ? styles.sessionBtnActive : ''}`}
                onClick={() => setActiveSession('S1')}
                style={{ fontSize: '1.2rem', padding: '10px 20px' }}
              >
                S1: BASICS
              </button>
              <button 
                className={`${styles.sessionBtn} ${activeSession === 'S2' ? styles.sessionBtnActive : ''}`}
                onClick={() => setActiveSession('S2')}
                style={{ fontSize: '1.2rem', padding: '10px 20px' }}
              >
                S2: PROJECT
              </button>
        </div>

        {visibleSections.map(([name, startIndex]) => {
            const sectionItems = getSectionSlides(name, startIndex);
            
            const keys = Object.keys(chapters);
            const keyIndex = keys.indexOf(name);
            const nextKey = keys[keyIndex + 1];
            const endIndex = nextKey ? chapters[nextKey as keyof typeof chapters] : slides.length;
            const isActive = currentIndex >= startIndex && currentIndex < endIndex;
            
            const isExpanded = expandedMobileSection === name;

          return (
            <React.Fragment key={name}>
              <button 
                className={`${styles.mobileBtn} ${isActive ? styles.mobileBtnActive : ''}`}
                onClick={() => setExpandedMobileSection(isExpanded ? null : name)}
              >
                {name} {isExpanded ? '▲' : '▼'}
              </button>
              
              {isExpanded && (
                <div className={styles.mobileSubMenu}>
                  {sectionItems.map((item) => (
                    <div 
                      key={item.globalIndex}
                      className={`${styles.mobileSubItem} ${currentIndex === item.globalIndex ? styles.mobileSubItemActive : ''}`}
                      onClick={() => {
                        onNavigate(item.globalIndex);
                        setIsMobileOpen(false);
                      }}
                    >
                        • {item.title}
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}