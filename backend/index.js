// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Database connection is required here to ensure it initializes
require('./db/db'); 
const productRoutes = require('./routes/productRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();
// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Simple root check
app.get('/', (req, res) => {
    res.send('Product Showcase API is running.');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));