import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        {user && (
          <>
            <Link to="/post">Post Item</Link>
            <Link to="/myposts">My Posts</Link>
          </>
        )}
      </div>

      {/* Center welcome message */}
      {user && (
        <div className="nav-center">
          <span>Welcome {user.name || user.email}...</span>
        </div>
      )}

      {/* ✅ Right corner login/logout/register */}
      <div className="nav-right">
        {user ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;