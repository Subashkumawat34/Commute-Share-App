import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            CommutePath
          </Link>
          <Link to="/ride" className={styles.navLink}>
            Ride
          </Link>
          <Link to="/drive" className={styles.navLink}>
            Drive
          </Link>
          <Link to="/business" className={styles.navLink}>
            Business
          </Link>
          <div className={styles.about}>
            About
            <span className={styles.dropdownArrow}>▼</span>
          </div>
        </div>
        <div className={styles.right}>
          {/* <span className={styles.language}>
            <i className="fas fa-globe"></i> EN
          </span> */}
          <Link to="/help" className={styles.navLink}>
            Help
          </Link>
          <Link to="/login" className={styles.navLink}>
            Log in
          </Link>
          <Link to="/register" className={styles.signUpButton}>
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;