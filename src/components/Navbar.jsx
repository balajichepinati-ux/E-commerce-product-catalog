import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag, Heart, Sun, Moon, Menu, X, Cpu,
  ShieldCheck, User, LayoutDashboard,
} from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { cart, wishlist, theme, toggleTheme, role, setRole, cartItemCount } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/categories', label: 'Categories' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="Nexus Vortex Home">
            <div className="navbar__logo-icon">
              <Cpu size={24} />
            </div>
            <span className="navbar__logo-text">
              NEXUS<span className="navbar__logo-accent">V</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="navbar__links nav-links-desktop">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
                end={link.to === '/'}
              >
                {link.label}
                <span className="navbar__link-indicator" />
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar__actions">
            {/* Role Toggle */}
            <button
              className="navbar__role-toggle"
              onClick={() => setRole(role === 'user' ? 'owner' : 'user')}
              aria-label={`Switch to ${role === 'user' ? 'owner' : 'user'} view`}
            >
              {role === 'owner' ? (
                <ShieldCheck size={14} className="navbar__role-icon--owner" />
              ) : (
                <User size={14} />
              )}
              <span className="navbar__role-label">
                {role === 'owner' ? 'OWNER' : 'USER'}
              </span>
            </button>

            {/* Admin Link */}
            {role === 'owner' && (
              <Link to="/admin" className="navbar__action-btn navbar__admin-link" aria-label="Admin Dashboard">
                <LayoutDashboard size={20} />
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              className="navbar__action-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="navbar__action-btn" aria-label={`Wishlist: ${wishlist.length} items`}>
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="navbar__badge navbar__badge--magenta">{wishlist.length}</span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="navbar__action-btn" aria-label={`Shopping cart: ${cartItemCount} items`}>
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="navbar__badge navbar__badge--cyan">{cartItemCount}</span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="navbar__hamburger nav-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="nav-mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="nav-mobile-menu glass-strong" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-mobile-link ${isActive ? 'nav-mobile-link--active' : ''}`
                }
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
