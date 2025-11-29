```markdown
# Backend minimal pour cvintelligent

Stack : Node.js + Express.

Fonctionnalités :
- POST /api/generate-cv : génère un CV à partir d'un texte utilisateur ou d'un PDF et d'une offre d'emploi ; retourne aussi un score ATS simple.
- POST /api/coach : simule un échange avec le coach (fait appel à l'API OpenAI).

Installation :
1. Copier .env.example -> .env et renseigner OPENAI_API_KEY.
   - Ajoute STRIPE_SECRET_KEY, FRONTEND_URL et les prix Stripe par offre :
     * STRIPE_PRICE_ID_STARTER
     * STRIPE_PRICE_ID_PRO
     * STRIPE_PRICE_ID_ULTIMATE
     * STRIPE_PRICE_ID_TRIAL (optionnel)
     * STRIPE_PRICE_ID (fallback si un seul prix)
2. npm install
3. npm run dev
4. Serveur disponible sur http://localhost:4000

Notes :
- Ne mets jamais ta clé OpenAI dans le frontend.
- Les appels IA actuels utilisent l'API REST (node-fetch) ; tu peux remplacer par le SDK officiel si tu préfères.
- Pour la production, protège les endpoints (auth, rate-limit), ajoute logging et monitoring.
```