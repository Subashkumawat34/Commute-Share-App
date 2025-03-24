import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LandingPage.module.css";

function LandingPage() {
  const [text, setText] = useState("");
  const [isReversing, setIsReversing] = useState(false);
  const fullText = "Welcome to Our Ride-Sharing App";
  const animationSpeed = 100;
  const animationFrameIdRef = useRef(null); // Use a ref to store the animation frame ID

  useEffect(() => {
    const animateText = () => {
      if (!isReversing) {
        if (text.length < fullText.length) {
          setText((prevText) => fullText.substring(0, prevText.length + 1));
          animationFrameIdRef.current = setTimeout(animateText, animationSpeed);
        } else {
          setIsReversing(true);
          animationFrameIdRef.current = setTimeout(animateText, animationSpeed);
        }
      } else {
        if (text.length > 0) {
          setText((prevText) => fullText.substring(0, prevText.length - 1));
          animationFrameIdRef.current = setTimeout(animateText, animationSpeed);
        } else {
          setIsReversing(false);
          animationFrameIdRef.current = setTimeout(animateText, animationSpeed);
        }
      }
    };

    // Start animation
    animationFrameIdRef.current = setTimeout(animateText, animationSpeed);

    return () => {
      clearTimeout(animationFrameIdRef.current);
    };
  }, [isReversing, fullText, animationSpeed]);

  return (
    <div className={styles.landingPage}>
      <div className={styles.page}>
        <h1 className={styles.animatedTitle}>{text}</h1>
      </div>
      <div className={styles.page1}>
        <p>Find daily commutes with ease!</p>
      </div>
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
