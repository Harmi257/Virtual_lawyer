import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import BookingStatusUpdate from './components/BookingStatusUpdate';
import ChatbotPage from './components/ChatbotPage';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import IPCSections from './components/IPCSections';
import FindLawyer from './components/FindLawyer'; // Import the new component
import IPCDetail from './components/IPCDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          {/* Booking routes */}
          <Route path="/booking/new" element={<BookingForm />} />
          <Route path="/booking/list" element={<BookingList />} />
          <Route path="/booking/update-status" element={<BookingStatusUpdate />} />

          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* IPC Laws route */}
          <Route path="/ipc" element={<IPCSections />} />
          <Route path="/ipc/:articleNumber" element={<IPCDetail />} />

          {/* Find a Lawyer route */}
          <Route path="/find-lawyer" element={<FindLawyer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
