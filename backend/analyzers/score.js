// Scoring utilities

const mockData = require("../mockData.json");

function keywordRelevance(keywords) {
  if (!keywords || keywords.length === 0) return 40;

  let sum = 0;
  for (const k of keywords) {
    const key = k.replace("react", "reactjs");
    sum += mockData.topics[key] ?? 40;
  }
  return Math.round(sum / keywords.length);
}

function platformFitScore(keywords, platform) {
  const kw = keywords || [];
  let base = 60;

  if (platform === "instagram") {
    if (kw.includes("cooking") || kw.includes("analogy")) base += 15;
    if (kw.includes("react") || kw.includes("reactjs")) base += 10;
  } else {
    if (kw.includes("education") || kw.includes("react") || kw.includes("angular"))
      base += 20;
    if (kw.includes("cooking")) base -= 10;
  }

  return Math.max(20, Math.min(95, base));
}

function computeFeasibilityScore(trend, relevance, platformScore) {
  const t = Number(trend) || 0;
  const k = Number(relevance) || 0;
  const p = Number(platformScore) || 0;

  return Math.max(0, Math.min(100, Math.round(t * 0.4 + k * 0.3 + p * 0.3)));
}

module.exports = {
  keywordRelevance,
  platformFitScore,
  computeFeasibilityScore
};
