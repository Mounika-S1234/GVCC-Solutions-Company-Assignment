// backend/routes/enquiryRoutes.js
const express = require('express');
const db = require('../db/db'); 
const router = express.Router();

// Helper for basic validation
const validateEnquiry = (data) => {
    if (!data.product_id || !data.name || !data.email || !data.message) {
        return 'Missing required fields (product_id, name, email, message).';
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
        return 'Invalid email format.';
    }
    return null; // No errors
};

// POST /api/enquiries - Create a new enquiry
router.post('/', (req, res) => {
    const data = req.body;
    const validationError = validateEnquiry(data);

    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const { product_id, name, email, phone, message } = data;
    const sql = `INSERT INTO enquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(sql, [product_id, name, email, phone || null, message], function(err) {
        if (err) {
            console.error('Database Error inserting enquiry:', err.message);
            return res.status(500).json({ error: 'Failed to submit enquiry.' });
        }
        // Use lastID to confirm insertion
        res.status(201).json({ message: 'Enquiry submitted successfully!', id: this.lastID });
    });
});

// GET /api/enquiries - List all enquiries (Admin route with simple token check)
router.get('/', (req, res) => {
    const adminToken = req.headers['authorization'];
    
    // Simple token check (Bonus Feature)
    if (adminToken !== `Bearer ${process.env.ADMIN_TOKEN}`) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid admin token.' });
    }

    const sql = `
        SELECT e.*, p.name as product_name 
        FROM enquiries e 
        JOIN products p ON e.product_id = p.id 
        ORDER BY e.created_at DESC
    `;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Database Error fetching enquiries:', err.message);
            return res.status(500).json({ error: 'Failed to fetch enquiries.' });
        }
        res.json({ enquiries: rows });
    });
});

module.exports = router;