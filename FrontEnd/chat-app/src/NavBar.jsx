import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './assets/NavBar.css';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav">
      <h2 className="nav-brand">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <i className="fas fa-comments" aria-hidden="true"></i>
          <span className="brand-text">ChatUp</span>
        </Link>
      </h2>

      <button
        className={`hamburger ${menuOpen ? 'hidden' : ''}`}
        onClick={toggleMenu}
        aria-label="Open menu"
      >
        <span className="hamburger-icon" aria-hidden="true">&#9776;</span>
      </button>

      <nav className={`nav-menu ${menuOpen ? 'active' : ''}`} aria-hidden={!menuOpen && window.innerWidth <= 500}>
        <button className="menu-close" onClick={closeMenu} aria-label="Close menu">
          &times;
        </button>

        <ul className="nav-links">
          <li><Link to="/" className="nav-item" onClick={closeMenu}>Home</Link></li>
          {/* <li><Link to="/register" className="nav-item" onClick={closeMenu}>Register</Link></li>
          <li><Link to="/login" className="nav-item" onClick={closeMenu}>Login</Link></li> */}
          <div className="nav-menu-footer">
                <Link to="/chat" onClick={closeMenu} className="nav-btn">Chat Now</Link>
          </div>
        </ul>

        
      </nav>
    </header>
  );
}

export default NavBar;
