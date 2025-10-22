// src/components/BookingStatusUpdate.js
import React, { useState } from 'react';
import axios from 'axios';
import './BookingStatusUpdate.css';

const BookingStatusUpdate = () => {
  const [bookingId, setBookingId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    if (!bookingId || !status) {
      setMessage('Please enter booking ID and status');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/bookings/${bookingId}/status?status=${encodeURIComponent(status)}`);
      setMessage('Booking status updated successfully!');
      setBookingId('');
      setStatus('');
    } catch (err) {
      setMessage('Failed to update status: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="status-update-container"> {/* ✅ Apply class */}
      <h2>Update Booking Status</h2>
      <input
        type="number"
        placeholder="Booking ID"
        value={bookingId}
        onChange={e => setBookingId(e.target.value)}
      />
      <input
        type="text" // ✅ specify type explicitly for styling
        placeholder="New Status (PENDING, CONFIRMED, CANCELLED, COMPLETED)"
        value={status}
        onChange={e => setStatus(e.target.value.toUpperCase())}
      />
      <button onClick={handleUpdate}>Update Status</button>
      <p>{message}</p>
    </div>
  );
};

export default BookingStatusUpdate;
