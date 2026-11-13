import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Volume2, VolumeX, Flame, Sparkles } from 'lucide-react';
import { restaurantConfig } from '../config/restaurant.config';

interface HeroSectionProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isAudioPlaying,
  onToggleAudio,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileViewport(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 26, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4 },
          '-=0.5'
        )
        .fromTo(
          sloganRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.1 },
          '-=0.8'
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.6'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="accueil"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-espresso-950 text-ivory-50 pt-20 pb-12 px-3 sm:px-6 lg:px-10"
    >
      {/* Grand cadre immersif cinématographique */}
      <div className="relative w-full max-w-[1440px] min-h-[85vh] sm:min-h-[88vh] rounded-2xl sm:rounded-3xl overflow-hidden border border-ivory-100/15 shadow-2xl flex flex-col justify-between">
        {/* Image de couverture (Poster) toujours présente immédiatement */}
        <img
          src={restaurantConfig.heroMedia.posterImage}
          alt={restaurantConfig.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 scale-105 ${
            videoReady ? 'opacity-30' : 'opacity-100'
          }`}
          fetchPriority="high"
        />

        {/* Vidéo culinaire plein cadre optimisée web & mobile */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={restaurantConfig.heroMedia.posterImage}
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          {isMobileViewport ? (
            <source
              src={restaurantConfig.heroMedia.videoMobileMp4}
              type="video/mp4"
            />
          ) : (
            <>
              <source
                src={restaurantConfig.heroMedia.videoWebm}
                type="video/webm"
              />
              <source
                src={restaurantConfig.heroMedia.videoMp4}
                type="video/mp4"
              />
            </>
          )}
        </video>

        {/* Voiles de contraste gastronomiques chauds */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/55 to-espresso-950/45 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(18,14,12,0.72)_100%)] pointer-events-none" />

        {/* Barre supérieure d'informations d'atmosphère dans le cadre */}
        <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8 text-xs text-ivory-200/80">
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-ochre-400" />
            <span className="uppercase tracking-[0.25em] text-[10px] sm:text-xs">
              {restaurantConfig.culinaryStyle}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-ivory-200/75">
            <span>EST. {restaurantConfig.establishedYear}</span>
            <span className="text-ochre-400">•</span>
            <span>COTONOU</span>
          </div>
        </div>

        {/* Cœur éditorial : Nom du restaurant révélé avec effet lumineux permanent, slogan & CTA */}
        <div className="relative z-10 my-auto px-6 sm:px-12 lg:px-20 py-12 max-w-4xl mx-auto text-center">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-espresso-900/65 border border-ochre-400/30 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-ochre-400" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-ochre-300 font-medium">
              Expérience Gastronomique &amp; Sensorielle
            </span>
          </div>

          <h1
            ref={titleRef}
            className="hero-luminous-title font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[5.6rem] font-semibold tracking-tight leading-[1.02] mb-6"
          >
            {restaurantConfig.name}
          </h1>

          <p
            ref={sloganRef}
            className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-ochre-300/95 font-normal leading-snug mb-5 max-w-2xl mx-auto"
          >
            « {restaurantConfig.slogan} »
          </p>

          <p
            ref={subtextRef}
            className="text-sm sm:text-base md:text-lg text-ivory-100/85 font-light leading-relaxed max-w-xl mx-auto mb-10"
          >
            {restaurantConfig.heroSubheadline}
          </p>

          {/* Bouton discret « Découvrir notre cuisine » + Contrôle sonore immersif */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <a
              href="#notre-cuisine"
              className="group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-ochre-600/90 hover:bg-ochre-500 text-ivory-50 border border-ochre-300/30 backdrop-blur-md transition-all duration-500 shadow-lg hover:shadow-ochre-600/25"
            >
              <span className="text-xs sm:text-sm uppercase tracking-[0.22em] font-medium">
                {restaurantConfig.heroCtaLabel}
              </span>
              <ArrowDown className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1" />
            </a>

            <button
              type="button"
              onClick={onToggleAudio}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-espresso-950/55 hover:bg-espresso-900/75 text-ivory-100 border border-ivory-100/25 backdrop-blur-md transition-all duration-300 text-xs uppercase tracking-[0.2em]"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-ochre-400" />
                  <span>Couper l’ambiance sonore</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-ochre-300" />
                  <span>Activer l’ambiance sonore</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Barre inférieure du cadre Hero */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-10 pb-6 sm:pb-8 text-xs text-ivory-200/75 border-t border-ivory-100/10 pt-4">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-olive-400 animate-pulse" />
            <span>{restaurantConfig.heroMedia.audioDescription}</span>
          </div>

          <a
            href="#le-restaurant"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ivory-200 hover:text-ochre-300 transition-colors"
          >
            <span>Explorer la Maison</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
