import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "truesight-auth";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });
  const [role, setRole] = useState(null);

  const handleSetIsLoggedIn = (value) => {
    setIsLoggedIn(value);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_STORAGE_KEY, String(value));
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn: handleSetIsLoggedIn, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}
