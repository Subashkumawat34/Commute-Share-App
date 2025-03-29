import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../styles/Navbar.module.css";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setIsLoggedIn(false);
    navigate("/"); // Navigate to the home page after logout
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            RideSharing
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
          <Link to="/help" className={styles.navLink}>
            Help
          </Link>

          {/* Show Profile Icon & Logout Button if Logged In */}
          {isLoggedIn ? (
            <>
              <Link to="/app/profile" className={styles.profileIcon}>
              <i className="fas fa-user-circle"></i>
              </Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Show Login & Register buttons if NOT logged in */}
              <Link to="/login" className={styles.navLink}>
                Log in
              </Link>
              <Link to="/register" className={styles.signUpButton}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
