// Trend scoring using mock or real data.

const mockData = require("../mockData.json");

function computeTrendScore(keywords) {
  if (!keywords || keywords.length === 0) return 40;

  const values = keywords.map((k) => {
    const key = k.replace("react", "reactjs");
    return mockData.topics[key] ?? 40;
  });

  return values.reduce((a, b) => a + b, 0) / values.length;
}

module.exports = { computeTrendScore };
