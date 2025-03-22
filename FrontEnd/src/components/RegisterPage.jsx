import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.css";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../context/AuthContext"; //Import AuthContext
import { registerUser } from "../utils/api"; // Centralize API calls

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext); //Use context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(name, email, password); //Use api function

      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true); // Update global login state
        navigate("/app/request-ride");
      } else {
        setError("Registration failed: " + (data.message || ""));
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed: An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authform}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          {loading ? <LoadingSpinner /> : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;