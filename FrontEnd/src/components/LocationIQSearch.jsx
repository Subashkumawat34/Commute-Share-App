import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/LocationIQSearch.module.css";

const LocationIQSearch = ({ onSelectLocation, placeholder }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] = useState(false);
  const searchInputRef = useRef(null);

  const API_KEY = "pk.3778810c42d0c13a9a7e0ed5424c937d"; // Your LocationIQ API key

  // Fetch address suggestions from LocationIQ
  const handleSearch = async (inputValue) => {
    setQuery(inputValue);

    if (inputValue.length > 2) {
      try {
        const response = await axios.get(
          `https://us1.locationiq.com/v1/search.php`,
          {
            params: {
              key: API_KEY,
              q: inputValue,
              format: "json",
            },
          }
        );
        setSuggestions(response.data);
        setIsSuggestionBoxOpen(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSuggestions([]);
        setIsSuggestionBoxOpen(false);
      }
    } else {
      setSuggestions([]);
      setIsSuggestionBoxOpen(false);
    }
  };

  // Select an address from the suggestions
  const handleSelect = (location) => {
    setQuery(location.display_name);
    onSelectLocation(location);
    setSuggestions([]);
    setIsSuggestionBoxOpen(false);
  };

  // Fetch user's current location
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://us1.locationiq.com/v1/reverse.php`,
              {
                params: {
                  key: API_KEY,
                  lat: latitude,
                  lon: longitude,
                  format: "json",
                },
              }
            );

            const locationData = response.data;
            setQuery(locationData.display_name); // Set detected location in input field
            onSelectLocation(locationData);
          } catch (error) {
            console.error("Error fetching current location:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSuggestionBoxOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchInputRef} style={{ position: "relative" }}>
      <div className={styles.ub8}>
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={placeholder || "Search location..."}
            style={{ width: "300px", padding: "10px" }}
          />
        </div>
        <div>
          <button
            onClick={fetchCurrentLocation}
            style={{ backgroundColor: "#262729" }}
          >
            Use My Location
          </button>
        </div>
      </div>
      {isSuggestionBoxOpen && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: 1,
            color: "black",
          }}
        >
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              style={{
                cursor: "pointer",
                padding: "5px 10px",
                borderBottom: "1px solid #eee",
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationIQSearch;
