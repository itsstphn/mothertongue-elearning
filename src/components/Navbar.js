import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="Navbar">
      <div className="container">
        <Link to="/">
          <h1 className="brand-name">Mother Tongue E-Learning</h1>
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>About</li>
          <li>Subjects</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
