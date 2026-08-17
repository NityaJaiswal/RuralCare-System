import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "ruralcare_doctor_auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

      return storedAuth ? JSON.parse(storedAuth) : null;
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [auth]);

  const login = (authData) => {
    if (!authData?.token) {
      throw new Error("Authentication token is required.");
    }

    if (authData.role && authData.role !== "doctor") {
      throw new Error("Only doctor accounts can access this application.");
    }

    setAuth({
      token: authData.token,
      role: "doctor",
      doctor: authData.doctor ?? null,
    });
  };

  const logout = () => {
    setAuth(null);
  };

  const value = useMemo(
    () => ({
      token: auth?.token ?? null,
      role: auth?.role ?? null,
      doctor: auth?.doctor ?? null,
      isAuthenticated: Boolean(auth?.token),
      login,
      logout,
    }),
    [auth],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}