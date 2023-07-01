import React, { useState } from "react";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";

const Auth = () => {
  const [mode, setMode] = useState("LOGIN");
  return (
    <div>
      {mode === "LOGIN" ? (
        <Login setMode={setMode} />
      ) : (
        <Signup setMode={setMode} />
      )}
      {/* {mode === "LOGIN" ? (
        <>
          Not already a User?{" "}
          <button onClick={() => setMode("SIGNUP")}>Signup</button>
        </>
      ) : (
        <>
          Already a User?{" "}
          <button onClick={() => setMode("LOGIN")}>Login</button>
        </>
      )} */}
    </div>
  );
};

export default Auth;
