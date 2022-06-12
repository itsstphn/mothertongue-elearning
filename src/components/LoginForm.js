import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ loginType, setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    setError(null);
    e.preventDefault();
    if (loginType === "Teacher") {
      if (username === "teachermary" && password === "teacher123") {
        setUser(username);
        navigate("/");
      } else {
        setError("Username or Password is wrong!");
      }
    } else if (loginType === "Student") {
      if (username === "studentmary" && password === "student123") {
        setUser(username);
        navigate("/");
      } else {
        setError("Username or Password is wrong!");
      }
    }
  };

  return (
    <div className="login-form">
      <h2>Login as {loginType}</h2>
      <form onSubmit={handleSubmit}>
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
          {error && <p style={{ marginBottom: "5px" }}>{error}</p>}
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
