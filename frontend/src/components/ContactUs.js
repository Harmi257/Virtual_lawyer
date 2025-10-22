import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [showHours, setShowHours] = useState(false);

  const weeklyHours = {
    Sunday: 'Closed',
    Monday: '09:00 am – 05:00 pm',
    Tuesday: '09:00 am – 05:00 pm',
    Wednesday: '09:00 am – 05:00 pm',
    Thursday: '09:00 am – 05:00 pm',
    Friday: '09:00 am – 05:00 pm',
    Saturday: '10:00 am – 02:00 pm',
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayHours = weeklyHours[today];

  return (
    <div className="contact-us">
      <h1 className="brand-title">THE VIRTUAL LAWYER</h1>
      <hr className="thin-line" />
      <p className="page-path">Contact Us</p>

      <h2 className="office-address">
        HEAD OFFICE– OFFICE NO-90, 1ST FLOOR, SECTOR-3, WAVE GALLERIA,<br />
        WAVE CITY, GHAZIABAD, UP–201002
      </h2>

      <div className="whatsapp-button">
        <a
          href="https://wa.me/919385935800"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>📩 Message us on WhatsApp</button>
        </a>
      </div>

      <div className="company-info">
        <h3>THE VIRTUAL LAWYERS</h3>
        <p>
          Head Office: Office No-90, 1st Floor, Sector-3, Wave Galleria, Wave City, Ghaziabad, UP–201002<br />
          Branch Office: B-4, G/F, Kalkaji, Delhi–110019
        </p>
        <p>
          Contact No: <a href="tel:+919385935800">+91 9385935800</a>
        </p>
        <p>
          E-Mail: <a href="mailto:harmiramadass@gmail.com">harmiramadass@gmail.com</a>
        </p>
      </div>

      <div className="hours">
        <h3 onClick={() => setShowHours(!showHours)} style={{ cursor: 'pointer' }}>
          HOURS ▾
        </h3>
        <p>
          Open today <strong>{todayHours}</strong>
        </p>

        {showHours && (
          <ul className="hours-dropdown">
            {Object.entries(weeklyHours).map(([day, hours]) => (
              <li key={day}>
                <strong>{day}:</strong> {hours}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
