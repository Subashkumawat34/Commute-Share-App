import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/RegisterPage.module.css";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../utils/api";
import { signInWithGoogle, signInWithGithub } from "../utils/firebase";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  // 🔹 Handle Google Registration/Login
  const handleGoogleRegister = async () => {
    try {
      const user = await signInWithGoogle();
      localStorage.setItem("token", user.uid);
      setIsLoggedIn(true);
      navigate("/app/request-ride");
    } catch (err) {
      setError("Google Sign-In failed.");
    }
  };

  // 🔹 Handle GitHub Registration/Login
  const handleGithubRegister = async () => {
    try {
      const user = await signInWithGithub();
      localStorage.setItem("token", user.uid);
      setIsLoggedIn(true);
      navigate("/app/request-ride");
    } catch (err) {
      setError("GitHub Sign-In failed.");
    }
  };

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
      const data = await registerUser(name, email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/app/request-ride");
      } else {
        setError("Registration failed: " + (data.message || ""));
      }
    } catch (error) {
      setError("Registration failed: An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>What's your Name, Email or Password?</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter your name......"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="Enter your email...."
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Generate your password..."
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <ErrorMessage message={error} />}
        <button
          type="submit"
          disabled={loading}
          className={styles.registerButton}
        >
          {loading ? <LoadingSpinner /> : "Continue"}
        </button>
      </form>

      {/* 🔹 Google & GitHub Registration Buttons */}
      <div className={styles.oauthButtons}>
        <button onClick={handleGoogleRegister} className={styles.googleButton}>
          <i className="fab fa-google"></i> Continue with Google
        </button>
        <button onClick={handleGithubRegister} className={styles.githubButton}>
          <i className="fab fa-github"></i> Continue with GitHub
        </button>
        <p className={styles.content}>
          By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
