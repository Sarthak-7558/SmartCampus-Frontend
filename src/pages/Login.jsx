import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAxios from "../api/AuthAxios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await authAxios.post("/api/auth/login", {
        email,
        password,
      });

      // ✅ BACKEND MUST RETURN { token, role }
      const { token, role } = res.data || {};

      if (!token || !role) {
        throw new Error("Invalid login response");
      }

      // ✅ Save token (ONLY token is stored)
      login(token);

      // ✅ Redirect based on role
      if (role === "STUDENT") navigate("/student");
      else if (role === "STAFF") navigate("/staff");
      else if (role === "ADMIN") navigate("/admin");
      else throw new Error("Unknown role");

    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Smart Campus Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-6 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
