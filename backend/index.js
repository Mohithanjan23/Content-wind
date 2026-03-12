// backend/index.js
// Main entry for the backend server (Express)

require('dotenv').config();
const express = require("express");
const cors = require("cors");

const analyzeRoute = require("./routes/analyze");
const historyRoute = require("./routes/history");

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

// Modular Routes
app.use("/api/analyze", analyzeRoute);
app.use("/api/history", historyRoute);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke in the server!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
