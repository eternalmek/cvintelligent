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

  const json = await response.json().catch(() => null)

  if (!response.ok) {
    const message = json?.error || json?.message || `API error ${response.status}`
    throw new Error(message)
  }

  if (json && typeof json === 'object') {
    if (json.ok === false) {
      throw new Error(json.error || 'API error')
    }

    if (Object.prototype.hasOwnProperty.call(json, 'data')) {
      return json.data
    }
  }

  return json
}

export async function generateCv(payload) {
  return postJson('/api/generate-cv', payload)
}

export async function sendCoachMessage(payload) {
  return postJson('/api/coach', payload)
}

export async function createCheckoutSession(payload) {
  const response = await postJson('/api/payments/checkout', payload)
  return response?.url || null
}

export { API_BASE_URL }
