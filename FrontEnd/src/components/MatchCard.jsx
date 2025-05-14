// MatchCard.jsx
import React from "react";
import styles from "../styles/MatchCard.module.css"; // Create a CSS module for styling

function MatchCard({ match }) {
  return (
    <div className={styles.matchCard}>
      <h3>{match.userName}</h3>{" "}
      {/* Replace with actual data from your match object */}
      <p>Start: {match.startLocation}</p>
      <p>End: {match.endLocation}</p>
      <p>Time: {match.startTime}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default MatchCard;
