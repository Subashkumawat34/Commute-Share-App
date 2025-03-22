import React, { useState, useEffect } from "react";
import styles from "../styles/UserProfile.module.css";
import { getUserProfile } from "../utils/api"; //Centralize API calls
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getUserProfile(); //Use api function
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!profile) {
    return <p>No profile data available.</p>;
  }

  return (
    <div className={styles.userprofile}>
      <h2>User Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Display other profile details */}
    </div>
  );
}

export default UserProfile;
