# cvintelligent (interface)

SaaS MVP front-end pour cvintelligent.fr (Vite + React + Tailwind) avec appels serverless Stripe et OpenAI.

## Prérequis
- Node.js 18+
- npm
- Variables d'environnement (voir `.env.example`)

## Installer et lancer en local
1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Démarrer le frontend et les fonctions serverless Vercel en mode dev :
   ```bash
   npm run dev
   ```
   Les endpoints utilisés :
   - `POST /api/generate-cv` → nécessite `OPENAI_API_KEY`
   - `POST /api/checkout` → nécessite `STRIPE_SECRET_KEY` + IDs de prix
3. Builder puis prévisualiser :
   ```bash
   npm run build
   npm run preview
   ```

## Déployer sur Vercel
- Build command: `npm run build`
- Output directory: `dist`
- Functions: dossier `/api`
- Rewrites SPA: voir `vercel.json` (toutes les routes non-API pointent vers `index.html`)
- Variables à définir dans le dashboard Vercel :
  - `OPENAI_API_KEY`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_PRICE_ID_STARTER`
  - `STRIPE_PRICE_ID_PRO`
  - `STRIPE_PRICE_ID_ULTIMATE`
  - `FRONTEND_URL` (URL publique du déploiement)
  - Optionnel: `VITE_API_BASE_URL` si vos fonctions tournent ailleurs qu'en local

## Fonctionnalités
- Création de CV IA (formulaire complet, loading, copier le résultat)
- Paiement Stripe Checkout (plans Starter / Pro / Ultimate) depuis la page Tarifs
- Routes SPA: `/`, `/pricing`, `/success`, `/cancel`
- Sections non prêtes marquées "Coming soon" pour éviter toute confusion