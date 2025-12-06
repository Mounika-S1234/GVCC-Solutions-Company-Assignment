// backend/db/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use DB_FILE from .env, defaulting to a specific path
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'product_showcase.db');

// Create the database connection object
const db = new sqlite3.Database(DB_FILE, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) return console.error('DB connection error:', err.message);
  console.log('Connected to SQLite DB:', DB_FILE);
});

module.exports = db;