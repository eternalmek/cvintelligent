# Déploiement cvintelligent

## Frontend (Vercel / Netlify)
- Variables d'environnement à définir :
  - `VITE_API_BASE_URL` (ex: `https://votre-backend.render.com` ou `http://localhost:4000` en local)
- Commandes d'installation/build :
  - `npm install`
  - `npm run build`
  - `npm run preview` (optionnel pour vérifier le build)
- Le projet utilise Vite + React. La sortie de build se trouve dans `dist/`.

## Backend (Render / Railway / Fly.io)
- Point d'entrée : `node src/index.js`
- Variables d'environnement à définir :
  - `PORT` (fournie par la plateforme ou `4000` en local)
  - `OPENAI_API_KEY` (nécessaire pour les routes IA)
  - `STRIPE_SECRET_KEY` (clé secrète Stripe)
  - `STRIPE_PRICE_ID` (ID de prix Stripe, abonnement ou paiement unique)
  - `FRONTEND_URL` (URL publique du frontend pour les redirections de Checkout)
- Commandes :
  - `npm install`
  - `npm start`
- Le backend écoute `process.env.PORT` (fallback `4000`).
