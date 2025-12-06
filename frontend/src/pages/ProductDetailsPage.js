// frontend/src/pages/ProductDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EnquiryForm from '../components/EnquiryForm';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Uses relative path for the API call (handled by proxy)
    axios.get(`/api/products/${id}`) 
      .then(res => {
        // Backend returns the product object directly
        setProduct(res.data);
        setError(null);
      })
      .catch(err => {
        console.error(`Error fetching product ID ${id}:`, err);
        setError("Product not found or failed to load details.");
      });
  }, [id]);

  if (error) return <div style={{color:'red', padding:'20px'}}>Error: {error}</div>;
  if (!product) return <div>Loading product details...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
      <div style={{ flex: '1 1 300px' }}>
        <img 
          src={product.image_url || '/placeholder.png'} 
          alt={product.name} 
          style={{maxWidth:'100%', height:'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}} 
        />
      </div>
      <div style={{ flex: '2 1 400px' }}>
        <h2>{product.name}</h2>
        <p style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#007bff' }}>Price: ₹{product.price}</p>
        <p>Category: <strong>{product.category}</strong></p>
        <h3>Description</h3>
        <p>{product.long_desc || product.short_desc}</p>
        
        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            style={{ padding: '12px 25px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1em', marginTop: '15px' }}
          >
            Enquire About This Product
          </button>
        ) : (
          <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px', borderRadius: '5px', background: '#fff' }}>
            <h3>Submit Enquiry</h3>
            <EnquiryForm 
              productId={product.id} 
              onDone={() => setShowForm(false)} 
            />
          </div>
        )}
      </div>
    </div>
  );
}