// Keyword extraction for backend usage

const KEYWORD_BAG = new Set([
  "react",
  "reactjs",
  "angular",
  "tech",
  "coding",
  "education",
  "dev",
  "tutorial",
  "cooking",
  "analogy"
]);

function extractKeywords(text) {
  if (!text || typeof text !== "string") return [];

  const words = text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .split(/\s+/);

  const freq = {};

  for (const w of words) {
    if (KEYWORD_BAG.has(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map((x) => x[0])
    .slice(0, 3);
}

module.exports = { extractKeywords };
