import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import heroImage from '../assets/home1.jpg';
import lawyersData from '../data/db.json'; 

const Home = () => {
  const [showCookiePopup, setShowCookiePopup] = useState(true);
  const menuRef = useRef(null);

  const handleAcceptCookies = () => {
    setShowCookiePopup(false);
  };

  const scrollCarousel = (direction) => {
    const carousel = document.getElementById('carousel');
    const scrollAmount = 300;
    carousel.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Reserved for future use
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ✅ Flatten all lawyers from all categories into one list
  const allLawyers = Object.values(lawyersData).flat();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <img src={heroImage} alt="Law books and justice scale" className="hero-image" />
        {showCookiePopup && (
          <div className="cookie-popup">
            <h3>THIS WEBSITE USES COOKIES.</h3>
            <p>
              We use cookies to analyze website traffic and optimize your website experience.
              By accepting our use of cookies, your data will be aggregated with all other user data.
            </p>
            <button onClick={handleAcceptCookies}>Accept</button>
          </div>
        )}
      </div>

      {/* All Lawyers Section */}
      <section className="articles-section">
        <h2>Our Lawyers</h2>
        <div className="articles-slider-wrapper">
          <button className="slider-arrow left" onClick={() => scrollCarousel(-1)}>&#10094;</button>
          <div className="articles-slider" id="carousel">
            {allLawyers.map((lawyer, index) => (
              <div className="article-card" key={index}>
                <img src={lawyer.photo} alt={lawyer.name} className="author-image" />
                <h4 className="article-title">{lawyer.name}</h4>
                <p>{lawyer.experience} experience</p>
                <p>{lawyer.email}</p>
                <p>{lawyer.phone}</p>
                <button className="read-link" onClick={() => alert(`Contacting ${lawyer.name}`)}>
                  Contact Now
                </button>
              </div>
            ))}
          </div>
          <button className="slider-arrow right" onClick={() => scrollCarousel(1)}>&#10095;</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 The Virtual Lawyer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
