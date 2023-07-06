import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";

import "../Signup/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignupDetails = (e) => {
    setSignupDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    console.log(signupDetails);
    try {
      const result = await axios.post("/api/auth/signup", signupDetails);
      setUser({
        user: result.data.createdUser,
        token: result.data.encodedToken,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="signup-card ">
        <div className="signup-field">
          <label>First Name:</label>
          <input
            name="firstName"
            onChange={handleSignupDetails}
            value={signupDetails.firstName}
            placeholder="Enter first name"
          />
        </div>
        <div className="signup-field">
          <label>Last Name:</label>
          <input
            name="lastName"
            onChange={handleSignupDetails}
            value={signupDetails.lastName}
            placeholder="Enter last name"
          />
        </div>
        <div className="signup-field">
          <label>E-mail:</label>
          <input
            name="email"
            onChange={handleSignupDetails}
            value={signupDetails.email}
            placeholder="Enter e-mail"
          />
        </div>
        <div className="signup-field">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleSignupDetails}
            value={signupDetails.password}
            placeholder="Enter password"
          />
        </div>
        <div className="signup-btn-container">
          <button className="signup-btn" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
        <div className="alt-section">
          Already a user? <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Signup;
