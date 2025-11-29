// Env vars: STRIPE_SECRET_KEY, STRIPE_PRICE_ID_STARTER, STRIPE_PRICE_ID_PRO, STRIPE_PRICE_ID_ULTIMATE, FRONTEND_URL
// POST { plan } where plan ∈ ['starter','pro','ultimate'] → returns { url }
// Crée une session Stripe Checkout en mode abonnement.

import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  const frontendUrl = (process.env.FRONTEND_URL || '').replace(/\/$/, '')
  const priceMap = {
    starter: process.env.STRIPE_PRICE_ID_STARTER,
    pro: process.env.STRIPE_PRICE_ID_PRO,
    ultimate: process.env.STRIPE_PRICE_ID_ULTIMATE
  }

  if (!secretKey || !priceMap.starter || !priceMap.pro || !priceMap.ultimate || !frontendUrl) {
    res.status(500).json({ error: 'Configuration Stripe manquante' })
    return
  }

  const { plan } = req.body || {}
  const priceId = priceMap[plan]

  if (!priceId) {
    res.status(400).json({ error: 'Plan invalide' })
    return
  }

  try {
    const stripe = new Stripe(secretKey, { apiVersion: '2023-10-16' })

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/cancel`,
      billing_address_collection: 'auto'
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    res.status(500).json({ error: 'Erreur de paiement, réessaie.' })
  }
}
