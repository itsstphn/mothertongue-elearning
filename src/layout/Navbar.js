import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignout } from "../hooks/useSignout";
import { useUserDataContext } from "../hooks/useUserDataContext";

const NavBar = () => {
  const { user } = useAuthContext();
  const { name } = useUserDataContext();
  console.log("name", name?.firstName);

  const { signout } = useSignout();

  const handleSignout = () => {
    signout();
  };
  return (
    <nav className="Navbar">
      <div className="container">
        <Link to="/">
          <h1 className="brand-name">Mother Tongue E-Learning</h1>
        </Link>
        <div className="left-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          {user && (
            <div className="user">
              <h3>{name?.firstName}</h3>
              <button onClick={handleSignout} className="logout-btn">
                Signout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
