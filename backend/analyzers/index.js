const { extractKeywords } = require("./keywords");
const { computeTrendScore } = require("./trends");
const { keywordRelevance, computeFeasibilityScore, platformFitScore } = require("./score");
const { analyzePlatform } = require("./platforms");
const { competitorCheck } = require("./competitors");

// Main backend analyzer function
function analyzePitchBackend(pitch, platforms = ["instagram", "linkedin"]) {
  const keywords = extractKeywords(pitch);

  const trend = computeTrendScore(keywords);
  const relevance = keywordRelevance(keywords);

  const pScores = platforms.map((p) => platformFitScore(keywords, p));
  const avgPScore = pScores.length
    ? pScores.reduce((a, b) => a + b, 0) / pScores.length
    : 50;

  const finalScore = computeFeasibilityScore(trend, relevance, avgPScore);

  const platformData = {};
  for (const p of platforms) {
    platformData[p] = analyzePlatform(pitch, keywords, p);
  }

  return {
    score: finalScore,
    keywords,
    trendScore: trend,
    keywordRelevance: relevance,
    platformScoreAvg: avgPScore,
    platforms: platformData,
    competitors: competitorCheck(keywords),
    scriptStarter:
      "Here's how React and Angular differ — imagine cooking two meals with the same ingredients..."
  };
}

module.exports = { analyzePitchBackend };
