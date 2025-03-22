import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.css";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { loginUser } from "../utils/api"; // Centralize API calls

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext); //Use context to manage login state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(email, password);  //Use the api function
      if (data.token) {
        localStorage.setItem("token", data.token); // Store the token
        setIsLoggedIn(true);  // Update global login state
        navigate("/app/request-ride"); // Redirect to main app area
      } else {
        setError("Login failed: " + (data.message || "Invalid credentials")); // Specific error message
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed: An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authform}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <ErrorMessage message={error} />}
        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;