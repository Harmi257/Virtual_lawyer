import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import lawyersData from '../data/db.json';

const greyStickyColors = ['#e0e0e0', '#d6d6d6', '#cccccc', '#bdbdbd', '#b0b0b0'];

const FindLawyer = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const navigate = useNavigate();
  const lawyers = lawyersData[selectedTopic] || [];

  // Load from localStorage
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
    const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
    setLikes(storedLikes);
    setComments(storedComments);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [likes, comments]);

  const handleChange = (e) => setSelectedTopic(e.target.value);

  const handleLike = (idx) => {
    const updatedLikes = {
      ...likes,
      [idx]: (likes[idx] || 0) + 1,
    };
    setLikes(updatedLikes);
  };

  const handleCommentChange = (idx, value) => {
    setNewComment((prev) => ({
      ...prev,
      [idx]: value,
    }));
  };

  const handleCommentSubmit = (idx) => {
    const comment = newComment[idx];
    if (!comment?.trim()) return;

    const updatedComments = {
      ...comments,
      [idx]: [...(comments[idx] || []), comment.trim()],
    };
    setComments(updatedComments);
    setNewComment((prev) => ({ ...prev, [idx]: '' }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ marginBottom: '1rem' }}>Find a Lawyer</h2>

      <label htmlFor="topic-select" style={{ fontWeight: 'bold' }}>
        Select Legal Topic:
      </label>
      <br />
      <select
        id="topic-select"
        value={selectedTopic}
        onChange={handleChange}
        style={{
          padding: '8px 12px',
          marginTop: '5px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: '2px solid #ddd',
          fontSize: '16px',
          cursor: 'pointer',
          minWidth: '220px',
        }}
      >
        <option value="">--Choose a topic--</option>
        {Object.keys(lawyersData).map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      {selectedTopic && (
        <>
          <h3 style={{ marginBottom: '15px' }}>Lawyers for: {selectedTopic}</h3>
          {lawyers.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {lawyers.map((lawyer, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: greyStickyColors[idx % greyStickyColors.length],
                    boxShadow: '5px 5px 10px rgba(0,0,0,0.1)',
                    padding: '15px',
                    width: '260px',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#333',
                    position: 'relative',
                    fontFamily: "'Comic Sans MS', cursive, sans-serif",
                    transform: `rotate(${(idx % 3 - 1) * 2}deg)`,
                    userSelect: 'none',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={lawyer.photo}
                    alt={lawyer.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginBottom: '12px',
                      border: '3px solid white',
                      boxShadow: '0 0 6px rgba(0,0,0,0.1)',
                    }}
                  />
                  <h4 style={{ margin: '0 0 10px 0', fontWeight: '700' }}>{lawyer.name}</h4>
                  <p><strong>Phone:</strong> {lawyer.phone}</p>
                  <p><strong>Email:</strong> {lawyer.email}</p>
                  <p><strong>Experience:</strong> {lawyer.experience}</p>

                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <button
                      onClick={() => handleLike(idx)}
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                        padding: '6px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        boxShadow: '1px 1px 5px rgba(0,0,0,0.1)',
                      }}
                      title="Like"
                    >
                      👍 {likes[idx] || 0}
                    </button>
                  </div>

                  <button
                    onClick={() => navigate("/booking/new")}
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginBottom: '10px',
                      marginTop: '10px'
                    }}
                  >
                    Book Now
                  </button>

                  {/* Comment Box */}
                  <textarea
                    value={newComment[idx] || ''}
                    onChange={(e) => handleCommentChange(idx, e.target.value)}
                    placeholder="Write a comment..."
                    style={{
                      width: '100%',
                      minHeight: '60px',
                      borderRadius: '6px',
                      padding: '6px',
                      fontSize: '14px',
                      marginTop: '10px',
                      border: '1px solid #ccc',
                    }}
                  />
                  <button
                    onClick={() => handleCommentSubmit(idx)}
                    style={{
                      marginTop: '6px',
                      padding: '6px 10px',
                      backgroundColor: 'black',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    Post Comment
                  </button>

                  {/* Comment List */}
                  {comments[idx]?.length > 0 && (
                    <div style={{ marginTop: '10px', width: '100%', textAlign: 'left' }}>
                      <strong>Comments:</strong>
                      <ul style={{ paddingLeft: '18px', marginTop: '6px' }}>
                        {comments[idx].map((c, i) => (
                          <li key={i} style={{ fontSize: '13px', marginBottom: '4px' }}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No lawyers found for this topic.</p>
          )}
        </>
      )}
    </div>
  );
};

export default FindLawyer;
