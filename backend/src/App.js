import React, { useState } from "react";
import { FaGavel, FaCalendarAlt, FaHome, FaPhoneAlt, FaBriefcase } from "react-icons/fa";
import "./App.css";

function Navbar({ title, onNavClick }) {
  return (
    <nav className="navbar">
      <h1><FaGavel /> {title}</h1>
      <ul>
        <li onClick={() => onNavClick("home")}><FaHome /> Home</li>
        <li onClick={() => onNavClick("services")}><FaBriefcase /> Services</li>
        <li onClick={() => onNavClick("contact")}><FaPhoneAlt /> Contact</li>
      </ul>
    </nav>
  );
}

function HomePage() {
  return (
    <section className="home-content">
      <h2><FaHome /> Welcome to Virtual Lawyer</h2>
      <p>Your one-stop solution for legal consultations, document preparation, and legal advice from experienced professionals.</p>
      <p>Book your consultation today and get expert legal guidance at your convenience.</p>
    </section>
  );
}

function BookingForm({ onSubmit }) {
  const [formData, setFormData] = useState({ name: "", email: "", date: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="booking-form">
      <h3><FaCalendarAlt /> Book a Consultation</h3>
      <form onSubmit={(e) => onSubmit(e, formData)}>
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <button type="submit">Book Now</button>
      </form>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="contact-content">
      <h2><FaPhoneAlt /> Contact Us</h2>
      <p>Email: support@virtuallawyer.com</p>
      <p>Phone: +123456789</p>
      <p>Address: PTU,Pillaichavadi,Puducherry-605004</p>
    </section>
  );
}

function App() {
  const [page, setPage] = useState("home");

  const handleFormSubmit = (e, formData) => {
    e.preventDefault();
    alert(`Consultation booked successfully for ${formData.name} on ${formData.date}!`);
  };

  return (
    <div className="container">
      <Navbar title="Virtual Lawyer" onNavClick={setPage} />
      {page === "home" && <HomePage />}
      {page === "services" && <BookingForm onSubmit={handleFormSubmit} />}
      {page === "contact" && <ContactPage />}
    </div>
  );
}

export default App;