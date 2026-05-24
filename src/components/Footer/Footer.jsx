import React from 'react';
import './Footer.css';

const Footer = () => {
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <footer className="footer-container">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">Golden Hour <span>Bistro</span></h2>
            <p className="footer-tagline">Crafting moments of warmth in every cup.</p>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Experience</h4>
              <a href="/">Our Story</a>
              <a href="/menu">Menu</a>
              <a href="/bookings">Reservations</a>
            </div>
            <div className="link-group">
              <h4>Contact</h4>
              <p>123 Bistro Lane</p>
              <p>Golden Heights, GH</p>
              <a href="tel:+1234567890" className="phone">+1 (234) 567-890</a>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Join the Circle</h4>
            {!isSubscribed ? (
              <>
                <p>Exclusive updates and seasonal menu reveals.</p>
                <form className="minimal-form" onSubmit={handleSubmit}>
                  <input type="email" placeholder="Email Address" required />
                  <button type="submit">Join</button>
                </form>
              </>
            ) : (
              <div className="success-message animate-in fade-in slide-in-from-bottom-4 duration-700">
                <p className="text-gh-gold font-heading text-xl">Welcome to the inner circle.</p>
                <p className="text-gray-500 text-sm italic mt-2">Expect a touch of warmth in your inbox soon.</p>
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Golden Hour. Artisanal & Craft.</p>
          <div className="legal-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
