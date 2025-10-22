import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const menuRef = useRef(null);
  const bookingRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (bookingRef.current && !bookingRef.current.contains(event.target)) {
        setBookingOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar" style={{ position: 'relative', zIndex: 1000 }}>
      <div className="navbar-logo">THE VIRTUAL LAWYER</div>
      <ul
        className="navbar-menu"
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          margin: 0,
          padding: 0,
          position: 'relative',
          backgroundColor: '#fff',
          borderBottom: '1px solid #ddd',
        }}
      >
        <li className="active">
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/about">ABOUT US</Link>
        </li>
        <li>
          <Link to="/ipc">IPC SECTIONS</Link>
        </li>
        {/* FIND A LAWYER as simple link, no dropdown */}
        <li>
          <Link to="/find-lawyer">FIND A LAWYER</Link>
        </li>
       
        <li>
          <Link to="/contact-us">CONTACT US</Link>
        </li>

        {/* BOOK NOW Dropdown */}
        <li
          ref={bookingRef}
          className="dropdown"
          style={{ position: 'relative', cursor: 'pointer', userSelect: 'none' }}
        >
          <span onClick={() => setBookingOpen(!bookingOpen)}>BOOK NOW</span>
          {bookingOpen && (
            <ul
              className="dropdown-menu"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '0.5rem 1rem',
                listStyle: 'none',
                margin: 0,
                zIndex: 1000,
                minWidth: '180px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <li>
                <Link to="/booking/new" onClick={() => setBookingOpen(false)}>
                  Create Booking
                </Link>
              </li>
              <li>
                <Link to="/booking/list" onClick={() => setBookingOpen(false)}>
                  Search Bookings
                </Link>
              </li>
              <li>
                <Link to="/booking/update-status" onClick={() => setBookingOpen(false)}>
                  Update Booking Status
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* User Menu */}
        <li
          ref={menuRef}
          className="user-menu"
          style={{ position: 'relative', cursor: 'pointer', userSelect: 'none' }}
        >
          <FaUserCircle
            size={22}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: 'pointer' }}
          />
          {menuOpen && (
            <ul
              className="dropdown-menu"
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '0.5rem 1rem',
                listStyle: 'none',
                margin: 0,
                zIndex: 1000,
                minWidth: '150px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/account" onClick={() => setMenuOpen(false)}>
                  My Account
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
