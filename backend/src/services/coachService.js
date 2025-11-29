const { callOpenAIChat } = require('./openaiService')

/**
 * sessionContext: optional previous conversation history
 * message: new user message
 *
 * returns: { reply, advice }
 */
async function coachHandler({ sessionContext = null, message }) {
  const messages = [
    { role: 'system', content: "Tu es un coach d'entretien exigeant en français. Donne des questions, feed-back constructif et conseils pratiques." }
  ]

  if (sessionContext && Array.isArray(sessionContext)) {
    sessionContext.forEach((m) => messages.push(m))
  }

  messages.push({ role: 'user', content: message })

  const aiResponse = await callOpenAIChat(messages)

  return { reply: aiResponse }
}

module.exports = { coachHandler }
