import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Mail, ArrowUpRight, Globe, MessageSquare } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Products: [
      { label: 'All Products', to: '/products' },
      { label: 'Wearables', to: '/products?category=Wearables' },
      { label: 'Computing', to: '/products?category=Computing' },
      { label: 'Audio', to: '/products?category=Audio' },
    ],
    Company: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Careers', to: '#' },
      { label: 'Press Kit', to: '#' },
    ],
    Support: [
      { label: 'Help Center', to: '#' },
      { label: 'Returns', to: '#' },
      { label: 'Warranty', to: '#' },
      { label: 'Track Order', to: '#' },
    ],
  };

  return (
    <footer className="footer" role="contentinfo">
      {/* Gradient Line */}
      <div className="footer__gradient-line" />

      <div className="footer__inner container">
        {/* Top Section */}
        <div className="footer__top">
          {/* Brand Column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-icon">
                <Cpu size={20} />
              </div>
              <span className="footer__logo-text font-display">
                NEXUS<span className="gradient-text">V</span>
              </span>
            </Link>
            <p className="footer__description">
              Next-generation spatial marketplace platform. Premium hardware for the modern era.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-btn" aria-label="GitHub">
                <Globe size={18} />
              </a>
              <a href="#" className="footer__social-btn" aria-label="Twitter">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="footer__social-btn" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div className="footer__column" key={title}>
              <h4 className="footer__column-title">{title}</h4>
              <ul className="footer__link-list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer__link">
                      {link.label}
                      <ArrowUpRight size={12} className="footer__link-arrow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} NEXUS VORTEX. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
