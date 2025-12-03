const { computeTrendScore } = require("./trends");
const { platformFitScore } = require("./score");

// Platform-specific guidance from backend

function analyzePlatform(pitch, keywords, platform) {
  const fit = platformFitScore(keywords, platform);
  const trend = computeTrendScore(keywords);

  return {
    platform,
    verdict:
      fit > 70
        ? platform === "instagram"
          ? "Great for Reels."
          : "High engagement, lower virality."
        : "Needs adaptation for this platform.",
    reasoning: `Trend ${Math.round(trend)} | Fit ${fit}`,
    tone: platform === "linkedin" ? "Make it 20% more formal." : "Be visual + punchy.",
    estReach: Math.round((trend / 100) * (fit / 100) * 10000),
  };
}

module.exports = { analyzePlatform };
