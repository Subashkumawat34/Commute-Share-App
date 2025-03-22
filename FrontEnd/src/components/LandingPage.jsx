import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LandingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <h1>Welcome to Our Ride-Sharing App</h1>
      <p>Find daily commutes with ease!</p>
      <div className={styles.buttons}>
        <Link to="/login" className={styles.button}>
          Login
        </Link>
        <Link to="/register" className={styles.button}>
          Register
        </Link>
      </div>
    </div>
  );
}


export default LandingPage;