const express = require('express')
const Stripe = require('stripe')

const router = express.Router()

const stripeSecret = process.env.STRIPE_SECRET_KEY
const priceId = process.env.STRIPE_PRICE_ID
const frontendUrl = process.env.FRONTEND_URL

let stripeClient = null
if (stripeSecret) {
  stripeClient = new Stripe(stripeSecret)
} else {
  console.warn('STRIPE_SECRET_KEY is not set. Stripe checkout routes will be disabled until configured.')
}

router.post('/payments/checkout', async (req, res) => {
  if (!stripeClient || !priceId || !frontendUrl) {
    return res.status(500).json({ ok: false, error: 'Stripe est mal configuré. Vérifie STRIPE_SECRET_KEY, STRIPE_PRICE_ID et FRONTEND_URL.' })
  }

  try {
    const { plan, customerEmail, mode } = req.body || {}
    const checkoutMode = mode === 'payment' ? 'payment' : 'subscription'

    const session = await stripeClient.checkout.sessions.create({
      mode: checkoutMode,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${frontendUrl}/paiement/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/paiement/annule`,
      customer_email: customerEmail || undefined,
      metadata: {
        plan: plan || 'default'
      }
    })

    return res.json({ ok: true, url: session.url })
  } catch (error) {
    console.error('Stripe checkout error', error)
    return res.status(500).json({ ok: false, error: 'Création de session Stripe impossible' })
  }
})

module.exports = router
