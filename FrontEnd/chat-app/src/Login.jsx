import React from 'react';
import './assets/Login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to ChatUp</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">
              <i className="fa-solid fa-user"></i> Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
