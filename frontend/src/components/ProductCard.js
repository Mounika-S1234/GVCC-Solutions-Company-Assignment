// frontend/src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <div key={product.id} className="card">
            <img 
                src={product.image_url || '/placeholder.png'} 
                alt={product.name} 
                style={{width:'100%', height:200, objectFit:'cover', borderRadius: '5px 5px 0 0'}} 
            />
            <h3>{product.name}</h3>
            <p style={{fontSize:'1.2em', fontWeight:'bold'}}>₹{product.price}</p>
            <p>{product.short_desc}</p>
            <Link 
                to={`/product/${product.id}`} 
                style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}
            >
                View Details
            </Link>
        </div>
    );
}