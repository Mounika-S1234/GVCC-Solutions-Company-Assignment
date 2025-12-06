-- backend/db/schema.sql - CORRECTED VERSION

-- Products table
CREATE TABLE products (
  id INTEGER PRIMARY KEY, -- CORRECTED: INTEGER PRIMARY KEY is sufficient for auto-increment in SQLite
  name TEXT NOT NULL,
  category TEXT,
  short_desc TEXT,
  long_desc TEXT,
  price REAL, -- Use REAL for floating-point numbers in SQLite, as DECIMAL is not a native type
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Enquiries table
CREATE TABLE enquiries (
  id INTEGER PRIMARY KEY, -- CORRECTED: Removed AUTOINCREMENT
  product_id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);