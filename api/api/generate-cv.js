// api/generate-cv.js

// api/generate-cv.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      res.status(500).json({ error: "Missing OPENAI_API_KEY on server" });
      return;
    }

    const { jobDescription, userProfile } = req.body || {};

    if (!jobDescription || !userProfile) {
      res.status(400).json({ error: "Missing jobDescription or userProfile" });
      return;
    }

    const prompt = `
Tu es un expert RH français. Génère un CV complet, une lettre de motivation et un résumé professionnel basés sur :
OFFRE :
${jobDescription}

PROFIL :
${userProfile}
`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content:
              "Tu es un expert en recrutement français, spécialiste ATS, clair et professionnel.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await openaiRes.json();
    const text = data.choices?.[0]?.message?.content ?? "Erreur IA";

    res.status(200).json({ result: text });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
