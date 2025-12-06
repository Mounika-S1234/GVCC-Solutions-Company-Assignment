// backend/db/seed.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./db');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

// Run schema creation and then insert data
db.serialize(() => {
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error creating schema:', err);
            return;
        }
        console.log('Database schema ready.');

        const products = [
            ['Wireless Headphones', 'Electronics', 'Comfortable wireless headphones', 'High-quality over-ear headphones with noise cancellation and 30-hour battery life.', 79.99, '/images/headphones.jpg'],
            ['Coffee Table Book', 'Books', 'Beautiful photography book', 'A stunning 200-page coffee table book featuring landscape photography from around the world.', 24.50, '/images/book.jpg'],
            ['Bluetooth Speaker', 'Electronics', 'Portable speaker with deep bass', 'Compact, waterproof speaker with 10W output and a leather carrying strap.', 39.00, '/images/speaker.jpg'],
            ['Ceramic Mug', 'Home', 'Handmade ceramic mug', 'Durable, microwave-safe handmade mug, perfect for coffee or tea.', 12.99, '/images/mug.jpg'],
            ['Notebook (A5)', 'Stationery', 'A5 ruled notebook', 'Simple notebook with 100gsm paper and 100 ruled pages.', 6.50, '/images/notebook.jpg'],
            ['Smartwatch', 'Electronics', 'Fitness and health tracker', 'Tracks heart rate, steps, sleep, and GPS for running.', 199.99, '/images/watch.jpg'],
            ['Ergonomic Chair', 'Home', 'High-back mesh office chair', 'Fully adjustable lumbar support and breathable mesh back.', 249.00, '/images/chair.jpg'],
        ];

        // Clear existing products before inserting (optional, for clean re-runs)
        db.run(`DELETE FROM products`, (err) => {
             if (err) console.error("Error clearing table:", err);
        });

        const stmt = db.prepare(`INSERT INTO products (name, category, short_desc, long_desc, price, image_url) VALUES (?, ?, ?, ?, ?, ?)`);
        products.forEach(p => stmt.run(p, err => { if(err) console.error(err); }));
        stmt.finalize(() => console.log(`Inserted ${products.length} sample products.`));
    });
});