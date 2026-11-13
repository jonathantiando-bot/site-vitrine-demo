# L'Écrin d'Ocre — Site Vitrine Gastronomique

Site web vitrine moderne, sophistiqué et immersif conçu pour le restaurant gastronomique **L'Écrin d'Ocre** (*Table Gastronomique & Braise Contemporaine*).

Ce projet est une **présentation culinaire purement éditoriale et émotionnelle** (sans base de données, sans espace client, sans panier ni commande en ligne), facilement maintenable via un unique fichier de configuration centralisé.

---

## 1. Architecture & Technologies

- **Framework :** React 18 + Vite
- **Langage :** TypeScript
- **Style & Thème (Jour / Nuit) :** Tailwind CSS + CSS personnalisé (palette Crème Ivoire, Beige Naturel, Brun Expresso, Vert Olive et Cuivre Ocre)
- **Animations au défilement :** GSAP + ScrollTrigger (avec prise en charge native de `prefers-reduced-motion`)
- **Icônes :** Lucide React
- **Médias optimisés :**
  - Photographies culinaires et d'intérieur en format **WebP** (`public/images/`)
  - Vidéo d'introduction cinématographique en **MP4 (H.264)**, **WebM (VP9)** et version **Mobile 720p** (`public/videos/`)
  - Ambiance sonore gastronomique activable à la demande (`public/audio/ambiance-gastronomique.wav`)

---

## 2. Structure des Fichiers

```text
├── public/
│   ├── audio/
│   │   └── ambiance-gastronomique.wav     # Ambiance sonore feutrée & braise douce
│   ├── images/
│   │   ├── hero/                          # Images de couverture & braise (WebP)
│   │   ├── interior/                      # Salle, terrasse & dressage en cuisine (WebP)
│   │   └── dishes/                        # Les 12 plats de la sélection culinaire (WebP)
│   ├── videos/
│   │   ├── hero-culinary.mp4              # Vidéo d'introduction Desktop (MP4 H.264)
│   │   ├── hero-culinary.webm             # Vidéo d'introduction Desktop (WebM VP9)
│   │   └── hero-culinary-mobile.mp4       # Vidéo optimisée pour connexions mobiles
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                     # Navigation discrète, sélecteur Jour/Nuit, Son & WhatsApp
│   │   ├── HeroSection.tsx                # Section 1 : Introduction cinématographique
│   │   ├── PresentationSection.tsx        # Section 2 : Histoire, Chef & triptyque photographique
│   │   ├── CulinarySelectionSection.tsx   # Section 3 : Galerie asymétrique + défilement horizontal
│   │   ├── UniverseSection.tsx            # Section 4 : Galerie immersive avec parallaxe
│   │   ├── ContactSection.tsx             # Section 5 : Coordonnées, WhatsApp, Horaires & Carte
│   │   └── Footer.tsx                     # Section 6 : Pied de page minimaliste
│   ├── config/
│   │   └── restaurant.config.ts           # CONFIGURATION CENTRALISÉE DU RESTAURANT
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
└── package.json
```

---

## 3. Modifier les Informations du Restaurant

Toutes les données (nom, slogan, textes, adresse, numéro de téléphone, numéro WhatsApp, horaires, liens Facebook/Instagram, catégories et liste des 12 plats avec leurs prix et photos) sont réunies dans :

👉 **`src/config/restaurant.config.ts`**

Aucune connaissance avancée de React n'est nécessaire pour mettre à jour la carte ou les horaires.

---

## 4. Installation et Lancement en Local

### Prérequis
- **Node.js** (version 18 ou supérieure recommandée)
- **npm**

### Commandes

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement local :**
   ```bash
   npm run dev
   ```
   Ouvrez ensuite l'URL affichée dans le terminal (par défaut `http://localhost:5173`).

---

## 5. Générer la Version de Production

Pour compiler le site en fichiers statiques optimisés prêts à être hébergés :

```bash
npm run build
```

Les fichiers statiques compilés seront générés dans le dossier **`dist/`**.
Vous pouvez prévisualiser la version de production localement avec :

```bash
npm run preview
```

---

## 6. Mise en Ligne (Hébergement Statique)

Le site ne nécessite aucun serveur backend ni base de données. Le dossier **`dist/`** peut être déployé gratuitement et instantanément sur :

- **Vercel :** Importer le dépôt Git ou exécuter `npx vercel --prod` (Build command : `npm run build`, Output directory : `dist`).
- **Netlify :** Glisser-déposer le dossier `dist/` sur [app.netlify.com/drop](https://app.netlify.com/drop) ou connecter le dépôt Git.
- **Cloudflare Pages / GitHub Pages / Hébergement Apache ou Nginx (WAMP/cPanel) :** Copier le contenu du dossier `dist/` à la racine du serveur web.
