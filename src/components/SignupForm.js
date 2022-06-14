import React, { useState } from "react";
import "./SignupForm.css";

const SignupForm = ({ userType, setUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(userType);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-form">
      <h2>
        Himo account bilang{" "}
        {userType === "Teacher" ? "Manunudlo" : "Estudyante"}
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />
        </label>
        <label>
          Last Name
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
          />
        </label>
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </label>

        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <div>
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
