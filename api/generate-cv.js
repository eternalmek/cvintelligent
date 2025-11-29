// Env vars: OPENAI_API_KEY
// POST { jobDescription, userProfile } → returns { result }
// Generates un CV complet, lettre de motivation et conseils en français.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'OPENAI_API_KEY is missing on the server' })
    return
  }

  try {
    const { jobDescription, userProfile } = req.body || {}

    if (!jobDescription || !userProfile) {
      res.status(400).json({ error: 'jobDescription et userProfile sont requis' })
      return
    }

    const prompt = `Tu es un expert RH français et spécialiste ATS. À partir du profil candidat et de l'offre ci-dessous, rédige :\n1) Un CV complet, structuré, prêt pour l'ATS\n2) Un résumé de 4-5 phrases\n3) Les forces principales pour ce poste\n4) Des conseils d'entretien pratiques en français.\n\nOFFRE:\n${jobDescription}\n\nPROFIL:\n${userProfile}`

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'Tu es un coach emploi français. Rends le texte clair, concis et actionnable.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    })

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('OpenAI API error:', errorText)
      res.status(502).json({ error: 'Erreur lors de la génération du CV' })
      return
    }

    const data = await openaiResponse.json()
    const result = data?.choices?.[0]?.message?.content?.trim()

    if (!result) {
      res.status(500).json({ error: 'Réponse vide du modèle' })
      return
    }

    res.status(200).json({ result })
  } catch (error) {
    console.error('generate-cv error:', error)
    res.status(500).json({ error: 'Erreur interne, réessaie plus tard.' })
  }
}
