import React, { useState } from 'react';
import axios from 'axios';
import './BookingForm.css';

const BookingForm = () => {
  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    lawyerName: '',
    lawyerEmail: '',
    bookingDateTime: '',
    caseDetails: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/bookings', {
        ...form,
        bookingDateTime: new Date(form.bookingDateTime).toISOString()
      });
      setMessage('Booking created successfully!');
      setForm({
        clientName: '',
        clientEmail: '',
        lawyerName: '',
        lawyerEmail: '',
        bookingDateTime: '',
        caseDetails: ''
      });
    } catch (err) {
      setMessage('Failed to create booking: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Create Booking</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={form.clientName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="clientEmail"
          placeholder="Client Email"
          value={form.clientEmail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lawyerName"
          placeholder="Lawyer Name"
          value={form.lawyerName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="lawyerEmail"
          placeholder="Lawyer Email"
          value={form.lawyerEmail}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="bookingDateTime"
          value={form.bookingDateTime}
          onChange={handleChange}
          required
        />
        <textarea
          name="caseDetails"
          placeholder="Case Details"
          value={form.caseDetails}
          onChange={handleChange}
        />
        <button type="submit">Create Booking</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default BookingForm;
