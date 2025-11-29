const fetch = global.fetch || ((...args) => import('node-fetch').then(({ default: fetchFn }) => fetchFn(...args)))

const OPENAI_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_KEY) {
  console.warn('OPENAI_API_KEY is not set. Add it to .env for AI features to work.')
}

// Generic helper calling OpenAI Chat Completions (using REST API to avoid SDK mismatch)
async function callOpenAIChat(messages = [], model = 'gpt-3.5-turbo') {
  if (!OPENAI_KEY) throw new Error('OpenAI API key not configured')

  const body = {
    model,
    messages,
    temperature: 0.2,
    max_tokens: 800
  }

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!resp.ok) {
    const txt = await resp.text()
    throw new Error(`OpenAI error: ${resp.status} ${txt}`)
  }

  const data = await resp.json()
  const first = data?.choices?.[0]?.message?.content
  return first || ''
}

module.exports = { callOpenAIChat }
