import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import { restaurantConfig } from '../config/restaurant.config';

gsap.registerPlugin(ScrollTrigger);

export const UniverseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.universe-card');
      if (items && items.length > 0) {
        items.forEach((card) => {
          const img = card.querySelector('img');

          // Apparition fluide et fiable même après redimensionnement de la section précédente
          gsap.fromTo(
            card,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                invalidateOnRefresh: true,
                toggleActions: 'play none none none',
              },
            }
          );

          // Parallaxe très léger sur l'image interne
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -4, scale: 1.08 },
              {
                yPercent: 4,
                scale: 1.02,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { universe } = restaurantConfig;

  return (
    <section
      id="galerie"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-10 bg-ivory-50 dark:bg-espresso-950 text-espresso-900 dark:text-ivory-50 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* En-tête de la galerie d'univers */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-ochre-600 dark:bg-ochre-400" />
            <span className="text-xs uppercase tracking-[0.28em] text-ochre-600 dark:text-ochre-400 font-semibold">
              {universe.eyebrow}
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight">
            {universe.title}
          </h2>

          <p className="text-base sm:text-lg text-espresso-600 dark:text-ivory-200/80 leading-relaxed">
            {universe.description}
          </p>
        </div>

        {/* Mosaïque photographique immersive avec effet de profondeur */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 auto-rows-[280px] sm:auto-rows-[330px] gap-6 lg:gap-7"
        >
          {universe.photos.map((photo, index) => (
            <figure
              key={photo.id}
              className={`universe-card group relative rounded-3xl overflow-hidden border border-espresso-800/10 dark:border-ivory-100/10 shadow-lg bg-espresso-900 ${photo.spanClass}`}
            >
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                onLoad={() => ScrollTrigger.refresh()}
                className="w-full h-full object-cover object-center transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Catégorie en haut */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] bg-espresso-950/65 text-ochre-300 border border-ivory-100/15 backdrop-blur-md">
                  <Sparkles className="w-3 h-3 text-ochre-400" />
                  {photo.category}
                </span>
                <span className="font-mono text-xs text-ivory-200/70">
                  0{index + 1}
                </span>
              </div>

              {/* Légende en bas */}
              <figcaption className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-ivory-50 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-1.5">
                  {photo.title}
                </h3>
                <p className="text-xs sm:text-sm text-ivory-200/85 max-w-md leading-relaxed">
                  {photo.subtitle}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
