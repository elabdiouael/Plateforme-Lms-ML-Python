'use client';
import React, { useState, useEffect } from 'react';
import { slides, chapters } from '@/data/content';
import styles from './Navbar.module.css';

interface NavbarProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

export default function Navbar({ onNavigate, currentIndex }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null); // Pour l'accordéon mobile
  
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

  const sections = Object.entries(chapters);

  const getSectionSlides = (sectionName: string, startIndex: number, nextIndex?: number) => {
    const endIndex = nextIndex ?? slides.length;
    return slides.slice(startIndex, endIndex).map((slide, localIdx) => ({
      globalIndex: startIndex + localIdx,
      title: slide.title || `Question ${slide.id}`,
      type: slide.type
    }));
  };

  // Toggle Mobile Menu
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      <nav 
        className={styles.nav}
        style={{ transform: isVisible ? 'translate(-50%, 0)' : 'translate(-50%, -150%)' }}
      >
        <div className={styles.logo} onClick={() => { onNavigate(0); setIsMobileOpen(false); }}>
          SEO<span>MANIAK</span>
        </div>

        {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
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

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        <button 
          className={`${styles.hamburger} ${isMobileOpen ? styles.open : ''}`} 
          onClick={toggleMobile}
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
        {sections.map(([name, startIndex], i) => {
          const nextStart = sections[i + 1]?.[1];
          const sectionItems = getSectionSlides(name, startIndex, nextStart);
          const isActive = currentIndex >= startIndex && (nextStart ? currentIndex < nextStart : true);
          const isExpanded = expandedMobileSection === name;

          return (
            <React.Fragment key={name}>
              <button 
                className={`${styles.mobileBtn} ${isActive ? styles.mobileBtnActive : ''}`}
                onClick={() => setExpandedMobileSection(isExpanded ? null : name)}
              >
                {name} {isExpanded ? '▲' : '▼'}
              </button>
              
              {/* Accordéon Mobile */}
              {isExpanded && (
                <div className={styles.mobileSubMenu}>
                  {sectionItems.map((item) => (
                    <div 
                      key={item.globalIndex}
                      className={`${styles.mobileSubItem} ${currentIndex === item.globalIndex ? styles.mobileSubItemActive : ''}`}
                      onClick={() => {
                        onNavigate(item.globalIndex);
                        setIsMobileOpen(false); // Ferme le menu après clic
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