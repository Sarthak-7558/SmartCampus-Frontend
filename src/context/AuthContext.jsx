import { createContext, useContext, useEffect, useState } from "react";
import { decodeJwt } from "../utils/JwtUtils";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Hi I am sakshi

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = decodeJwt(token);

        if (decoded?.sub && decoded?.role) {
          setUser({
            email: decoded.sub,
            role: decoded.role, // STUDENT / STAFF / ADMIN
          });
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
