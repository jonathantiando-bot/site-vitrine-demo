import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Flame,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
} from 'lucide-react';
import {
  restaurantConfig,
  DishCategoryKey,
  DishItem,
} from '../config/restaurant.config';

gsap.registerPlugin(ScrollTrigger);

export const CulinarySelectionSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DishCategoryKey>('all');
  const [selectedDishModal, setSelectedDishModal] = useState<DishItem | null>(
    null
  );

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);

  const signatureDishes = restaurantConfig.dishes.filter(
    (d) => d.isChefSignature
  );

  const filteredDishes =
    activeCategory === 'all'
      ? restaurantConfig.dishes
      : restaurantConfig.dishes.filter((d) => d.category === activeCategory);

  const currentCategoryObj = restaurantConfig.categories.find(
    (c) => c.key === activeCategory
  );

  // Animations GSAP pour l'en-tête et le ruban horizontal animé au défilement
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.menu-header-anim'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              invalidateOnRefresh: true,
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Défilement horizontal doux lié au scroll (sans bloquer la page)
      if (horizontalTrackRef.current && horizontalWrapperRef.current) {
        gsap.fromTo(
          horizontalTrackRef.current,
          { x: 0 },
          {
            x: () => {
              const isDesktop = window.innerWidth >= 1024;
              return isDesktop ? -160 : -50;
            },
            ease: 'none',
            scrollTrigger: {
              trigger: horizontalWrapperRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animation de transition lors du changement de catégorie + recalcul immédiat de ScrollTrigger
  // pour que les Chapitres III (Galerie) et IV (Contact) restent toujours complets et visibles
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion && galleryGridRef.current) {
      const cards = galleryGridRef.current.querySelectorAll(
        '.dish-editorial-card'
      );
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          overwrite: 'auto',
          onComplete: () => {
            ScrollTrigger.refresh();
          },
        }
      );
    }

    // Rafraîchir les positions de défilement dès la mise à jour du DOM
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    const timerId = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timerId);
    };
  }, [activeCategory]);

  const scrollHorizontal = (direction: 'left' | 'right') => {
    if (!horizontalWrapperRef.current) return;
    const container = horizontalWrapperRef.current;
    const amount = direction === 'left' ? -420 : 420;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section
      id="notre-cuisine"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36 bg-ivory-100/80 dark:bg-espresso-900/70 text-espresso-900 dark:text-ivory-50 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* En-tête de la section */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl space-y-4">
            <div className="menu-header-anim inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-ochre-600 dark:bg-ochre-400" />
              <span className="text-xs uppercase tracking-[0.28em] text-ochre-600 dark:text-ochre-400 font-semibold">
                Chapitre II — Notre Sélection Culinaire
              </span>
            </div>
            <h2 className="menu-header-anim font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.06] tracking-tight">
              Les créations de la{' '}
              <span className="italic font-medium text-ochre-600 dark:text-ochre-400">
                carte
              </span>
            </h2>
          </div>

          <p className="menu-header-anim text-sm sm:text-base text-espresso-600 dark:text-ivory-200/80 max-w-md leading-relaxed">
            Une collection de plats façonnés autour du feu de bois, des arrivages
            côtiers et des jardins aromatiques. Chaque assiette est dressée à la
            minute.
          </p>
        </div>

        {/* PARTIE 1 : Galerie Horizontale Animée — « Les Signatures du Chef » */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-ochre-600 dark:text-ochre-400" />
              <h3 className="font-serif italic text-2xl sm:text-3xl text-espresso-900 dark:text-ivory-100">
                Défilement Panoramique — Les Signatures de la Maison
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollHorizontal('left')}
                aria-label="Faire défiler vers la gauche"
                className="p-2.5 rounded-full border border-espresso-800/15 dark:border-ivory-100/15 hover:border-ochre-500 text-espresso-800 dark:text-ivory-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollHorizontal('right')}
                aria-label="Faire défiler vers la droite"
                className="p-2.5 rounded-full border border-espresso-800/15 dark:border-ivory-100/15 hover:border-ochre-500 text-espresso-800 dark:text-ivory-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={horizontalWrapperRef}
            className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar"
          >
            <div
              ref={horizontalTrackRef}
              className="flex gap-6 min-w-max pr-12"
            >
              {signatureDishes.map((dish, index) => (
                <article
                  key={`sig-${dish.id}`}
                  onClick={() => setSelectedDishModal(dish)}
                  className="group relative w-[300px] sm:w-[370px] lg:w-[410px] h-[440px] sm:h-[470px] rounded-3xl overflow-hidden cursor-pointer border border-espresso-800/10 dark:border-ivory-100/10 shadow-xl flex-shrink-0"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/35 to-transparent" />

                  {/* Badge supérieur */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] bg-espresso-950/70 text-ochre-300 border border-ochre-400/30 backdrop-blur-md">
                      {dish.badge || dish.categoryLabel}
                    </span>
                    <span className="font-mono text-xs text-ivory-200/80 bg-espresso-950/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Contenu bas de carte */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 text-ivory-50">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-ochre-300 mb-1">
                      {dish.signatureNote}
                    </p>
                    <h4 className="font-serif text-2xl sm:text-3xl font-medium leading-tight mb-2 group-hover:text-ochre-300 transition-colors">
                      {dish.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-ivory-200/85 line-clamp-2 mb-4 leading-relaxed">
                      {dish.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-ivory-100/15">
                      <span className="font-mono text-sm font-medium text-ochre-300">
                        {dish.price}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-ivory-200/85 group-hover:text-ivory-50">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Contempler</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Sélecteur de catégories visuelles */}
        <div className="mb-12">
          <div
            role="tablist"
            aria-label="Catégories de la carte"
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 border-b border-espresso-800/10 dark:border-ivory-100/10 pb-6"
          >
            {restaurantConfig.categories.map((cat) => {
              const isSelected = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm tracking-wider uppercase font-medium transition-all duration-300 ${
                    isSelected
                      ? 'bg-espresso-900 text-ivory-50 dark:bg-ochre-600 dark:text-ivory-50 shadow-md scale-[1.02]'
                      : 'bg-ivory-50 dark:bg-espresso-950/70 text-espresso-700 dark:text-ivory-200/80 border border-espresso-800/10 dark:border-ivory-100/10 hover:border-ochre-500/40'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {currentCategoryObj && (
            <div className="mt-4 flex items-center justify-between text-xs text-espresso-600 dark:text-ivory-200/70">
              <p className="font-serif italic text-base sm:text-lg text-espresso-800 dark:text-ivory-200">
                {currentCategoryObj.subtitle}
              </p>
              <span className="font-mono uppercase tracking-widest">
                {filteredDishes.length}{' '}
                {filteredDishes.length > 1 ? 'créations' : 'création'}
              </span>
            </div>
          )}
        </div>

        {/* PARTIE 2 : Galerie Éditoriale Asymétrique (proportions variées, sans bouton commander) */}
        <div
          ref={galleryGridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-7 lg:gap-9 items-start"
        >
          {filteredDishes.map((dish, idx) => {
            const isFeature =
              dish.layoutAspect === 'feature' || idx % 5 === 0;
            const isPortrait = dish.layoutAspect === 'portrait';

            const colSpanClass = isFeature
              ? 'md:col-span-7 lg:col-span-7'
              : 'md:col-span-5 lg:col-span-5';

            // Alternance gauche/droite harmonieuse
            const dynamicColSpan =
              idx % 4 === 1
                ? 'md:col-span-5 lg:col-span-5'
                : idx % 4 === 2
                ? 'md:col-span-5 lg:col-span-5 md:mt-8'
                : idx % 4 === 3
                ? 'md:col-span-7 lg:col-span-7'
                : colSpanClass;

            const imageAspectClass = isFeature
              ? 'aspect-[16/11]'
              : isPortrait
              ? 'aspect-[4/4.6]'
              : 'aspect-[4/3]';

            return (
              <article
                key={dish.id}
                onClick={() => setSelectedDishModal(dish)}
                className={`dish-editorial-card group cursor-pointer rounded-3xl overflow-hidden bg-ivory-50 dark:bg-espresso-950 border border-espresso-800/10 dark:border-ivory-100/10 shadow-sm hover:shadow-xl transition-all duration-500 ${dynamicColSpan}`}
              >
                {/* Photographie vedette avec zoom très léger au survol */}
                <div
                  className={`relative w-full ${imageAspectClass} overflow-hidden bg-espresso-900`}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    onLoad={() => ScrollTrigger.refresh()}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Catégorie & Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] bg-ivory-50/90 dark:bg-espresso-950/85 text-espresso-900 dark:text-ivory-100 backdrop-blur-md font-medium">
                      {dish.categoryLabel}
                    </span>
                    {dish.badge && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] bg-olive-800/90 text-ivory-50 backdrop-blur-md">
                        <Flame className="w-3 h-3 text-ochre-300" />
                        {dish.badge}
                      </span>
                    )}
                  </div>

                  {/* Prix flottant raffiné */}
                  <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-espresso-950/80 text-ochre-300 border border-ochre-400/30 backdrop-blur-md font-mono text-xs sm:text-sm font-medium">
                    {dish.price}
                  </div>
                </div>

                {/* Légende culinaire éditoriale (Sans bouton Commander) */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-ochre-600 dark:text-ochre-400 font-medium">
                      {dish.signatureNote}
                    </span>
                    <span className="text-[11px] font-mono text-espresso-500 dark:text-ivory-200/50">
                      N° {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-espresso-950 dark:text-ivory-50 group-hover:text-ochre-600 dark:group-hover:text-ochre-400 transition-colors mb-3">
                    {dish.name}
                  </h3>

                  <p className="text-sm sm:text-base text-espresso-600 dark:text-ivory-200/80 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Visionneuse photographique plein cadre (Modal d'inspection visuelle du plat) */}
      {selectedDishModal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-espresso-950/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedDishModal(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-ivory-50 dark:bg-espresso-900 text-espresso-900 dark:text-ivory-50 border border-ivory-100/15 shadow-2xl grid grid-cols-1 md:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedDishModal(null)}
              aria-label="Fermer l'aperçu du plat"
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-espresso-950/70 text-ivory-50 hover:bg-ochre-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:col-span-7 aspect-[4/3] md:aspect-auto md:min-h-[420px] bg-espresso-950">
              <img
                src={selectedDishModal.image}
                alt={selectedDishModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-5 p-7 sm:p-9 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] bg-olive-800/15 dark:bg-olive-400/15 text-olive-800 dark:text-olive-300 font-semibold">
                  {selectedDishModal.categoryLabel}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight">
                  {selectedDishModal.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-ochre-600 dark:text-ochre-400">
                  {selectedDishModal.signatureNote}
                </p>
                <p className="text-sm sm:text-base text-espresso-700 dark:text-ivory-200/85 leading-relaxed pt-2">
                  {selectedDishModal.description}
                </p>
              </div>

              <div className="pt-6 mt-8 border-t border-espresso-800/10 dark:border-ivory-100/10 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-espresso-500 dark:text-ivory-200/60">
                    Tarif Dégustation
                  </span>
                  <span className="font-mono text-lg font-semibold text-ochre-600 dark:text-ochre-400">
                    {selectedDishModal.price}
                  </span>
                </div>
                <span className="font-serif italic text-sm text-espresso-600 dark:text-ivory-200/70">
                  Servi sur place uniquement
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
