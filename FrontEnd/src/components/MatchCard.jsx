import React from "react";
import styles from "../styles/MatchCard.module.css";

function MatchCard({ match }) {
  return (
    <div className={styles.matchCard}>
      <h3>{match.driver}</h3>
      <p>Origin: {match.origin}</p>
      <p>Destination: {match.destination}</p>
      <p>Time: {match.time}</p>
      {/* Add more match details here */}
      <button>Contact</button>
    </div>
  );
}

export default MatchCard;
