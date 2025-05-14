import React, { useState } from "react";
import styles from "../styles/LocationSearch.module.css";

function LocationSearch({ onLocationSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length < 3) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual geocoding API call (Google Maps, Mapbox, etc.)
      const response = await fetch(`/api/geocode?query=${term}`); //Backend handles the API key and geocoding logic
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data.results);
      } else {
        console.error("Geocoding error:", data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (location) => {
    onLocationSelect(location); // Pass the selected location to the parent component
    setSearchTerm("");
    setSearchResults([]); // Clear the search results
  };

  return (
    <div className={styles.locationSearch}>
      <input
        type="text"
        placeholder="Enter location"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {loading && <p>Loading...</p>}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.place_id} onClick={() => handleSelect(result)}>
              {result.formatted_address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationSearch;
