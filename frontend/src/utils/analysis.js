import mockData from "../mockData.json";

/* ---------------------------------------------
   Keyword Extraction
--------------------------------------------- */
export function extractKeywords(pitch) {
  if (!pitch || typeof pitch !== "string") return [];

  const words = pitch
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .split(/\s+/);

  const bag = new Set([
    "react",
    "angular",
    "cooking",
    "tech",
    "analogy",
    "education",
    "tutorial",
    "coding",
    "dev",
    "reactjs"
  ]);

  const freq = {};
  for (const w of words) {
    if (bag.has(w)) freq[w] = (freq[w] || 0) + 1;
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map((x) => x[0])
    .slice(0, 3);
}

/* ---------------------------------------------
   Trend Score
--------------------------------------------- */
export function computeTrendScore(keywords) {
  if (!keywords.length) return 40;

  const scores = keywords.map((k) => {
    const key = k.replace("react", "reactjs");
    return mockData.topics[key] ?? 40;
  });

  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

/* ---------------------------------------------
   Keyword Relevance
--------------------------------------------- */
export function keywordRelevance(keywords) {
  if (!keywords.length) return 40;

  let sum = 0;
  for (const k of keywords) {
    const key = k.replace("react", "reactjs");
    sum += mockData.topics[key] ?? 40;
  }

  return Math.round(sum / keywords.length);
}

/* ---------------------------------------------
   Platform Fit Score
--------------------------------------------- */
export function platformFitScore(keywords, platform) {
  const kw = Array.isArray(keywords) ? keywords : [];
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

/* ---------------------------------------------
   Feasibility Score
--------------------------------------------- */
export function computeFeasibilityScore(trend, relevance, platformScore) {
  const t = Number(trend) || 0;
  const k = Number(relevance) || 0;
  const p = Number(platformScore) || 0;

  return Math.max(0, Math.min(100, Math.round(t * 0.4 + k * 0.3 + p * 0.3)));
}

/* ---------------------------------------------
   Hook + Retention Suggestions
--------------------------------------------- */
export function hookSuggestion() {
  return "Start with the final result (finished app/dish) to hook viewers instantly.";
}

export function retentionTactic() {
  return "Add a visual change at 0:04–0:06 for better retention.";
}

/* ---------------------------------------------
   Hashtag Generator
--------------------------------------------- */
export function generateHashtags(keywords, platform) {
  const tags = new Set();
  for (const k of keywords) tags.add(`#${k}`);

  if (platform === "instagram") tags.add("#reels");
  if (platform === "linkedin") tags.add("#professional");

  return [...tags].slice(0, 6);
}

/* ---------------------------------------------
   Platform Analysis
--------------------------------------------- */
export function platformAnalysis(pitch, keywords, platform) {
  const fit = platformFitScore(keywords, platform);
  const trend = computeTrendScore(keywords);

  return {
    verdict:
      fit > 70
        ? platform === "instagram"
          ? "Great for Reels."
          : "High engagement, low virality."
        : "Needs adaptation for this platform.",
    reasoning: `Trend ${Math.round(trend)} / Fit ${fit}`,
    tone: platform === "linkedin" ? "Make it 20% more formal." : "Be punchy and visual.",
    estReach: Math.round((trend / 100) * (fit / 100) * 10000)
  };
}

/* ---------------------------------------------
   Competitor Detection
--------------------------------------------- */
export function competitorCheck(keywords) {
  return mockData.recent_creators
    .filter((c) => keywords.some((k) => c.topic.includes(k)))
    .slice(0, 3);
}

/* ---------------------------------------------
   Build Full Report
--------------------------------------------- */
export function analyzePitch(pitch, platforms = ["instagram", "linkedin"]) {
  const keywords = extractKeywords(pitch);
  const trendScore = computeTrendScore(keywords);
  const relevance = keywordRelevance(keywords);

  const pScores = platforms.map((p) => platformFitScore(keywords, p));
  const avgPScore = pScores.length
    ? pScores.reduce((a, b) => a + b, 0) / pScores.length
    : 50;

  const score = computeFeasibilityScore(trendScore, relevance, avgPScore);

  return {
    score,
    color: score >= 80 ? "green" : score >= 50 ? "yellow" : "red",
    keywords,
    trendScore,
    keywordRelevance: relevance,
    platformScoreAvg: avgPScore,
    platforms: {
      instagram: platformAnalysis(pitch, keywords, "instagram"),
      linkedin: platformAnalysis(pitch, keywords, "linkedin")
    },
    hook: hookSuggestion(),
    retention: retentionTactic(),
    hashtags: generateHashtags(keywords, platforms[0] || "instagram"),
    competitors: competitorCheck(keywords),
    scriptStarter:
      "Here's how React and Angular differ — imagine cooking two meals with the same ingredients..."
  };
}

/* ---------------------------------------------
   Lightweight Development Tests
--------------------------------------------- */
export function runDevTests() {
  console.assert(Array.isArray(extractKeywords("React cooking analogy")), "extractKeywords → array");

  const kw = extractKeywords("React cooking analogy tutorial");
  console.assert(kw.length > 0, "keywords extracted");

  const t = computeTrendScore(kw);
  console.assert(typeof t === "number", "trend score numeric");

  const kr = keywordRelevance(kw);
  console.assert(typeof kr === "number", "keyword relevance numeric");

  const fs = computeFeasibilityScore(t, kr, 70);
  console.assert(fs >= 0 && fs <= 100, "feasibility score range valid");

  console.log("[analysis.js] Dev tests passed");
}
