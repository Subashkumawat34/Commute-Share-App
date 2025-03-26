import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.css";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../utils/api";
import { signInWithGoogle, signInWithGithub } from "../utils/firebase";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  // 🔹 Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      localStorage.setItem("token", user.uid); // Store user ID as token
      setIsLoggedIn(true);
      navigate("/app/request-ride");
    } catch (err) {
      setError("Google Sign-In failed.");
    }
  };

  // 🔹 Handle GitHub Login
  const handleGithubLogin = async () => {
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

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/app/request-ride");
      } else {
        setError("Login failed: " + (data.message || "Invalid credentials"));
      }
    } catch (error) {
      setError("Login failed: An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>What's your Email or Password?</h2>
      <form onSubmit={handleSubmit}>
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
            placeholder="Enter your Password..."
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <ErrorMessage message={error} />}
        <button type="submit" disabled={loading} className={styles.loginButton}>
          {loading ? <LoadingSpinner /> : "Continue"}
        </button>
      </form>

      {/* 🔹 Google & GitHub Login Buttons */}
      <div className={styles.oauthButtons}>
        <button onClick={handleGoogleLogin} className={styles.googleButton}>
          <i className="fab fa-google"></i> <div>Continue with GitHub</div>
        </button>
        <button onClick={handleGithubLogin} className={styles.githubButton}>
          <i className="fab fa-github"></i> <div>Continue with GitHub</div>
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

export default LoginPage;
