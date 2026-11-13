import React from 'react';
import { Instagram, Facebook, MessageCircle, ArrowUp } from 'lucide-react';
import { restaurantConfig, getWhatsAppLink } from '../config/restaurant.config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-espresso-950 text-ivory-100 border-t border-ivory-100/10 pt-16 pb-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-ivory-100/10">
          {/* Identité & Phrase de présentation */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full border border-ochre-500/50 flex items-center justify-center text-ochre-400 font-serif text-lg font-semibold">
                {restaurantConfig.monogram}
              </div>
              <div>
                <span className="font-serif text-2xl font-semibold tracking-wide text-ivory-50 block">
                  {restaurantConfig.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-ochre-300">
                  {restaurantConfig.culinaryStyle}
                </span>
              </div>
            </div>

            <p className="text-sm text-ivory-200/75 max-w-sm leading-relaxed">
              {restaurantConfig.shortBio}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.24em] text-ochre-400 font-semibold">
              Exploration
            </h3>
            <ul className="space-y-2.5 text-sm text-ivory-200/80">
              <li>
                <a
                  href="#accueil"
                  className="hover:text-ochre-300 transition-colors"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#le-restaurant"
                  className="hover:text-ochre-300 transition-colors"
                >
                  Le restaurant
                </a>
              </li>
              <li>
                <a
                  href="#notre-cuisine"
                  className="hover:text-ochre-300 transition-colors"
                >
                  Notre cuisine
                </a>
              </li>
              <li>
                <a
                  href="#galerie"
                  className="hover:text-ochre-300 transition-colors"
                >
                  Galerie &amp; Univers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-ochre-300 transition-colors"
                >
                  Contact &amp; Accès
                </a>
              </li>
            </ul>
          </div>

          {/* Coordonnées & Réseaux sociaux */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.24em] text-ochre-400 font-semibold">
              Coordonnées &amp; Réseaux
            </h3>
            <p className="text-sm text-ivory-200/80">
              {restaurantConfig.contact.addressLine1}
              <br />
              {restaurantConfig.contact.cityCountry}
            </p>
            <p className="font-mono text-sm text-ochre-300">
              {restaurantConfig.contact.phoneDisplay}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2.5 rounded-full border border-ivory-100/15 hover:border-ochre-400 hover:text-ochre-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={restaurantConfig.contact.socials.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-full border border-ivory-100/15 hover:border-ochre-400 hover:text-ochre-300 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={restaurantConfig.contact.socials.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2.5 rounded-full border border-ivory-100/15 hover:border-ochre-400 hover:text-ochre-300 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bas de page & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-200/60">
          <p>
            © {currentYear} {restaurantConfig.name}. Tous droits réservés.
            Présentation culinaire &amp; vitrine officielle.
          </p>

          <a
            href="#accueil"
            className="inline-flex items-center gap-2 uppercase tracking-[0.22em] text-ivory-200/80 hover:text-ochre-300 transition-colors"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
