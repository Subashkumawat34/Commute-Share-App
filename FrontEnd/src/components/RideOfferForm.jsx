import React, { useState } from "react";
import styles from "../styles/RideRequestForm.module.css";  //Share styles with request form
import LocationSearch from "./LocationSearch"; // Import LocationSearch
import ErrorMessage from "./ErrorMessage";
import { offerRide } from "../utils/api";  //Centralize API calls

function RideOfferForm() {
  const [origin, setOrigin] = useState(null);  // Store full location object
  const [destination, setDestination] = useState(null); // Store full location object
  const [departureTime, setDepartureTime] = useState("");
  const [flexibleTime, setFlexibleTime] = useState(30);
  const [availableSeats, setAvailableSeats] = useState(1);
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [musicPreferences, setMusicPreferences] = useState("");
  const [error, setError] = useState("");

  const handleOriginSelect = (location) => {
    setOrigin(location);
  };

  const handleDestinationSelect = (location) => {
    setDestination(location);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!origin || !destination) {
      setError("Please select both origin and destination.");
      return;
    }

    if (!departureTime) {
      setError("Please select a departure time.");
      return;
    }

    const offerData = {
      origin: {
        latitude: origin.geometry.location.lat,
        longitude: origin.geometry.location.lng,
        formatted_address: origin.formatted_address
      },
      destination: {
        latitude: destination.geometry.location.lat,
        longitude: destination.geometry.location.lng,
        formatted_address: destination.formatted_address
      },
      departureTime,
      flexibleTime,
      availableSeats,
      smokingAllowed,
      musicPreferences,
    };

    try {
      await offerRide(offerData); // Use centralized API function
      alert("Ride offer submitted successfully!");
      // Reset the form
      setOrigin(null);
      setDestination(null);
      setDepartureTime("");
      setFlexibleTime(30);
      setAvailableSeats(1);
      setSmokingAllowed(false);
      setMusicPreferences("");
    } catch (err) {
      console.error("Error submitting ride offer:", err);
      setError("Failed to submit ride offer.");
    }
  };

  return (
    <div className={styles.rideform}>
      <h2>Offer a Ride</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Origin:</label>
          <LocationSearch onLocationSelect={handleOriginSelect} />
          {origin && <p>Selected: {origin.formatted_address}</p>}
        </div>
        <div>
          <label>Destination:</label>
          <LocationSearch onLocationSelect={handleDestinationSelect} />
          {destination && <p>Selected: {destination.formatted_address}</p>}
        </div>
        <div>
          <label>Departure Time:</label>
          <input
            type="datetime-local"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>
        <div>
          <label>Flexible Time (minutes):</label>
          <input
            type="number"
            value={flexibleTime}
            onChange={(e) => setFlexibleTime(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>Available Seats:</label>
          <input
            type="number"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>Smoking Allowed:</label>
          <input
            type="checkbox"
            checked={smokingAllowed}
            onChange={(e) => setSmokingAllowed(e.target.checked)}
          />
        </div>
        <div>
          <label>Music Preferences:</label>
          <input
            type="text"
            value={musicPreferences}
            onChange={(e) => setMusicPreferences(e.target.value)}
          />
        </div>
        {error && <ErrorMessage message={error} />}
        <button type="submit">Submit Offer</button>
      </form>
    </div>
  );
}

export default RideOfferForm;