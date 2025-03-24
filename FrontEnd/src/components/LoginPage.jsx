// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../styles/LoginPage.module.css";
// import ErrorMessage from "./ErrorMessage";
// import LoadingSpinner from "./LoadingSpinner";
// import { AuthContext } from "../context/AuthContext";
// import { loginUser } from "../utils/api";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { setIsLoggedIn } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const data = await loginUser(email, password);
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         setIsLoggedIn(true);
//         navigate("/app/request-ride");
//       } else {
//         setError("Login failed: " + (data.message || "Invalid credentials"));
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Login failed: An unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.loginContainer}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         {error && <ErrorMessage message={error} />}
//         <button type="submit" disabled={loading} className={styles.loginButton}>
//           {loading ? <LoadingSpinner /> : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;









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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <ErrorMessage message={error} />}
        <button type="submit" disabled={loading} className={styles.loginButton}>
          {loading ? <LoadingSpinner /> : "Login"}
        </button>
      </form>

      {/* 🔹 Google & GitHub Login Buttons */}
      <div className={styles.oauthButtons}>
        <button onClick={handleGoogleLogin} className={styles.googleButton}>Login with Google</button>
        <button onClick={handleGithubLogin} className={styles.githubButton}>Login with GitHub</button>
      </div>
    </div>
  );
}

export default LoginPage;
