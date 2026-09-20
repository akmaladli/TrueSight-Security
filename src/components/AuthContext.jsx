import { createContext, useContext, useMemo, useState } from "react";

const AUTH_STORAGE_KEY = "truesight-auth";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  const login = () => {
    setIsLoggedIn(true);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
    }),
    [isLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
