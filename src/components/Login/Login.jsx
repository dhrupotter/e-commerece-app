import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../contexts/auth.context";
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loginDetails, setSignupDetails] = useState({
    email: "",
    password: "",
  });

  const guestUser = {
    email: "dhruvigandhi@gmail.com",
    password: "dhruvi1234",
  };

  const handleLoginDetails = (e) => {
    setSignupDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post("/api/auth/login", loginDetails);
      console.log(result);
      setUser({ user: result.data.foundUser, token: result.data.encodedToken });
    } catch (err) {
      console.log(err);
    }
    if (user.user !== null) {
      navigate("/products");
    } else {
      console.log("Username or password is invalid");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLoginAsGuest = async () => {
    try {
      const result = await axios.post("/api/auth/login", guestUser);
      setUser({
        user: result.data.foundUser,
        token: result.data.encodedToken,
      });
    } catch (err) {
      console.log(err);
    }
    navigate("/products");
  };

  return (
    <>
      <div className="login-card">
        <div className="login-field">
          <label>E-mail:</label>
          <input
            name="email"
            onChange={handleLoginDetails}
            value={loginDetails.email}
            placeholder="Enter e-mail"
          />
        </div>
        <div className="login-field">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleLoginDetails}
            value={loginDetails.password}
            placeholder="Enter password"
          />
        </div>
        <div className="login-btn-container">
          <button className="login-btn" onClick={handleSubmit}>
            Login
          </button>
          <button className="login-btn2" onClick={handleLoginAsGuest}>
            Login as Guest
          </button>
        </div>
        <div className="alt-section">
          Not a user? <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default Login;
