import React, { useState } from "react";
import "./Signup.css";
import { useSignup } from "./../hooks/useSignup";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");

  const { signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(firstName, lastName, email, password, userType);
  };

  return (
    <div className="signup-form">
      <h2>Himo account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p className="label-text">First Name</p>
          <input
            value={firstName}
            onChange={(e) =>
              setFirstName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            type="text"
          />
        </label>
        <label>
          <p className="label-text">Last Name</p>
          <input
            value={lastName}
            onChange={(e) =>
              setLastName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            type="text"
          />
        </label>
        <label>
          <p className="label-text">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </label>

        <label>
          <p className="label-text"> Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <label className="select-container">
          Himo account bilang
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="student">Estudyante</option>
            <option value="teacher">Manunudlo</option>
          </select>
        </label>
        <div>
          <button type="submit">Himo Account</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
