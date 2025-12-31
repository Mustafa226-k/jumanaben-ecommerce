import React from 'react';
import "../style/Footer.css";

// Static footer data - Easy to edit and make dynamic later
const footerData = {
  about: {
    title: "About Us",
    description: "Jumanaben is your premier destination for stylish and affordable fashion. We curate the latest trends to bring you quality clothing that expresses your unique style."
  },
  quickLinks: [
    { name: "Home", link: "#" },
    { name: "Products", link: "#" },
    { name: "Categories", link: "#" },
    { name: "Contact", link: "#" }
  ],
  categories: [
    { name: "Men's Fashion", link: "#" },
    { name: "Women's Fashion", link: "#" },
    { name: "Kids' Collection", link: "#" },
    { name: "Accessories", link: "#" }
  ],
  contact: {
    email: "info@jumanaben.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fashion Street, Style City, SC 12345"
  },
  socialLinks: [
    { name: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { name: "Twitter", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" }
  ]
};

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* About Us Section */}
          <div className="footer-column">
            <h3 className="footer-title">About Us</h3>
            <p className="footer-description">{footerData.about.description}</p>
            <div className="social-links">
              {footerData.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="social-link"
                  aria-label={social.name}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.link} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Section */}
          <div className="footer-column">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              {footerData.categories.map((category, index) => (
                <li key={index}>
                  <a href={category.link} className="footer-link">
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-column">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-contact">
              <li className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="contact-icon">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{footerData.contact.email}</span>
              </li>
              <li className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="contact-icon">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9842 21.5573 21.2126 21.3528 21.3992C21.1483 21.5857 20.9074 21.7262 20.6446 21.8117C20.3818 21.8972 20.1028 21.9258 19.83 21.895C16.7435 21.4837 13.787 20.4471 11.19 18.855C8.77382 17.3147 6.72534 15.2662 5.185 12.85C3.58297 10.2412 2.54962 7.27099 2.145 4.17C2.11419 3.89723 2.14277 3.61817 2.22832 3.35539C2.31387 3.09261 2.45434 2.85172 2.64088 2.64721C2.82743 2.4427 3.05584 2.27908 3.31084 2.16749C3.56584 2.0559 3.84152 1.99889 4.12 2H7.12C7.68145 1.99522 8.22009 2.16708 8.65873 2.48754C9.09737 2.808 9.41407 3.26145 9.565 3.78C9.80379 4.69608 10.3151 5.53697 11.0375 6.2035C11.7599 6.87003 12.6664 7.33649 13.65 7.55C14.1695 7.69751 14.6232 8.01136 14.9425 8.44822C15.2617 8.88508 15.4312 9.42269 15.425 9.985V12.985C15.4191 13.2637 15.3616 13.5392 15.2552 13.796C15.1488 14.0528 14.9954 14.2865 14.8028 14.4855C14.6103 14.6845 14.3819 14.8454 14.1295 14.9598C13.8771 15.0741 13.6051 15.1399 13.328 15.153C12.8593 15.1729 12.3934 15.0828 11.9678 14.8896C11.5421 14.6964 11.1682 14.4054 10.875 14.04L9.785 12.95C9.49498 12.6524 9.30248 12.2764 9.23149 11.8725C9.1605 11.4686 9.21403 11.0547 9.385 10.68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{footerData.contact.phone}</span>
              </li>
              <li className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="contact-icon">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{footerData.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Jumanaben. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

