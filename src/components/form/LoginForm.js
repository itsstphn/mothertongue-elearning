import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate, Link } from "react-router-dom";
import useSignin from "../../hooks/useSignin";

const LoginForm = ({ loginType, setUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signin, error, isPending } = useSignin();

    const handleSubmit = (e) => {
        e.preventDefault();
        signin(email, password);
    };

    return (
        <div className="login-form">
            <h2>
                Login bilang{" "}
                {loginType === "Teacher" ? "Manunudlo" : "Estudyante"}
            </h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
            <Link to="/signup">
                <div className="btn-create-account">
                    Gusto Ko Maghimo Account
                </div>
            </Link>
        </div>
    );
};

export default LoginForm;
