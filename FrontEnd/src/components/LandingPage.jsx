import React, { useState } from "react"; // Keep this import at the top
import styles from "../styles/LandingPage.module.css";
import myImage from "../assets/ride2.webp";
import Footer from "./Footer";
import BuildingImage from "../assets/billding.png";
import axios from "axios"; // Move axios import to the top
// Import LocationIQSearch

const LocationIQSearch = ({ onSelectLocation, placeholder }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = "pk.3778810c42d0c13a9a7e0ed5424c937d"; // Replace with your API key

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

function RequestRideSection() {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  return (
    <div className={styles.rideSectionContent}>
      <h1 className={styles.heading}>
        Request a ride for
        <br />
        now or later
      </h1>
      <p className={styles.subheading}>
        Add your trip details, hop in, and go.
      </p>
      <div className={styles.ub4}>
        <div>
          <LocationIQSearch
            onSelectLocation={(location) => setPickupLocation(location)}
            placeholder="Enter Pickup Location"
          />
          {pickupLocation && (
            <p>
              Pickup Location Selected: {pickupLocation.display_name} (Lat:{" "}
              {pickupLocation.lat}, Lng: {pickupLocation.lon})
            </p>
          )}
        </div>
        <div>
          <LocationIQSearch
            onSelectLocation={(location) => setDestination(location)}
            placeholder="Enter Destination"
          />
          {destination && (
            <p>
              Destination Selected: {destination.display_name} (Lat:{" "}
              {destination.lat}, Lng: {destination.lon})
            </p>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.seePricesButton}>See prices</button>
        <button className={styles.scheduleButton}>Schedule for later</button>
      </div>
    </div>
  );
}

// Placeholder component for Offer section
function OfferSection() {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  return (
    <div className={styles.offerSectionContent}>
      <h1 className={styles.heading}>Offer a Ride</h1>
      <p className={styles.subheading}>
        Help others get around your city. Share your route, set your price, and
        earn money.
      </p>
      <div className={styles.ub4}>
        <div>
          <LocationIQSearch
            onSelectLocation={(location) => setPickupLocation(location)}
            placeholder="Enter Pickup Location"
          />
          {pickupLocation && (
            <p>
              Pickup Location Selected: {pickupLocation.display_name} (Lat:{" "}
              {pickupLocation.lat}, Lng: {pickupLocation.lon})
            </p>
          )}
        </div>
        <div>
          <LocationIQSearch
            onSelectLocation={(location) => setDestination(location)}
            placeholder="Enter Destination"
          />
          {destination && (
            <p>
              Destination Selected: {destination.display_name} (Lat:{" "}
              {destination.lat}, Lng: {destination.lon})
            </p>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.seePricesButton}>See Prices</button>
        <button className={styles.scheduleButton}>Schedule for Latter</button>
      </div>
    </div>
  );
}

const Card = ({ imageUrl, title, description, buttonText }) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.cardImage} />
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDescription}>{description}</p>
      <button className={styles.cardButton}>{buttonText}</button>
    </div>
  );
};

function LandingPage() {
  const [activeSection, setActiveSection] = useState("request"); // 'request' or 'offer'

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <div className={styles.landingPage}>
        <div className={styles.left}>
          <div className={styles.ub1}>
            <button
              onClick={() => handleButtonClick("request")}
              className={activeSection === "request" ? styles.activeButton : ""}
            >
              Request
            </button>
            <button
              onClick={() => handleButtonClick("offer")}
              className={activeSection === "offer" ? styles.activeButton : ""}
            >
              Offer
            </button>
          </div>
          {activeSection === "request" && <RequestRideSection />}
          {activeSection === "offer" && <OfferSection />}
        </div>
        <div className={styles.right}>
          <img src={myImage} height="500px" width="50px" alt="Commute" />
        </div>
      </div>

      <div className={styles.cardSection}>
        <h1 className={styles.sectionTitle}>
          “We are on a mission to remove 1 million cars from the roads, every
          day”
        </h1>
        <div className={styles.cardContainer}>
          <div className={styles.parentdiv}>
            <div>
              <h1>What is Quick Ride - Carpool & Bikepool</h1>
              <p>
                We all like going together. Quick Ride will help you connect
                with other like-minded verified professionals who are traveling
                on the same route at the same time. Quick Ride helps commuters
                to start sharing the ride instead of traveling alone. Innovative
                technology to discover, connect, coordinate, and cost-share in a
                seamless manner. Quick Ride automates the end to end process of
                carpooling & bikepooling and makes pooling safe and hassle-free
                for commuters. Quick Ride makes your office commute a fun
                experience every day.
              </p>
            </div>
            <div>
              {" "}
              <img
                src={BuildingImage}
                alt="Building"
                className={styles.BuildingImage}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;