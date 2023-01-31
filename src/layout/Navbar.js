import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { BsFillBellFill } from "react-icons/bs";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignout } from "../hooks/useSignout";
import { useUserDataContext } from "../hooks/useUserDataContext";
import useFetchStudents from "../hooks/useFetchStudents";
import { Badge } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

const NavBar = () => {
  const { user } = useAuthContext();
  const { name, userType, quizHistory } = useUserDataContext();

  console.log("userType navbar usertype: ", user);

  const { pendingStudents } = useFetchStudents();

  console.log(pendingStudents);

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

            {user && userType === "teacher" && (
              <li>
                <Link to="/new-student">
                  <Badge color="error" badgeContent={pendingStudents.length}>
                    <NotificationsRoundedIcon></NotificationsRoundedIcon>
                  </Badge>
                </Link>
              </li>
            )}
          </ul>
          {user && userType === "student" && (
            <Link to="/my-scores">
              <button className="iskor-btn">Mga&nbsp;Iskor</button>
            </Link>
          )}

          {user && (
            <>
              <div className="user">
                <h3>{name?.firstName}</h3>
                <button onClick={handleSignout} className="logout-btn">
                  Signout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
