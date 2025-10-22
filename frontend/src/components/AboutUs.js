import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="about-container">

        <h2 className="about-subheading">ABOUT US</h2>
        <p>
          The Virtual Lawyers is an Indian Law Firm having offices in Delhi and Noida providing legal services to Indian and international clients. We distinguish ourselves based on the quality of our services and legal advice and on the range of our experience.
        </p>
        <p>
          Our litigation and arbitration/ alternative dispute resolution practice represents companies involved in business-critical lawsuits including IPR, taxation, white collar and government-facing litigation, Labor Law and all area of Legal Advice with focus on helping our clients’ businesses succeed.
        </p>
        <p>
          The Firm has access to network of high quality experienced lawyers in all major commercial cities of India. As such, the Firm in well placed to service the requirements of its clients across India in all fields of law as well as adequately equipped to handle cross-border transactions.
        </p>
        <p>
          The Virtual Lawyers are modern type firm who is more relying on replacing brick and mortar type offices that are reducing legal services cost.
        </p>
      </div>
      {/* Footer */}
      <footer className="footer">
        <p>© 2025 The Virtual Lawyer. All rights reserved.</p>
      </footer>
    </div>

  );
};

export default AboutUs;
