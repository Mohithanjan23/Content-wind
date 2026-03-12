const express = require('express');
const router = express.Router();
const { analyzePitchBackend } = require('../analyzers');
const db = require('../db/database');

// Main analysis route
router.post('/', (req, res) => {
  const { pitch, platforms } = req.body;

  if (!pitch || typeof pitch !== "string") {
    return res.status(400).json({ error: "Pitch text is required." });
  }

  const selectedPlatforms = Array.isArray(platforms)
    ? platforms
    : ["instagram", "linkedin"]; // default

  try {
    // Generate the report
    const report = analyzePitchBackend(pitch, selectedPlatforms);
    
    // Save to database
    const stmt = db.prepare('INSERT INTO analysis_history (pitch, platforms, score) VALUES (?, ?, ?)');
    stmt.run(pitch, JSON.stringify(selectedPlatforms), report.feasibilityScore);

    res.json(report);
  } catch (err) {
    console.error("Analyzer Error:", err);
    res.status(500).json({ error: "Failed to analyze pitch." });
  }
});

module.exports = router;
