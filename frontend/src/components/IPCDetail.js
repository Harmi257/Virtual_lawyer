import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const IPCDetail = () => {
  const { articleNumber } = useParams();
  const [law, setLaw] = useState(null);

  useEffect(() => {
    const fetchLaw = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/laws');
        const foundLaw = response.data.find(item => item.articleNumber === articleNumber);
        setLaw(foundLaw);
      } catch (error) {
        console.error('Error fetching law detail:', error);
      }
    };

    fetchLaw();
  }, [articleNumber]);

  if (!law) return <p>Loading...</p>;

  return (
    <div style={{ backgroundColor: 'white', color: 'black', padding: '2rem', borderRadius: '10px' }}>
      <Link to="/ipc" style={{ marginBottom: '1rem', display: 'inline-block' }}>← Back to IPC Sections</Link>
      <h2>Article {law.articleNumber}: {law.title}</h2>
      <h4>Field: {law.field}</h4>
      <p style={{ marginTop: '1rem' }}>{law.summary}</p>
    </div>
  );
};

export default IPCDetail;
