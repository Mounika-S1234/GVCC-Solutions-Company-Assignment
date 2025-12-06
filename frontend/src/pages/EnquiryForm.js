// frontend/src/components/EnquiryForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function EnquiryForm({ productId, onDone }) {
  const [data, setData] = useState({ name:'', email:'', phone:'', message:'' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    if(!data.name) return 'Name is required.';
    if(!data.email || !/\S+@\S+\.\S+/.test(data.email)) return 'Valid email is required.';
    if(!data.message) return 'Message is required.';
    return null; 
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setSuccess('');
    const validationError = validate(); 
    if(validationError){ setError(validationError); return; }

    try {
        // Uses relative path, relying on the 'proxy' setting in package.json
      await axios.post(`/api/enquiries`, { product_id: productId, ...data }); 
      setSuccess('Enquiry submitted successfully! We will contact you soon.');
      // Reset form state
      setData({ name:'', email:'', phone:'', message:'' });
      // Close form after a short delay
      if(onDone) setTimeout(onDone, 2000);
    } catch(err) {
      setError(err.response?.data?.error || 'Submission failed due to a server error. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{color:'red', border:'1px solid red', padding:'8px', borderRadius:'4px'}} role="alert">{error}</div>}
      {success && <div style={{color:'green', border:'1px solid green', padding:'8px', borderRadius:'4px'}} role="status">{success}</div>}
      
      <label>Name*: 
        <input type="text" name="name" value={data.name} onChange={e => setData({...data, name:e.target.value})} required aria-label="Name" />
      </label>
      <label>Email*: 
        <input type="email" name="email" value={data.email} onChange={e => setData({...data, email:e.target.value})} required aria-label="Email" />
      </label>
      <label>Phone: 
        <input type="tel" name="phone" value={data.phone} onChange={e => setData({...data, phone:e.target.value})} aria-label="Phone (optional)" />
      </label>
      <label>Message*: 
        <textarea name="message" value={data.message} onChange={e => setData({...data, message:e.target.value})} required style={{ minHeight: '80px' }} aria-label="Message" />
      </label>
      
      <button type="submit">Submit Enquiry</button>
    </form>
  );
}