import { createContext, useContext, useState } from "react";

const DEFAULT_USER = { user: null, token: null };

const createAuth = createContext(DEFAULT_USER);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEFAULT_USER);

  return (
    <createAuth.Provider value={{ user, setUser }}>
      {children}
    </createAuth.Provider>
  );
};

export const useAuth = () => useContext(createAuth);
