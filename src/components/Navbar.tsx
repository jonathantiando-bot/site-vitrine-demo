import React, { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX, MessageCircle, Menu, X, Sparkles } from 'lucide-react';
import { restaurantConfig, getWhatsAppLink } from '../config/restaurant.config';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Le restaurant', href: '#le-restaurant' },
  { label: 'Notre cuisine', href: '#notre-cuisine' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);

      const sectionIds = ['accueil', 'le-restaurant', 'notre-cuisine', 'galerie', 'contact'];
      const scrollPosition = window.scrollY + 240;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquer le défilement d'arrière-plan uniquement quand le tiroir mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-ivory-50/90 dark:bg-espresso-950/90 backdrop-blur-md border-b border-espresso-800/10 dark:border-ivory-100/10 shadow-sm'
            : 'py-5 bg-gradient-to-b from-espresso-950/75 via-espresso-950/35 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* Logo & Identité */}
          <a
            href="#accueil"
            className="group flex items-center gap-3.5 focus:outline-none"
            aria-label={restaurantConfig.name}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
                isScrolled
                  ? 'border-ochre-600/50 bg-ivory-100 dark:bg-espresso-900 text-ochre-600 dark:text-ochre-400'
                  : 'border-ivory-100/40 bg-espresso-950/40 text-ochre-300 backdrop-blur-sm'
              }`}
            >
              <span className="font-serif text-lg font-semibold tracking-wider">
                {restaurantConfig.monogram}
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-xl sm:text-2xl tracking-wide font-semibold transition-colors duration-300 ${
                  isScrolled
                    ? 'text-espresso-900 dark:text-ivory-50'
                    : 'text-ivory-50'
                }`}
              >
                {restaurantConfig.name}
              </span>
              <span
                className={`text-[10px] uppercase tracking-[0.25em] hidden sm:block transition-colors duration-300 ${
                  isScrolled
                    ? 'text-espresso-600 dark:text-ivory-200/70'
                    : 'text-ivory-200/80'
                }`}
              >
                Haute Braise &amp; Terroir
              </span>
            </div>
          </a>

          {/* Liens de navigation Desktop */}
          <nav
            aria-label="Navigation principale"
            className="hidden lg:flex items-center gap-8"
          >
            {navLinks.map((link) => {
              const sectionKey = link.href.replace('#', '');
              const isActive = activeSection === sectionKey;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-sm tracking-wide font-medium transition-colors duration-300 ${
                    isScrolled
                      ? isActive
                        ? 'text-ochre-600 dark:text-ochre-400'
                        : 'text-espresso-800/80 hover:text-espresso-950 dark:text-ivory-100/80 dark:hover:text-ivory-50'
                      : isActive
                      ? 'text-ochre-300'
                      : 'text-ivory-100/85 hover:text-ivory-50'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-ochre-500 transition-all duration-500 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Actions : Son, Thème Jour/Nuit, WhatsApp Discret & Menu Mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Contrôle sonore d'ambiance */}
            <button
              type="button"
              onClick={onToggleAudio}
              title={
                isAudioPlaying
                  ? "Couper l'ambiance sonore"
                  : "Activer l'ambiance sonore gastronomique"
              }
              aria-label={
                isAudioPlaying
                  ? "Couper l'ambiance sonore"
                  : "Activer l'ambiance sonore gastronomique"
              }
              className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-medium transition-all duration-300 ${
                isScrolled
                  ? 'border-espresso-800/15 dark:border-ivory-100/15 bg-ivory-100/70 dark:bg-espresso-900/70 text-espresso-800 dark:text-ivory-100 hover:border-ochre-500/50'
                  : 'border-ivory-100/25 bg-espresso-950/45 text-ivory-100 hover:bg-espresso-900/60 backdrop-blur-sm'
              }`}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-ochre-500" />
                  <span className="hidden xl:inline text-[11px] tracking-wider uppercase">
                    Son actif
                  </span>
                  <span className="flex items-end gap-[2px] h-3.5 px-0.5">
                    <span className="w-[2px] bg-ochre-500 rounded-full sound-bar-1" />
                    <span className="w-[2px] bg-ochre-500 rounded-full sound-bar-2" />
                    <span className="w-[2px] bg-ochre-500 rounded-full sound-bar-3" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 opacity-75" />
                  <span className="hidden xl:inline text-[11px] tracking-wider uppercase opacity-80">
                    Ambiance
                  </span>
                </>
              )}
            </button>

            {/* Sélecteur de Thème Jour / Nuit */}
            <button
              type="button"
              onClick={onToggleTheme}
              title={
                theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit'
              }
              aria-label={
                theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit'
              }
              className={`p-2.5 rounded-full border transition-all duration-300 ${
                isScrolled
                  ? 'border-espresso-800/15 dark:border-ivory-100/15 bg-ivory-100/70 dark:bg-espresso-900/70 text-espresso-800 dark:text-ivory-100 hover:border-ochre-500/50'
                  : 'border-ivory-100/25 bg-espresso-950/45 text-ivory-100 hover:bg-espresso-900/60 backdrop-blur-sm'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-ochre-400 transition-transform duration-500 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-500 rotate-0 hover:-rotate-12" />
              )}
            </button>

            {/* Bouton WhatsApp discret */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                isScrolled
                  ? 'bg-olive-800 hover:bg-olive-700 text-ivory-50 dark:bg-ochre-600 dark:hover:bg-ochre-500 dark:text-ivory-50 shadow-sm'
                  : 'bg-ivory-50/15 hover:bg-ivory-50/25 text-ivory-50 border border-ivory-100/30 backdrop-blur-md'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Bouton d'ouverture du menu mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={mobileMenuOpen}
              className={`lg:hidden p-2.5 rounded-full border transition-colors ${
                isScrolled
                  ? 'border-espresso-800/15 dark:border-ivory-100/15 text-espresso-900 dark:text-ivory-50'
                  : 'border-ivory-100/30 bg-espresso-950/40 text-ivory-50 backdrop-blur-sm'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile avec ouverture et fermeture animées */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Fond sombre flouté */}
        <div
          className="absolute inset-0 bg-espresso-950/75 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Panneau latéral éditorial */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-ivory-50 dark:bg-espresso-900 text-espresso-900 dark:text-ivory-50 shadow-2xl border-l border-espresso-800/10 dark:border-ivory-100/10 flex flex-col justify-between p-7 transition-transform duration-500 ease-editorial ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* En-tête du menu mobile */}
          <div className="flex items-center justify-between border-b border-espresso-800/10 dark:border-ivory-100/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-ochre-600/50 flex items-center justify-center text-ochre-600 dark:text-ochre-400 font-serif font-semibold">
                {restaurantConfig.monogram}
              </div>
              <div>
                <p className="font-serif text-xl font-semibold">
                  {restaurantConfig.name}
                </p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-espresso-600 dark:text-ivory-200/70">
                  {restaurantConfig.culinaryStyle}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Fermer le menu"
              className="p-2 rounded-full border border-espresso-800/15 dark:border-ivory-100/15 hover:border-ochre-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Liens de navigation mobile */}
          <nav className="my-auto py-8 flex flex-col gap-5">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-baseline gap-4 py-1.5 border-b border-espresso-800/5 dark:border-ivory-100/5"
              >
                <span className="font-mono text-xs text-ochre-600 dark:text-ochre-400">
                  0{index + 1}
                </span>
                <span className="font-serif text-3xl font-medium group-hover:text-ochre-600 dark:group-hover:text-ochre-400 group-hover:translate-x-2 transition-all duration-300">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Pied du menu mobile : Thème, Son et WhatsApp */}
          <div className="space-y-4 pt-5 border-t border-espresso-800/10 dark:border-ivory-100/10">
            <div className="flex items-center justify-between text-xs text-espresso-600 dark:text-ivory-200/80">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-ochre-500" />
                {restaurantConfig.contact.addressLine1}
              </span>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 px-5 rounded-full bg-olive-800 hover:bg-olive-700 dark:bg-ochre-600 dark:hover:bg-ochre-500 text-ivory-50 flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Nous écrire sur WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
