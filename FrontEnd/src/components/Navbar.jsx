import React, { useContext } from "react"; //Import useContext
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Use context

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);  // Update global state on logout
    navigate("/");
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/app/request-ride">Request Ride</Link>
            </li>
            <li>
              <Link to="/app/offer-ride">Offer Ride</Link>
            </li>
            <li>
              <Link to="/app/matches">Matches</Link>
            </li>
            <li>
              <Link to="/app/profile">Profile</Link>
            </li>
            <li>
              <Link to="/app/map">Map</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;