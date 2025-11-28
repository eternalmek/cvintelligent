const { callOpenAIChat } = require('./openaiService');
const { computeAtsScore } = require('./atsService');

/**
 * input: { name, targetRole, experiences, jobPosting, resumeText }
 * returns: { generatedCvText, atsScore, suggestions }
 */
async function generateCVHandler(input) {
  const { name, targetRole, experiences, jobPosting, resumeText } = input;

  // Build prompt for the model
  const userProfile = resumeText ? `Texte du CV importé:\n${resumeText}` : `Infos utilisateur:\n${experiences}`;
  const prompt = [
    { role: 'system', content: 'Tu es un assistant spécialisé dans la rédaction de CV professionnels en français, adaptés aux ATS.' },
    { role: 'user', content:
      `Génère un CV complet et professionnel pour la personne suivante.\n\nNom: ${name || '—'}\nMétier visé: ${targetRole || '—'}\n\nContexte / expériences:\n${userProfile}\n\nOffre d\'emploi:\n${jobPosting}\n\nContraintes:\n- Rédige en français.\n- Fournis une version texte formatée, claire, avec sections: Profil, Expériences (avec bullets), Compétences, Formation, Contact.\n- Retourne uniquement le CV (pas d'explications).` }
  ];

  const aiResponse = await callOpenAIChat(prompt);

  const generatedCvText = aiResponse?.trim() || '';

  // Compute a simple ATS score: count keyword matches between jobPosting and generated CV
  const atsScore = computeAtsScore(jobPosting || '', generatedCvText || '');

  // Suggestions - basic: top 3 missing keywords
  const suggestions = []; // could be enhanced

  return { generatedCvText, atsScore, suggestions };
}

module.exports = { generateCVHandler };