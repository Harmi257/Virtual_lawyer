import React, { useState } from 'react';
import axios from 'axios';
import './BookingList.css';

const BookingList = () => {
  const [searchType, setSearchType] = useState('client');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (!searchTerm) {
      setMessage('Please enter a search term');
      return;
    }

    try {
      const url = searchType === 'client'
        ? `http://localhost:8080/api/bookings/client/${encodeURIComponent(searchTerm)}`
        : `http://localhost:8080/api/bookings/lawyer/${encodeURIComponent(searchTerm)}`;

      const response = await axios.get(url);
      setBookings(response.data);
      setMessage(response.data.length === 0 ? 'No bookings found' : '');
    } catch (err) {
      setMessage('Error fetching bookings');
      setBookings([]);
    }
  };

  return (
    <div className="booking-list-container">
      <h2>Search Bookings</h2>
      <div className="booking-search-controls">
        <select value={searchType} onChange={e => setSearchType(e.target.value)}>
          <option value="client">By Client Email</option>
          <option value="lawyer">By Lawyer Name</option>
        </select>
        <input
          placeholder={searchType === 'client' ? 'Client Email' : 'Lawyer Name'}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <p className="booking-message">{message}</p>

      <ul className="booking-list">
        {bookings.map(booking => (
          <li key={booking.id}>
            <strong>Client:</strong> {booking.clientName} ({booking.clientEmail})<br />
            <strong>Lawyer:</strong> {booking.lawyerName}<br />
            <strong>Date/Time:</strong> {new Date(booking.bookingDateTime).toLocaleString()}<br />
            <strong>Status:</strong> {booking.status}<br />
            <strong>Case Details:</strong> {booking.caseDetails}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
