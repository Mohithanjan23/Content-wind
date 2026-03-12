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

  const platformScores = {};
  for (const p of platforms) {
    platformScores[p] = platformFitScore(keywords, p);
  }
  
  const pScoresArray = Object.values(platformScores);
  const avgPScore = pScoresArray.length
    ? pScoresArray.reduce((a, b) => a + b, 0) / pScoresArray.length
    : 50;

  const finalScore = computeFeasibilityScore(trend, relevance, avgPScore);

  const platformData = {};
  for (const p of platforms) {
    platformData[p] = analyzePlatform(pitch, keywords, p);
  }
  
  const suggestions = [
    "Start with the final result (finished app/dish) to hook viewers instantly.",
    "Add a visual change at 0:04-0:06 for better retention.",
    "Make sure your video hooks the user in the first 3 seconds.",
  ];

  return {
    feasibilityScore: finalScore,
    platformScores,
    keywords,
    suggestions,
    trendScore: trend,
    keywordRelevance: relevance,
    platformScoreAvg: avgPScore,
    platforms: platformData,
    competitors: competitorCheck(keywords),
    scriptStarter:
      "Here's how React and Angular differ - imagine cooking two meals with the same ingredients..."
  };
}

module.exports = { analyzePitchBackend };
