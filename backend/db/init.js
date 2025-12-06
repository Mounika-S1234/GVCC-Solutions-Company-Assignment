// backend/db/init.js
const db = require('./db');

// Initialize products table
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    price REAL,
    short_desc TEXT,
    image_url TEXT
  )
`, (err) => {
  if (err) console.error('Error creating products table:', err.message);
});

// Initialize enquiries table
db.run(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    name TEXT,
    email TEXT,
    message TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
  )
`, (err) => {
  if (err) console.error('Error creating enquiries table:', err.message);
});

console.log('Database tables ensured');
