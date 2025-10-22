import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const IPCSections = () => {
  const [ipcLaws, setIpcLaws] = useState([]);

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/laws');
        setIpcLaws(response.data);
      } catch (error) {
        console.error('Error fetching IPC laws:', error);
      }
    };

    fetchLaws();
  }, []);

  return (
    <div style={{ backgroundColor: 'white', color: 'black', padding: '2rem', borderRadius: '10px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>Popular IPC Sections</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {ipcLaws.slice(0, 20).map((law) => (
          <Link
            key={law._id}
            to={`/ipc/${law.articleNumber}`}
            style={{
              backgroundColor: '#f0f0f0',
              padding: '1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'black',
              display: 'block',
            }}
          >
            <p style={{ fontWeight: 'bold' }}>Article {law.articleNumber}: {law.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IPCSections;
