import { createCheckoutSession } from '../services/api'

export async function startCheckout(plan) {
  if (!plan) {
    throw new Error('Plan manquant')
  }

  const url = await createCheckoutSession({ plan })

  if (!url) {
    throw new Error('Impossible de créer la session de paiement')
  }

  window.location.href = url
  return url
}
