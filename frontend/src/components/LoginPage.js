import React, { useState } from "react";
import { Book } from "lucide-react";

const LoginPage = ({ handleLogin, setCurrentPage, loading }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Submitting login form...");

    try {
      const response = await handleLogin(email, password);
      console.log("Login response in LoginPage:", response);

      if (response && response.success) {
        console.log("Login successful, navigating to home...");
        setCurrentPage("home"); // or navigateTo('home') if using navigation hook
      } else {
        const errorMessage =
          response?.message || "Login failed. Please try again.";
        console.log("Login failed:", errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Login error in component:", error);
      setError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Book className="auth-icon" size={48} />
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your bookstore account</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: "100%", padding: "12px" }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="auth-link">
          <button
            onClick={() => setCurrentPage("register")}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
            }}
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
