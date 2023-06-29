import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../contexts/auth.context";

const Login = () => {
  const { setUser } = useAuth();
  const [loginDetails, setSignupDetails] = useState({
    email: "",
    password: "",
  });

  const handleLoginDetails = (e) => {
    setSignupDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    console.log(loginDetails);
    try {
      const result = await axios.post("/api/auth/login", loginDetails);
      console.log(result);
      setUser({ user: result.data.foundUser, token: result.data.encodedToken });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <div>
          E-mail:
          <input
            name="email"
            onChange={handleLoginDetails}
            value={loginDetails.email}
            placeholder="Enter e-mail"
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleLoginDetails}
            value={loginDetails.password}
            placeholder="Enter password"
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
      </div>
    </>
  );
};

export default Login;
