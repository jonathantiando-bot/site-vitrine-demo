import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { restaurantConfig, getWhatsAppLink } from '../config/restaurant.config';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const blocks = cardsRef.current?.querySelectorAll('.contact-reveal');
      if (blocks && blocks.length > 0) {
        blocks.forEach((block) => {
          gsap.fromTo(
            block,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 95%',
                invalidateOnRefresh: true,
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { contact } = restaurantConfig;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-10 bg-ivory-100/90 dark:bg-espresso-900/80 text-espresso-900 dark:text-ivory-50 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto" ref={cardsRef}>
        {/* En-tête Contact */}
        <div className="contact-reveal max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-ochre-600 dark:bg-ochre-400" />
            <span className="text-xs uppercase tracking-[0.28em] text-ochre-600 dark:text-ochre-400 font-semibold">
              Chapitre IV — Nous Rencontrer
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08]">
            Venir partager un{' '}
            <span className="italic font-medium text-ochre-600 dark:text-ochre-400">
              instant
            </span>
          </h2>
          <p className="text-base sm:text-lg text-espresso-600 dark:text-ivory-200/80 leading-relaxed">
            Pour toute demande d’information sur notre table, nos salons privés
            ou nos soirées autour de la braise, notre équipe vous répond
            directement par téléphone ou sur WhatsApp.
          </p>
        </div>

        {/* Grille Principale : Coordonnées, Horaires & Carte intégrée */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Colonne Coordonnées & WhatsApp Direct */}
          <div className="contact-reveal lg:col-span-5 flex flex-col justify-between p-7 sm:p-9 rounded-3xl bg-ivory-50 dark:bg-espresso-950 border border-espresso-800/10 dark:border-ivory-100/10 shadow-lg space-y-8">
            <div className="space-y-7">
              {/* Adresse */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-ochre-600/10 dark:bg-ochre-400/10 text-ochre-600 dark:text-ochre-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.22em] text-espresso-500 dark:text-ivory-200/60 font-semibold mb-1">
                    Adresse de l’Établissement
                  </h3>
                  <p className="font-serif text-xl sm:text-2xl font-medium text-espresso-950 dark:text-ivory-50">
                    {contact.addressLine1}
                  </p>
                  <p className="text-sm text-espresso-600 dark:text-ivory-200/80">
                    {contact.addressLine2} — {contact.cityCountry}
                  </p>
                  <p className="text-xs text-olive-700 dark:text-olive-300 mt-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {contact.landmarkNote}
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-ochre-600/10 dark:bg-ochre-400/10 text-ochre-600 dark:text-ochre-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.22em] text-espresso-500 dark:text-ivory-200/60 font-semibold mb-1">
                    Ligne Directe &amp; Conciergerie
                  </h3>
                  <a
                    href={`tel:${contact.phoneRaw}`}
                    className="font-mono text-lg sm:text-xl font-medium text-espresso-950 dark:text-ivory-50 hover:text-ochre-600 dark:hover:text-ochre-400 transition-colors"
                  >
                    {contact.phoneDisplay}
                  </a>
                  <p className="text-xs text-espresso-500 dark:text-ivory-200/60 mt-1">
                    {contact.email}
                  </p>
                </div>
              </div>

              {/* Horaires d'ouverture */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-ochre-600/10 dark:bg-ochre-400/10 text-ochre-600 dark:text-ochre-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h3 className="text-xs uppercase tracking-[0.22em] text-espresso-500 dark:text-ivory-200/60 font-semibold mb-3">
                    Horaires d’Ouverture
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {contact.openingHours.map((item) => (
                      <li
                        key={item.days}
                        className="pb-2.5 border-b border-espresso-800/10 dark:border-ivory-100/10 last:border-none last:pb-0"
                      >
                        <div className="flex items-center justify-between font-medium text-espresso-900 dark:text-ivory-100">
                          <span>{item.days}</span>
                          <span className="font-mono text-xs text-ochre-600 dark:text-ochre-400">
                            {item.lunch === 'Fermé'
                              ? 'Fermé'
                              : `${item.lunch} • ${item.dinner}`}
                          </span>
                        </div>
                        {item.note && (
                          <p className="text-xs text-espresso-500 dark:text-ivory-200/60 mt-0.5">
                            {item.note}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action principale WhatsApp + Réseaux Sociaux */}
            <div className="pt-6 border-t border-espresso-800/10 dark:border-ivory-100/10 space-y-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full bg-olive-800 hover:bg-olive-700 dark:bg-ochre-600 dark:hover:bg-ochre-500 text-ivory-50 flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contacter sur WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={contact.socials.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl border border-espresso-800/15 dark:border-ivory-100/15 hover:border-ochre-500/50 flex items-center justify-center gap-2 text-xs font-medium text-espresso-800 dark:text-ivory-100 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-ochre-600 dark:text-ochre-400" />
                  <span>{contact.socials.instagramHandle}</span>
                </a>
                <a
                  href={contact.socials.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl border border-espresso-800/15 dark:border-ivory-100/15 hover:border-ochre-500/50 flex items-center justify-center gap-2 text-xs font-medium text-espresso-800 dark:text-ivory-100 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-ochre-600 dark:text-ochre-400" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne Carte Intégrée & Aperçu Localisation */}
          <div className="contact-reveal lg:col-span-7 rounded-3xl overflow-hidden bg-ivory-50 dark:bg-espresso-950 border border-espresso-800/10 dark:border-ivory-100/10 shadow-lg flex flex-col justify-between min-h-[440px]">
            <div className="relative flex-1 w-full min-h-[360px] bg-espresso-900">
              <iframe
                title={`Localisation de ${restaurantConfig.name}`}
                src={contact.googleMapsEmbedUrl}
                className="w-full h-full min-h-[360px] border-0 filter contrast-[1.02] dark:invert-[0.88] dark:hue-rotate-180 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-ivory-50 dark:bg-espresso-950 border-t border-espresso-800/10 dark:border-ivory-100/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ochre-600 dark:text-ochre-400 block">
                  Coordonnées GPS : {contact.coordinates.lat}° N,{' '}
                  {contact.coordinates.lng}° E
                </span>
                <p className="font-serif text-lg sm:text-xl text-espresso-900 dark:text-ivory-100">
                  {contact.addressLine1}, {contact.cityCountry}
                </p>
              </div>

              <a
                href={contact.googleMapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-espresso-800/20 dark:border-ivory-100/20 hover:border-ochre-500 text-xs uppercase tracking-[0.18em] font-medium transition-colors self-start sm:self-auto"
              >
                <span>Ouvrir dans Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
