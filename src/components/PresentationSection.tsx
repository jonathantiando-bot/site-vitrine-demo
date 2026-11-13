import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Utensils, Award } from 'lucide-react';
import { restaurantConfig } from '../config/restaurant.config';

gsap.registerPlugin(ScrollTrigger);

export const PresentationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const mainImgWrapRef = useRef<HTMLDivElement>(null);
  const secondaryImgWrapRef = useRef<HTMLDivElement>(null);
  const detailImgWrapRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Apparition progressive des éléments éditoriaux
      const textElements = textColRef.current?.querySelectorAll('.reveal-text');
      if (textElements && textElements.length > 0) {
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textColRef.current,
              start: 'top 82%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Révélation de la grande photo principale avec masque et zoom lent
      if (mainImgWrapRef.current) {
        const img = mainImgWrapRef.current.querySelector('img');
        gsap.fromTo(
          mainImgWrapRef.current,
          { opacity: 0, y: 48, clipPath: 'inset(12% 6% 12% 6% round 1.5rem)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mainImgWrapRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.14 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: mainImgWrapRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      }

      // Effet de profondeur (parallaxe doux) sur l'image secondaire et le médaillon
      if (secondaryImgWrapRef.current) {
        gsap.fromTo(
          secondaryImgWrapRef.current,
          { y: 45, opacity: 0 },
          {
            y: -25,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      }

      if (detailImgWrapRef.current) {
        gsap.fromTo(
          detailImgWrapRef.current,
          { y: 30, opacity: 0 },
          {
            y: -18,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }

      // Piliers distinctifs du restaurant
      const pillarCards = pillarsRef.current?.querySelectorAll('.pillar-card');
      if (pillarCards && pillarCards.length > 0) {
        gsap.fromTo(
          pillarCards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { presentation } = restaurantConfig;
  const pillarIcons = [Utensils, Flame, Award];

  return (
    <section
      id="le-restaurant"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-10 bg-ivory-50 dark:bg-espresso-950 text-espresso-900 dark:text-ivory-50 transition-colors duration-500 overflow-hidden editorial-grain"
    >
      {/* Halo décoratif subtil */}
      <div className="pointer-events-none absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-ochre-500/10 dark:bg-ochre-500/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-olive-700/10 dark:bg-olive-400/5 blur-3xl" />

      <div className="max-w-7xl mx-auto">
        {/* Grille éditoriale principale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Colonne gauche : Récit, philosophie et citation du Chef */}
          <div ref={textColRef} className="lg:col-span-6 space-y-7">
            <div className="reveal-text inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-ochre-600 dark:bg-ochre-400" />
              <span className="text-xs uppercase tracking-[0.28em] text-ochre-600 dark:text-ochre-400 font-semibold">
                {presentation.eyebrow}
              </span>
            </div>

            <h2 className="reveal-text font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-espresso-950 dark:text-ivory-50">
              {presentation.title}{' '}
              <span className="italic font-medium text-ochre-600 dark:text-ochre-400">
                {presentation.highlightedWord}
              </span>
              .
            </h2>

            <p className="reveal-text text-base sm:text-lg text-espresso-700 dark:text-ivory-200/90 leading-relaxed font-normal">
              {presentation.leadParagraph}
            </p>

            <p className="reveal-text text-sm sm:text-base text-espresso-600 dark:text-ivory-200/75 leading-relaxed">
              {presentation.secondParagraph}
            </p>

            {/* Encart Citation du Chef */}
            <blockquote className="reveal-text relative p-6 sm:p-8 rounded-2xl bg-ivory-100/90 dark:bg-espresso-900/90 border border-espresso-800/10 dark:border-ivory-100/10 shadow-sm">
              <p className="font-serif italic text-xl sm:text-2xl text-espresso-900 dark:text-ivory-100 leading-snug mb-4">
                {presentation.chefQuote}
              </p>
              <footer className="flex items-center justify-between text-xs">
                <div>
                  <strong className="block font-semibold uppercase tracking-[0.18em] text-ochre-700 dark:text-ochre-400">
                    {presentation.chefName}
                  </strong>
                  <span className="text-espresso-500 dark:text-ivory-200/60">
                    {presentation.chefRole}
                  </span>
                </div>
                <span className="font-serif italic text-2xl text-ochre-600/40 dark:text-ochre-400/40 select-none">
                  {restaurantConfig.monogram}
                </span>
              </footer>
            </blockquote>
          </div>

          {/* Colonne droite : Composition photographique asymétrique à 3 dimensions */}
          <div className="lg:col-span-6 relative">
            {/* Grande photographie principale de l'intérieur */}
            <div
              ref={mainImgWrapRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-espresso-800/10 dark:border-ivory-100/10 aspect-[4/5] sm:aspect-[5/6] w-full sm:w-[86%] ml-auto"
            >
              <img
                src={presentation.mainImage}
                alt={presentation.mainImageCaption}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-ivory-50">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ochre-300 block mb-1">
                  Architecture &amp; Lumière
                </span>
                <p className="font-serif italic text-base sm:text-lg text-ivory-100">
                  {presentation.mainImageCaption}
                </p>
              </div>
            </div>

            {/* Photographie secondaire en superposition (bas gauche) */}
            <div
              ref={secondaryImgWrapRef}
              className="mt-6 sm:mt-0 sm:absolute sm:-bottom-10 sm:left-0 sm:w-[54%] rounded-2xl overflow-hidden shadow-2xl border-4 border-ivory-50 dark:border-espresso-950 bg-espresso-900"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={presentation.secondaryImage}
                  alt={presentation.secondaryImageCaption}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-3.5 bg-ivory-100 dark:bg-espresso-900 text-xs">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-olive-700 dark:text-olive-300 block">
                  Savoir-Faire
                </span>
                <p className="text-espresso-700 dark:text-ivory-200/85 mt-0.5 line-clamp-2">
                  {presentation.secondaryImageCaption}
                </p>
              </div>
            </div>

            {/* Vignette détail de braise (haut gauche) */}
            <div
              ref={detailImgWrapRef}
              className="hidden sm:block absolute -top-8 left-2 w-40 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-ivory-50 dark:border-espresso-950"
            >
              <img
                src={presentation.detailImage}
                alt={presentation.detailImageCaption}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/75 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[10px] uppercase tracking-widest text-ochre-300 font-medium">
                  Feu d’Acacia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trois piliers distinctifs en bas de la section */}
        <div
          ref={pillarsRef}
          className="mt-24 sm:mt-32 pt-12 border-t border-espresso-800/15 dark:border-ivory-100/15 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {presentation.pillars.map((pillar, idx) => {
            const IconComponent = pillarIcons[idx % pillarIcons.length];
            return (
              <div
                key={pillar.number}
                className="pillar-card group p-7 rounded-2xl bg-ivory-100/70 dark:bg-espresso-900/60 border border-espresso-800/10 dark:border-ivory-100/10 hover:border-ochre-500/40 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs tracking-[0.25em] text-ochre-600 dark:text-ochre-400">
                    /{pillar.number}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-olive-800/10 dark:bg-olive-400/10 text-olive-800 dark:text-olive-300 flex items-center justify-center group-hover:bg-ochre-600 group-hover:text-ivory-50 transition-colors duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-espresso-900 dark:text-ivory-50 mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-espresso-600 dark:text-ivory-200/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
