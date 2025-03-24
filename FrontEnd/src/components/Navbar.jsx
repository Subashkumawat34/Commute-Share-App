import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    setIsLoggedIn(false); // Update the context
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
        </li>

        {isLoggedIn && (
          <>
            <li>
              <Link to="/app/request-ride" className={styles.navLink}>
                Request Ride
              </Link>
            </li>
            <li>
              <Link to="/app/offer-ride" className={styles.navLink}>
                Offer Ride
              </Link>
            </li>
            <li>
              <Link to="/app/matches" className={styles.navLink}>
                Matches
              </Link>
            </li>
            <li>
              <Link to="/app/profile" className={styles.navLink}>
                Profile
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.navLink}>
                Logout
              </button>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login" className={styles.navLink}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className={styles.navLink}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
