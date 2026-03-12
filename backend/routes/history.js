const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get analysis history
router.get('/', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM analysis_history ORDER BY created_at DESC LIMIT 50');
    const history = stmt.all();
    
    // Parse the platforms JSON string back to an array
    const formattedHistory = history.map(item => ({
      ...item,
      platforms: JSON.parse(item.platforms)
    }));

    res.json(formattedHistory);
  } catch (err) {
    console.error("History Error:", err);
    res.status(500).json({ error: "Failed to fetch analysis history." });
  }
});

module.exports = router;
