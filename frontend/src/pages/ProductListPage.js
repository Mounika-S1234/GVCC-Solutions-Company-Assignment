// frontend/src/pages/ProductListPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // The 'proxy' in package.json handles the localhost:3001 redirection
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    setLoading(true);

    axios.get(`/api/products${query}`) 
      .then(res => {
        setProducts(Array.isArray(res.data) ? res.data : res.data.products || []); 
        setError(null);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Check API connection and backend logs."); 
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [search]);

  if (loading) return <div>Loading products...</div>;
  
  return (
    <div>
      <h1>Product Catalog</h1>
      <input 
        type="text"
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        placeholder="Search by name or description..." 
        style={{ marginBottom: '20px', padding: '10px', width: '90%' }}
      />
      
      {error && <div style={{color:'red', padding:'10px', border:'1px solid red', marginBottom:'20px'}}>{error}</div>}

      {products.length === 0 ? (
        <p>No products found matching your search criteria.</p>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20}}>
          {products.map(p => (
            <div key={p.id} className="card">
              {/* Note: Images should be placed in frontend/public/images/ */}
              <img src={p.image_url || '/placeholder.png'} alt={p.name} style={{width:'100%', height:200, objectFit:'cover', borderRadius: '5px 5px 0 0'}} />
              <h3>{p.name}</h3>
              <p style={{fontSize:'1.2em', fontWeight:'bold'}}>₹{p.price}</p>
              <p>{p.short_desc}</p>
              <Link to={`/product/${p.id}`} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}