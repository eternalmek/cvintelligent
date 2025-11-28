// Très simple: on récupère les mots clés (noms composés inclus) de l'offre et on compte les occurrences dans le CV.
// Ceci est un algorithme basique — tu peux le remplacer par un vrai matching linguistique / stemming / fuzzy.
function extractKeywords(text) {
  if (!text) return [];
  // lower, remove punctuation, split on common separators
  const cleaned = text.toLowerCase().replace(/[^\wÀ-ÿ\s\-]/g, ' ');
  const tokens = cleaned.split(/\s+/).filter(Boolean);

  // keep tokens >=3 chars and remove stopwords (very small list)
  const stopwords = new Set(['et','le','la','les','des','de','du','un','une','pour','avec','a','en','sur','dans','par','à','au']);
  const keywords = tokens.filter(t => t.length >= 3 && !stopwords.has(t));
  // return unique
  return [...new Set(keywords)];
}

function computeAtsScore(jobPosting, cvText) {
  if (!jobPosting || !cvText) return 0;
  const jobKw = extractKeywords(jobPosting);
  const cvLower = cvText.toLowerCase();

  let matches = 0;
  for (const kw of jobKw) {
    // simple substring match
    if (cvLower.includes(kw)) matches++;
  }
  const score = Math.min(100, Math.round((matches / Math.max(1, jobKw.length)) * 100));
  return score;
}

module.exports = { computeAtsScore };