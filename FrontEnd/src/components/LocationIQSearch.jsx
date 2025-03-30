import React, { useState } from "react";
import axios from "axios";

const LocationIQSearch = ({ onSelectLocation, placeholder }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = "YOUR_API_KEY"; // Replace with your API key

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(
          `https://us1.locationiq.com/v1/search.php`,
          {
            params: {
              key: API_KEY,
              q: e.target.value,
              format: "json",
            },
          }
        );

        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (location) => {
    onSelectLocation(location); // Call the parent's function
    setQuery(location.display_name);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder || "Search location..."}
        style={{ width: "300px", padding: "10px" }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {suggestions.map((place) => (
          <li
            key={place.place_id}
            onClick={() => handleSelect(place)}
            style={{
              cursor: "pointer",
              padding: "5px",
              borderBottom: "1px solid #ccc",
            }}
          >
            {place.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationIQSearch;
