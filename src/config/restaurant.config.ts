/**
 * ============================================================================
 * FICHIER DE CONFIGURATION CENTRALISÉ DU RESTAURANT
 * ============================================================================
 * Modifiez simplement ce fichier pour mettre à jour toutes les informations
 * du site vitrine : nom, slogan, textes, coordonnées, WhatsApp, horaires,
 * réseaux sociaux, catégories et plats du menu.
 * Aucune base de données ni modification du code React n'est requise.
 * ============================================================================
 */

export type DishCategoryKey =
  | 'all'
  | 'entrees'
  | 'plats'
  | 'burgers'
  | 'grillades'
  | 'desserts'
  | 'boissons';

export interface DishItem {
  id: string;
  name: string;
  category: Exclude<DishCategoryKey, 'all'>;
  categoryLabel: string;
  description: string;
  signatureNote: string;
  price: string;
  image: string;
  fallbackImage?: string;
  /** Proportions variées pour une galerie éditoriale asymétrique ('portrait' | 'landscape' | 'feature' | 'square') */
  layoutAspect: 'portrait' | 'landscape' | 'feature' | 'square';
  badge?: string;
  isChefSignature?: boolean;
}

export interface UniversePhoto {
  id: string;
  title: string;
  subtitle: string;
  category: 'Cadre & Décoration' | 'Haute Cuisine' | 'Flamme & Braise' | 'Art de la Table';
  image: string;
  spanClass: string;
  parallaxSpeed: number;
}

export interface OpeningHourItem {
  days: string;
  lunch: string;
  dinner: string;
  note?: string;
}

export interface RestaurantConfig {
  name: string;
  shortName: string;
  monogram: string;
  establishedYear: string;
  culinaryStyle: string;
  slogan: string;
  heroSubheadline: string;
  heroCtaLabel: string;
  shortBio: string;

  /** Section 1 : Médias d'introduction cinématographique */
  heroMedia: {
    videoMp4: string;
    videoWebm: string;
    videoMobileMp4: string;
    posterImage: string;
    secondaryImage: string;
    ambientAudioTrack: string;
    audioDescription: string;
  };

  /** Section 2 : Présentation & Histoire du restaurant */
  presentation: {
    eyebrow: string;
    title: string;
    highlightedWord: string;
    leadParagraph: string;
    secondParagraph: string;
    chefName: string;
    chefRole: string;
    chefQuote: string;
    mainImage: string;
    mainImageCaption: string;
    secondaryImage: string;
    secondaryImageCaption: string;
    detailImage: string;
    detailImageCaption: string;
    pillars: {
      number: string;
      title: string;
      description: string;
    }[];
  };

  /** Section 3 : Catégories & Sélection culinaire */
  categories: {
    key: DishCategoryKey;
    label: string;
    subtitle: string;
  }[];

  dishes: DishItem[];

  /** Section 4 : L'Univers du restaurant (Galerie immersive) */
  universe: {
    eyebrow: string;
    title: string;
    description: string;
    photos: UniversePhoto[];
  };

  /** Section 5 : Contact, Coordonnées, WhatsApp, Horaires & Carte */
  contact: {
    addressLine1: string;
    addressLine2: string;
    cityCountry: string;
    landmarkNote: string;
    phoneDisplay: string;
    phoneRaw: string;
    /** Numéro au format international sans '+' ni espaces (ex: 2290197458820) */
    whatsappNumber: string;
    whatsappPrefilledMessage: string;
    email: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    googleMapsEmbedUrl: string;
    googleMapsDirectUrl: string;
    openingHours: OpeningHourItem[];
    socials: {
      instagramUrl: string;
      instagramHandle: string;
      facebookUrl: string;
      facebookName: string;
    };
  };
}

