'use client';
import React, { useState, useEffect, useRef } from 'react';
import { slides, chapters } from '@/data/content';
import styles from './Navbar.module.css';

interface NavbarProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

export default function Navbar({ onNavigate, currentIndex }: NavbarProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Ref pour le Timer de sécurité (Anti-Flicker)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- SMART SCROLL ---
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // --- SAFE HOVER LOGIC ---
  const handleMouseEnter = (sectionName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredSection(sectionName);
  };

  const handleMouseLeave = () => {
    // On attend 300ms avant de fermer. Si l'utilisateur revient, on annule.
    timeoutRef.current = setTimeout(() => {
      setHoveredSection(null);
    }, 300); // <-- LE DELAI MAGIQUE ⏳
  };

  const sections = Object.entries(chapters);

  const getSectionSlides = (sectionName: string, startIndex: number, nextIndex?: number) => {
    const endIndex = nextIndex ?? slides.length;
    return slides.slice(startIndex, endIndex).map((slide, localIdx) => ({
      globalIndex: startIndex + localIdx,
      title: slide.title || `Question ${slide.id}`,
      type: slide.type
    }));
  };

  return (
    <nav 
      className={styles.nav}
      style={{
        transform: isVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-150%)'
      }}
    >
      <div className={styles.logo} onClick={() => onNavigate(0)}>
        SEO<span>MANIAK</span>
      </div>

      <div className={styles.menu}>
        {sections.map(([name, startIndex], i) => {
          const nextStart = sections[i + 1]?.[1];
          const sectionItems = getSectionSlides(name, startIndex, nextStart);
          const isActive = currentIndex >= startIndex && (nextStart ? currentIndex < nextStart : true);

          return (
            <div 
              key={name} 
              className={styles.itemContainer}
              // On applique le Safe Hover sur tout le conteneur
              onMouseEnter={() => handleMouseEnter(name)}
              onMouseLeave={handleMouseLeave}
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
                    <div className={styles.dropdownHeader}>
                      // {name}_PROTOCOL <span className={styles.pulse}>●</span>
                    </div>
                    
                    <div className={styles.dropdownList}>
                      {sectionItems.map((item, idx) => {
                        const isItemActive = currentIndex === item.globalIndex;
                        return (
                          <div
                            key={item.globalIndex}
                            // On ajoute un index pour l'animation décalée (Stagger)
                            style={{ animationDelay: `${idx * 0.05}s` }}
                            className={`${styles.dropdownItem} ${isItemActive ? styles.dropdownActive : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate(item.globalIndex);
                              setHoveredSection(null);
                            }}
                          >
                            <span className={styles.typeIcon}>
                              {item.type === 'exercise' ? 'Q' : item.type === 'interactive-code' ? 'DEV' : 'DOC'}
                            </span>
                            {item.title}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }} />
      </div>
    </nav>
  );
}