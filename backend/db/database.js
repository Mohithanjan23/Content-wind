const Database = require('better-sqlite3');
const path = require('path');

// Initialize the database in the backend directory
const dbPath = path.join(__dirname, '..', 'app.db');
const db = new Database(dbPath);

// Create the tables if they don't exist
const initDb = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS analysis_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pitch TEXT NOT NULL,
      platforms TEXT NOT NULL,
      score REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

initDb();

module.exports = db;
