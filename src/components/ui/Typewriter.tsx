'use client';
import { useState, useEffect } from 'react';

export default function Typewriter({ text, speed = 30, color = '#d4d4d4' }: { text: string, speed?: number, color?: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset quand le texte change
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span style={{ color: color, fontFamily: 'Consolas, monospace', lineHeight: '1.6' }}>
      {displayedText}
      <span style={{ animation: 'blink 1s step-end infinite', color: '#007acc' }}>|</span>
      <style jsx>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </span>
  );
}