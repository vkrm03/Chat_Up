import React from 'react';
import { Link } from 'react-router-dom';
import './assets/NavBar.css';

function NavBar() {
    return (
        <div className="nav">
            <h2><Link to="/" className="nav-logo"><i className="fas fa-comments"></i> ChatUp</Link></h2>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/" className="nav-item">Home</Link></li>
                    <li><Link to="/register" className="nav-item">Register</Link></li>
                    <li><Link to="/login" className="nav-item">Login</Link></li>
                </ul>
            </nav>
            <button className="nav-btn"><Link to="/chat" className="nav-btn-link">Chat Now</Link></button>
        </div>
    );
}

export default NavBar;
