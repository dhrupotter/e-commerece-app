import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../contexts/auth.context";

const Signup = () => {
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
      console.log(result);
      setUser({
        user: result.data.createdUser,
        token: result.data.encodedToken,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user);

  return (
    <>
      <div>
        <div>
          First Name:
          <input
            name="firstName"
            onChange={handleSignupDetails}
            value={signupDetails.firstName}
            placeholder="Enter first name"
          />
        </div>
        <div>
          Last Name:
          <input
            name="lastName"
            onChange={handleSignupDetails}
            value={signupDetails.lastName}
            placeholder="Enter last name"
          />
        </div>
        <div>
          E-mail:
          <input
            name="email"
            onChange={handleSignupDetails}
            value={signupDetails.email}
            placeholder="Enter e-mail"
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleSignupDetails}
            value={signupDetails.password}
            placeholder="Enter password"
          />
        </div>
        <button onClick={handleSubmit}>Sign Up</button>
      </div>
    </>
  );
};

export default Signup;
