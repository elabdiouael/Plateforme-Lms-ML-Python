'use client';
import React, { useState, useEffect } from 'react';
import { slides, chapters } from '@/data/content';
import styles from './Navbar.module.css';

interface NavbarProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

export default function Navbar({ onNavigate, currentIndex }: NavbarProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  
  // --- SMART SCROLL LOGIC ---
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // Cache si on descend (> 100px), Affiche si on monte
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

  // --- DATA LOGIC ---
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
        // On combine Centrage Horizontal + Animation Verticale
        transform: `translateX(-50%) translateY(${isVisible ? '0' : '-150%'})`
      }}
    >
      {/* LOGO */}
      <div className={styles.logo} onClick={() => onNavigate(0)}>
        SEO<span>MANIAK</span>
      </div>

      {/* MENU */}
      <div className={styles.menu}>
        {sections.map(([name, startIndex], i) => {
          const nextStart = sections[i + 1]?.[1];
          const sectionItems = getSectionSlides(name, startIndex, nextStart);
          const isActive = currentIndex >= startIndex && (nextStart ? currentIndex < nextStart : true);

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
                {isActive && <div className={styles.activeIndicator} />}
              </button>

              {/* DROPDOWN */}
              {hoveredSection === name && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownHeader}>// {name.toUpperCase()}</div>
                    
                    <div className={styles.dropdownList}>
                      {sectionItems.map((item) => (
                        <div
                          key={item.globalIndex}
                          className={`${styles.dropdownItem} ${currentIndex === item.globalIndex ? styles.dropdownActive : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(item.globalIndex);
                            setHoveredSection(null);
                          }}
                        >
                          <span style={{ opacity: 0.5, marginRight: '8px' }}>
                            {item.type === 'exercise' ? '📝' : item.type === 'interactive-code' ? '⚡' : '📖'}
                          </span>
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

      {/* PROGRESS BAR */}
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }} 
        />
      </div>
    </nav>
  );
}