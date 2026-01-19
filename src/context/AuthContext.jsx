import { createContext, useContext, useEffect, useState } from "react";

// helper to decode JWT safely
const decodeJwt = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // ✅ IMPORTANT
  const [loading, setLoading] = useState(true);

  // 🔄 Restore auth on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const decoded = decodeJwt(storedToken);

      if (decoded?.sub && decoded?.role) {
        setToken(storedToken);
        setUser({
          email: decoded.sub,
          role: decoded.role,
        });
      } else {
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN
  const login = (jwtToken) => {
    const decoded = decodeJwt(jwtToken);

    if (!decoded?.sub || !decoded?.role) {
      throw new Error("Invalid token");
    }

    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setUser({
      email: decoded.sub,
      role: decoded.role,
    });
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,                // ✅ NOW AVAILABLE
        isAuthenticated: !!token,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