export const restaurantConfig: RestaurantConfig = {
  name: "L'Écrin d'Ocre",
  shortName: "Écrin d'Ocre",
  monogram: 'ÉO',
  establishedYear: 'MMXXII',
  culinaryStyle: 'Table Gastronomique & Braise Contemporaine',
  slogan: 'Là où la braise murmure et où chaque assiette raconte une terre.',
  heroSubheadline:
    'Une cuisine d’auteur façonnée par le feu doux, les récoltes locales d’exception et le geste précis de nos artisans cuisiniers.',
  heroCtaLabel: 'Découvrir notre cuisine',
  shortBio:
    "Table contemporaine dédiée aux cuissons à la braise d'acacia, aux produits de mer sauvages et aux épices botaniques.",

  heroMedia: {
    videoMp4: '/videos/hero-culinary.mp4?v=2',
    videoWebm: '/videos/hero-culinary.webm?v=2',
    videoMobileMp4: '/videos/hero-culinary-mobile.mp4?v=2',
    posterImage: '/images/hero/hero-main.webp?v=2',
    secondaryImage: '/images/hero/hero-flambe.webp?v=2',
    ambientAudioTrack: '/audio/ambiance-gastronomique.wav',
    audioDescription: 'Ambiance sonore : Feutrée & Braise Douce',
  },

  presentation: {
    eyebrow: 'Chapitre I — L’Âme de la Maison',
    title: 'L’alchimie du feu apprivoisé et de la matière',
    highlightedWord: 'vivante',
    leadParagraph:
      "Niché au cœur d'un écrin végétal et minéral à Cotonou, L'Écrin d'Ocre célèbre une gastronomie sincère, affranchie des artifices. Notre cuisine ouverte s'articule autour d'un foyer de braises d'acacia et de palétuvier qui confère aux viandes maturées, aux poissons côtiers et aux légumes racines une profondeur aromatique incomparable.",
    secondParagraph:
      "Chaque service est pensé comme une parenthèse sensorielle : la caresse du lin naturel, la lueur ambrée des bougies sur l'enduit à la chaux, le parfum des herbes fraîches cueillies au matin et la justesse d'un jus longuement réduit.",
    chefName: 'Chef Koffi Marc-Aurèle & Brigades d’Ocre',
    chefRole: 'Direction Culinaire & Créations au Feu de Bois',
    chefQuote:
      "« Nous ne cherchons pas à transformer le produit, mais à révéler son émotion brute par la maîtrise de la flamme, du temps et des infusions botaniques. »",
    mainImage: '/images/interior/interior-main.webp?v=2',
    mainImageCaption: 'La Grande Salle — Chêne brut, banquettes crème et herbes aromatiques.',
    secondaryImage: '/images/interior/chef-seasoning.webp?v=2',
    secondaryImageCaption: 'Le Geste Précis — Assaisonnement et dressage minute par notre Chef.',
    detailImage: '/images/hero/hero-flambe.webp?v=2',
    detailImageCaption: 'Le Foyer — Saisie vive sur braises ardentes et beurre fumé au romarin.',
    pillars: [
      {
        number: '01',
        title: 'Terroir & Pêche du Jour',
        description:
          'Poissons sauvages débarqués à l’aube, légumes maraîchers biologiques et viandes maturées avec rigueur.',
      },
      {
        number: '02',
        title: 'Cuisson à la Braise Douce',
        description:
          'Un grill artisanal au bois d’acacia qui caramélise les sucs tout en préservant une tendreté absolue.',
      },
      {
        number: '03',
        title: 'Jus & Élixirs Botaniques',
        description:
          'Des réductions mijotées 24 heures et des infusions florales créées sur-mesure pour magnifier chaque plat.',
      },
    ],
  },

  categories: [
    {
      key: 'all',
      label: 'Toute la Carte',
      subtitle: 'Douze créations emblématiques façonnées au rythme des saisons',
    },
    {
      key: 'entrees',
      label: 'Entrées',
      subtitle: 'Préludes délicats, fraîcheur marine et veloutés de caractère',
    },
    {
      key: 'plats',
      label: 'Plats Principaux',
      subtitle: 'Haute gastronomie, jus corsés et cuissons de haute précision',
    },
    {
      key: 'burgers',
      label: 'Burgers & Signatures',
      subtitle: 'Pain brioché au levain maison, viandes maturées et homard poché',
    },
    {
      key: 'grillades',
      label: 'Grillades au Feu de Bois',
      subtitle: 'La noblesse de la braise vive et des beurres d’épices douces',
    },
    {
      key: 'desserts',
      label: 'Desserts',
      subtitle: 'Cacao grand cru, fruits rôtis et douceurs pâtissières',
    },
    {
      key: 'boissons',
      label: 'Boissons & Élixirs',
      subtitle: 'Créations botaniques, infusions grand cru et nectars fumés',
    },
  ],

  dishes: [
    {
      id: 'carpaccio-st-jacques',
      name: 'Carpaccio de Saint-Jacques & Agrumes Brûlés',
      category: 'entrees',
      categoryLabel: 'Entrées',
      description:
        'Noix de Saint-Jacques juste snackées à la flamme, huile vierge aux herbes fraîches, émulsion yuzu-passion et fleur de sel fumée.',
      signatureNote: 'Fraîcheur iodée & notes d’agrumes',
      price: '12 500 FCFA',
      image: '/images/dishes/carpaccio-st-jacques.webp',
      layoutAspect: 'portrait',
      badge: 'Prélude Marin',
      isChefSignature: true,
    },
    {
      id: 'veloute-courge',
      name: 'Velouté de Courge Rôtie & Châtaignes Fumées',
      category: 'entrees',
      categoryLabel: 'Entrées',
      description:
        'Courge butternut rôtie au four à bois, crème fouettée à la truffe noire, éclats de noisettes du Piémont torréfiées et mouillette au levain.',
      signatureNote: 'Texture soyeuse & parfum boisé',
      price: '9 500 FCFA',
      image: '/images/dishes/veloute-courge.webp',
      layoutAspect: 'landscape',
    },
    {
      id: 'filet-rossini',
      name: 'Filet de Bœuf Rossini & Jus Corsé au Cacao',
      category: 'plats',
      categoryLabel: 'Plats Principaux',
      description:
        'Cœur de filet de bœuf saisi au beurre noisette, escalope poêlée dorée, mousseline de patate douce fumée et réduction de jus de viande au cacao pur.',
      signatureNote: 'Incontournable de la Maison',
      price: '24 000 FCFA',
      image: '/images/dishes/filet-rossini.webp',
      layoutAspect: 'feature',
      badge: 'Grand Classique',
      isChefSignature: true,
    },
    {
      id: 'bar-sauvage',
      name: 'Filet de Bar Sauvage Rôti sur Peau',
      category: 'plats',
      categoryLabel: 'Plats Principaux',
      description:
        'Bar côtier à la peau croustillante dorée à la flamme, risotto crémeux au safran véritable, fenouil braisé et émulsion au citron vert.',
      signatureNote: 'Pêche sauvage du matin',
      price: '19 500 FCFA',
      image: '/images/dishes/bar-sauvage.webp',
      layoutAspect: 'portrait',
    },
    {
      id: 'burger-signature',
      name: 'Le Burger Signature « L’Écrin d’Ocre »',
      category: 'burgers',
      categoryLabel: 'Burgers & Signatures',
      description:
        'Pain brioché artisanal doré au beurre clarifié, bœuf maturé 35 jours grillé sur braise, comté affiné 18 mois fondant, compotée d’oignons au miel et sauge croustillante.',
      signatureNote: 'Maturé 35 jours • Brioche maison',
      price: '14 500 FCFA',
      image: '/images/dishes/burger-signature.webp',
      layoutAspect: 'feature',
      badge: 'Signature Chef',
      isChefSignature: true,
    },
    {
      id: 'brioche-homard',
      name: 'Brioche Toastée au Homard & Beurre d’Estragon',
      category: 'burgers',
      categoryLabel: 'Burgers & Signatures',
      description:
        'Médaillons de homard bleu pochés au beurre demi-sel, pain sando brioché croustillant, avocat grillé à la flamme et mayonnaise légère aux agrumes.',
      signatureNote: 'Édition limitée selon arrivage',
      price: '21 000 FCFA',
      image: '/images/dishes/brioche-homard.webp',
      layoutAspect: 'landscape',
      badge: 'Édition Rare',
    },
    {
      id: 'cote-de-boeuf',
      name: 'Côte de Bœuf Maturée à la Braise d’Acacia',
      category: 'grillades',
      categoryLabel: 'Grillades au Feu de Bois',
      description:
        'Pièce noble saisie à flamme vive, croûte caramélisée aux herbes sauvages, beurre maître d’hôtel à l’ail noir confit et pommes grenailles rôties au romarin.',
      signatureNote: 'Cuisson sur braise d’acacia',
      price: '28 000 FCFA',
      image: '/images/dishes/cote-de-boeuf.webp',
      layoutAspect: 'feature',
      badge: 'Maître Grillardin',
      isChefSignature: true,
    },
    {
      id: 'gambas-braisees',
      name: 'Gambas Royales Flambées au Beurre d’Épices',
      category: 'grillades',
      categoryLabel: 'Grillades au Feu de Bois',
      description:
        'Gambas sauvages grillées en carapace sur les braises, glacées au beurre de citronnelle et piment doux, accompagnées d’une vierge de mangue verte.',
      signatureNote: 'Flambées minute devant vous',
      price: '22 500 FCFA',
      image: '/images/dishes/gambas-braisees.webp',
      layoutAspect: 'portrait',
    },
    {
      id: 'sphere-chocolat',
      name: 'Sphère Chocolat Grand Cru 70% & Cœur Praliné',
      category: 'desserts',
      categoryLabel: 'Desserts',
      description:
        'Coque fine de chocolat noir grand cru d’Afrique de l’Ouest, cœur fondant au praliné noisette-cajou, révélée à table par un caramel chaud au beurre salé.',
      signatureNote: 'Service spectaculaire à table',
      price: '8 500 FCFA',
      image: '/images/dishes/sphere-chocolat.webp',
      layoutAspect: 'portrait',
      badge: 'Haute Pâtisserie',
      isChefSignature: true,
    },
    {
      id: 'tarte-figues',
      name: 'Tarte Fine aux Figues Rôties & Crème de Pistache',
      category: 'desserts',
      categoryLabel: 'Desserts',
      description:
        'Feuilletage inversé caramélisé au sucre muscovado, figues violettes rôties au miel de fleurs, mousseline de pistache verte et glace vanille Bourbon.',
      signatureNote: 'Feuilletage minute croustillant',
      price: '8 000 FCFA',
      image: '/images/dishes/tarte-figues.webp',
      layoutAspect: 'landscape',
    },
    {
      id: 'elixir-botanique',
      name: 'L’Élixir Botanique Bissap Grand Cru & Gingembre Fumé',
      category: 'boissons',
      categoryLabel: 'Boissons & Élixirs',
      description:
        'Infusion à froid de fleurs d’hibiscus pourpres, réduction de gingembre frais rôti à la flamme, zeste de bergamote et branche de romarin fumée.',
      signatureNote: 'Création botanique maison',
      price: '6 500 FCFA',
      image: '/images/dishes/elixir-botanique.webp',
      layoutAspect: 'portrait',
      badge: 'Élixir Signature',
      isChefSignature: true,
    },
    {
      id: 'nuit-dambre',
      name: 'Nectar « Nuit d’Ambre » Passion Rôtie & Thé Fumé',
      category: 'boissons',
      categoryLabel: 'Boissons & Élixirs',
      description:
        'Pulpe de fruit de la passion caramélisée, infusion de thé noir Lapsang Souchong, cardamome verte écrasée, écume légère d’agrumes et feuille d’or.',
      signatureNote: 'Sans alcool • Équilibre fumé & acidulé',
      price: '7 000 FCFA',
      image: '/images/dishes/nuit-dambre.webp',
      layoutAspect: 'square',
    },
  ],

  universe: {
    eyebrow: 'Chapitre III — L’Atmosphère & Le Geste',
    title: 'Un sanctuaire de matière, d’ombre douce et de lumière ambrée',
    description:
      'De la salle voûtée baignée de lumière naturelle au patio étoilé, chaque recoin de L’Écrin d’Ocre a été dessiné pour ralentir le temps et éveiller les sens.',
    photos: [
      {
        id: 'univ-salle',
        title: 'La Salle & Les Tables d’Hôtes',
        subtitle: 'Bois massif, banquettes en lin lavé et herbes aromatiques fraîches.',
        category: 'Cadre & Décoration',
        image: '/images/interior/interior-main.webp?v=2',
        spanClass: 'md:col-span-7 md:row-span-2',
        parallaxSpeed: -18,
      },
      {
        id: 'univ-cuisine',
        title: 'La Brigade en Cuisine',
        subtitle: 'Le savoir-faire artisanal et la concentration de nos chefs à chaque service.',
        category: 'Haute Cuisine',
        image: '/images/interior/kitchen-plating.webp?v=2',
        spanClass: 'md:col-span-5 md:row-span-1',
        parallaxSpeed: 14,
      },
      {
        id: 'univ-braise',
        title: 'Le Chant des Braises',
        subtitle: 'Le feu d’acacia et les étincelles dorées sous la main du maître grillardin.',
        category: 'Flamme & Braise',
        image: '/images/hero/hero-flambe.webp?v=2',
        spanClass: 'md:col-span-5 md:row-span-1',
        parallaxSpeed: 20,
      },
      {
        id: 'univ-sauce',
        title: 'L’Art des Jus Réduits',
        subtitle: 'Des réductions brillantes et profondes versées à la minute par le Chef.',
        category: 'Art de la Table',
        image: '/images/hero/hero-main.webp?v=2',
        spanClass: 'md:col-span-5 md:row-span-1',
        parallaxSpeed: -12,
      },
      {
        id: 'univ-terrasse',
        title: 'L’Intimité des Tables du Soir',
        subtitle: 'Dîner feutré à la lueur ambrée des lampes de table et des bougies.',
        category: 'Cadre & Décoration',
        image: '/images/interior/terrace-evening.webp?v=2',
        spanClass: 'md:col-span-7 md:row-span-1',
        parallaxSpeed: 16,
      },
    ],
  },

  contact: {
    addressLine1: 'Villa 48, Avenue des Cocotiers — Haie Vive',
    addressLine2: 'Quartier des Ambassades',
    cityCountry: 'Cotonou, République du Bénin',
    landmarkNote: 'Parking privé sécurisé & service voiturier en soirée.',
    phoneDisplay: '+229 01 97 45 88 20',
    phoneRaw: '+2290197458820',
    whatsappNumber: '2290197458820',
    whatsappPrefilledMessage:
      'Bonjour, je souhaiterais obtenir des informations sur votre restaurant.',
    email: 'conciergerie@lecrindocre.bj',
    coordinates: {
      lat: 6.3568,
      lng: 2.3912,
    },
    googleMapsEmbedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=2.3812%2C6.3498%2C2.4012%2C6.3638&layer=mapnik&marker=6.3568%2C2.3912',
    googleMapsDirectUrl: 'https://www.google.com/maps/search/?api=1&query=6.3568,2.3912',
    openingHours: [
      {
        days: 'Mardi — Jeudi',
        lunch: '12h00 – 15h00',
        dinner: '19h00 – 23h00',
        note: 'Service continu au salon de thé botanique',
      },
      {
        days: 'Vendredi — Samedi',
        lunch: '12h00 – 15h30',
        dinner: '19h00 – 00h00',
        note: 'Ambiance musicale acoustique en soirée',
      },
      {
        days: 'Dimanche',
        lunch: '12h30 – 16h30',
        dinner: '19h00 – 22h30',
        note: 'Déjeuner dominical autour de la braise',
      },
      {
        days: 'Lundi',
        lunch: 'Fermé',
        dinner: 'Fermé',
        note: 'Repos hebdomadaire de la brigade',
      },
    ],
    socials: {
      instagramUrl: 'https://instagram.com/lecrindocre',
      instagramHandle: '@lecrindocre',
      facebookUrl: 'https://facebook.com/lecrindocre',
      facebookName: "L'Écrin d'Ocre Cotonou",
    },
  },
};

/**
 * Génère automatiquement le lien officiel WhatsApp avec message prérempli encodé
 */
export function getWhatsAppLink(customMessage?: string): string {
  const message = customMessage || restaurantConfig.contact.whatsappPrefilledMessage;
  return `https://wa.me/${restaurantConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
