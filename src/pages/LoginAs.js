import React from "react";
import { Link } from "react-router-dom";
import teachers from "../assets/images/teachers.svg";
import students from "../assets/images/students.svg";
import "./LoginAs.css";

const LoginAs = () => {
  return (
    <main className="LoginAs">
      <div className="container">
        <Link to="/teacher-login">
          <div className="teacher-button">
            <h3>Manunudlo</h3>
            <p>(Teacher)</p>
            <img src={teachers} alt="" />
          </div>
        </Link>
        <Link to="/student-login">
          <div className="student-button">
            <h3>Estudyante</h3>
            <p>(Student)</p>
            <img src={students} alt="" />
          </div>
        </Link>
      </div>
    </main>
  );
};

export default LoginAs;
