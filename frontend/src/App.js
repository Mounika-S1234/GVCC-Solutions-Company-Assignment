// frontend/src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminEnquiriesPage from './pages/AdminEnquiriesPage'; // New Import

function App() {
  return (
    <div className="app-container">
      <header>
        <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h1><Link to="/">Product Showcase</Link></h1>
          {/* Admin link for easy access during development */}
          <Link to="/admin/enquiries" style={{color: 'white', textDecoration: 'none'}}>Admin</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/admin/enquiries" element={<AdminEnquiriesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;