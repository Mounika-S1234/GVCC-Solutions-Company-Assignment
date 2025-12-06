import { useEffect, useState } from 'react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await fetch('/api/enquiries', {
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_TOKEN}`
          }
        });

        if (!res.ok) {
          throw new Error("Unauthorized or failed request");
        }

        const data = await res.json();
        setEnquiries(data.enquiries || data); // depending on backend response
      } catch (err) {
        setError('Failed to fetch enquiries (Unauthorized or server error)');
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  if (loading) return <p>Loading enquiries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin: Customer Enquiries ({enquiries.length})</h2>
      {enquiries.length === 0 ? (
        <p>No enquiries have been submitted yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th style={{ padding: '8px' }}>Product</th>
              <th style={{ padding: '8px' }}>Name</th>
              <th style={{ padding: '8px' }}>Email</th>
              <th style={{ padding: '8px' }}>Message</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e) => (
              <tr key={e.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{e.product_name}</td>
                <td style={{ padding: '8px' }}>{e.name}</td>
                <td style={{ padding: '8px' }}>{e.email}</td>
                <td style={{ padding: '8px' }}>{e.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
