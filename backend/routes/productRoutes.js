// backend/routes/productRoutes.js
const express = require('express');
const db = require('../db/db'); 
const router = express.Router();

// GET /api/products - List products with optional search/filter
router.get('/', (req, res) => {
    // Basic search implementation for simplicity
    const { search } = req.query; 
    let sql = `SELECT id, name, category, short_desc, price, image_url FROM products`;
    let params = [];
    
    if (search) {
        sql += ` WHERE name LIKE ? OR short_desc LIKE ? OR category LIKE ?`;
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
    }
    
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error('Database Error fetching products:', err.message);
            return res.status(500).json({ error: 'Failed to fetch products from database.' });
        }
        res.json(rows); // Return array directly
    });
});

// GET /api/products/:id - Get single product details
router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const sql = `SELECT * FROM products WHERE id = ?`;
    
    db.get(sql, [productId], (err, row) => {
        if (err) {
            console.error(`Database Error fetching product ${productId}:`, err.message);
            return res.status(500).json({ error: 'Failed to fetch product details.' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.json(row); // Return single object directly
    });
});

module.exports = router;