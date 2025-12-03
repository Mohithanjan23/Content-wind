const mockData = require("../mockData.json");

// Simple competitor matcher
function competitorCheck(keywords) {
  return mockData.recent_creators
    .filter((c) => keywords.some((k) => c.topic.includes(k)))
    .slice(0, 3);
}

module.exports = { competitorCheck };
