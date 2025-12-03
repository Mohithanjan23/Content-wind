// backend/index.js
// Main entry for the backend server (Express)

const express = require("express");
const cors = require("cors");
const { analyzePitchBackend } = require("./analyzers");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "Content Feasibility Analyzer API is online.",
  });
});

// Main analysis route
app.post("/api/analyze", (req, res) => {
  const { pitch, platforms } = req.body;

  if (!pitch || typeof pitch !== "string") {
    return res.status(400).json({ error: "Pitch text is required." });
  }

  const selectedPlatforms = Array.isArray(platforms)
    ? platforms
    : ["instagram", "linkedin"]; // default

  try {
    const report = analyzePitchBackend(pitch, selectedPlatforms);
    res.json(report);
  } catch (err) {
    console.error("Analyzer Error:", err);
    res.status(500).json({ error: "Failed to analyze pitch." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
