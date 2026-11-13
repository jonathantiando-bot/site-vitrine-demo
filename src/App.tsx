import React, { useState, useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PresentationSection } from './components/PresentationSection';
import { CulinarySelectionSection } from './components/CulinarySelectionSection';
import { UniverseSection } from './components/UniverseSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { restaurantConfig } from './config/restaurant.config';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('lecrin-theme');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch {
      // Fallback en mode jour chaleureux par défaut
    }
    return 'light';
  });

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('lecrin-theme', theme);
    } catch {
      // Ignore storage errors in private mode
    }
  }, [theme]);

  // Recalcul automatique de GSAP ScrollTrigger dès que la hauteur du contenu évolue
  // (par exemple lors du filtrage des catégories de plats au Chapitre II)
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl || typeof ResizeObserver === 'undefined') return;

    let timeoutId: number;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 60);
    });

    observer.observe(mainEl);
    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleToggleAudio = () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (isAudioPlaying) {
      audioEl.pause();
      setIsAudioPlaying(false);
    } else {
      audioEl.volume = 0.45;
      audioEl
        .play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch(() => {
          setIsAudioPlaying(false);
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50 dark:bg-espresso-950 text-espresso-900 dark:text-ivory-50 transition-colors duration-500">
      {/* Piste sonore d'ambiance gastronomique (ne démarre jamais seule avec volume) */}
      <audio
        ref={audioRef}
        src={restaurantConfig.heroMedia.ambientAudioTrack}
        loop
        preload="metadata"
      />

      {/* Navigation discrète et élégante */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Contenu principal en une seule page fluide */}
      <main ref={mainRef} className="flex-1">
        {/* SECTION 1 — Introduction Cinématographique */}
        <HeroSection
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
        />

        {/* SECTION 2 — Présentation du Restaurant */}
        <PresentationSection />

        {/* SECTION 3 — Notre Sélection Culinaire */}
        <CulinarySelectionSection />

        {/* SECTION 4 — L'Univers du Restaurant */}
        <UniverseSection />

        {/* SECTION 5 — Contact et Réseaux Sociaux */}
        <ContactSection />
      </main>

      {/* SECTION 6 — Pied de Page */}
      <Footer />
    </div>
  );
};

export default App;
