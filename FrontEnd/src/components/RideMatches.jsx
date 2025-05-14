import React, { useState, useEffect } from "react";
import styles from "../styles/RideMatches.module.css";
import MatchCard from "./MatchCard"; // Import the new MatchCard component
import { getRideMatches } from "../utils/api"; // Centralized API call

function RideMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getRideMatches();  //Use centralized API call
        setMatches(data);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError("Failed to load ride matches.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className={styles.rideMatches}>
      <h2>Ride Matches</h2>
      {loading && <p>Loading matches...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {matches.length > 0 ? (
        <div className={styles.matchesList}>
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} /> // Use the MatchCard
          ))}
        </div>
      ) : (
        !loading && !error && <p>No matches found.</p>
      )}
    </div>
  );
}

export default RideMatches;