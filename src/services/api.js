const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

const buildUrl = (path) => `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`

async function postJson(path, body) {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body || {})
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API error ${response.status}: ${errorText}`)
  }

  return response.json()
}

export async function generateCv(payload) {
  const response = await postJson('/api/generate-cv', payload)
  return response?.data || response
}

export async function sendCoachMessage(payload) {
  const response = await postJson('/api/coach', payload)
  return response?.data || response
}

export async function createCheckoutSession(payload) {
  const response = await postJson('/api/payments/checkout', payload)
  return response?.url || null
}

export { API_BASE_URL }
