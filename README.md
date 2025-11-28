# cvintelligent (interface)

Version minimale de l'interface React pour cvintelligent.fr (Vite + React + Tailwind).

But:
- J'ai retiré toute mention / import LinkedIn comme demandé.
- Le projet est entièrement front-end. Les appels IA / paiement doivent être connectés à vos API / backend réels pour un fonctionnement en production.
- Le code fourni est prêt pour démarrer, builder et previewer localement et en production statique (build -> héberger sur un CDN ou un service statique).

Prérequis
- Node.js 18+ recommandé
- npm ou pnpm / yarn

Installation
1. Installer les dépendances :
   npm install

2. Lancer en mode dev :
   npm run dev

3. Build production :
   npm run build
   npm run preview (pour tester le build localement)

Notes de production
- Ajoutez vos clés/API côté backend. Ne mettez jamais de clés secrètes dans le frontend.
- Pour l'intégration IA (OpenAI ou autre), créez une API serveur qui encapsule les appels et expose un endpoint sécurisé.
- Pour la gestion des paiements (Stripe ou autre), implémentez le backend côté serveur.

Structure des fichiers principaux
- index.html
- src/main.jsx
- src/App.jsx (UI complète, navigation et vues)
- src/index.css (Tailwind)
- vite.config.js, tailwind.config.cjs, postcss.config.cjs

Si vous voulez, je peux :
- Séparer les composants en fichiers (components/*) pour plus de clarté.
- Ajouter des tests, linter (ESLint) et CI (GitHub Actions).
- Préparer un backend exemple pour les appels IA (Node/Express ou serverless).