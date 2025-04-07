import React, { useState } from "react";
import styles from "../styles/LandingPage.module.css";
import myImage from "../assets/jj1.png";
import Footer from "./Footer";
import BuildingImage from "../assets/billding.png";
import LocationIQSearch from "./LocationIQSearch"; // Reusable location search component

function RideForm({ title, description, onNext }) {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleNext = () => {
    if (pickupLocation && destination) {
      onNext(pickupLocation, destination);
    } else {
      alert("Please enter both pickup and destination locations.");
    }
  };

  return (
    <div className={styles.rideSectionContent}>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.subheading}>{description}</p>
      <div className={styles.ub4}>
        <div className={styles.pickupLocation}>
          <LocationIQSearch
            onSelectLocation={setPickupLocation}
            placeholder="Enter Pickup Location"
          />
        </div>
        <div className={styles.pickupLocation}>
          <LocationIQSearch
            onSelectLocation={setDestination}
            placeholder="Enter Destination"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.seePricesButton} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function TimeForm({ pickupLocation, destination, onConfirm }) {
  const [pickupTime, setPickupTime] = useState("");
  const [destinationTime, setDestinationTime] = useState("");

  const handleConfirm = () => {
    if (pickupTime && destinationTime) {
      alert(
        `Ride confirmed!\nPickup: ${pickupLocation}\nPickup Time: ${pickupTime}\nDestination: ${destination}\nDestination Time: ${destinationTime}`
      );
    } else {
      alert("Please enter both pickup and destination times.");
    }
  };

  return (
    <div className={styles.rideSectionContent}>
      <h1 className={styles.heading}>
        Enter Estimated Pickup & Destination Time
      </h1>
      <p className={styles.subheading}>
        Select the estimated time for your ride.
      </p>
      <div className={styles.ub4}>
        <div className={styles.pickupLocation}>
          <label className={styles.ub9}>Pickup Time</label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className={styles.timeInput}
          />
        </div>
        <div className={styles.pickupLocation}>
          <label className={styles.ub9}>Destination Time</label>
          <input
            type="time"
            value={destinationTime}
            onChange={(e) => setDestinationTime(e.target.value)}
            className={styles.timeInput}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.seePricesButton} onClick={handleConfirm}>
          Confirm Ride
        </button>
      </div>
    </div>
  );
}

function LandingPage() {
  const [activeSection, setActiveSection] = useState("request");
  const [step, setStep] = useState(1);
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");

  const handleNextStep = (pickup, destination) => {
    setPickupLocation(pickup);
    setDestination(destination);
    setStep(2);
  };

  return (
    <div>
      <div className={styles.landingPage}>
        <div className={styles.left}>
          <div className={styles.ub1}>
            <button
              onClick={() => {
                setActiveSection("request");
                setStep(1);
              }}
              className={activeSection === "request" ? styles.activeButton : ""}
            >
              Request
            </button>
            <button
              onClick={() => {
                setActiveSection("offer");
                setStep(1);
              }}
              className={activeSection === "offer" ? styles.activeButton : ""}
            >
              Offer
            </button>
          </div>
          {step === 1 ? (
            <RideForm
              title={
                activeSection === "request"
                  ? "Request a ride for now or later"
                  : "Offer a Ride"
              }
              description={
                activeSection === "request"
                  ? "Add your trip details, hop in, and go."
                  : "Help others get around your city. Share your route, set your price, and earn money."
              }
              onNext={handleNextStep}
            />
          ) : (
            <TimeForm
              pickupLocation={pickupLocation}
              destination={destination}
            />
          )}
        </div>
        <div className={styles.right}>
          <img src={myImage} height="500px" width="60px" alt="Commute" />
        </div>
      </div>

      {/* Mission Section */}
      <div className={styles.cardSection}>
        <h1 className={styles.sectionTitle}>
          “We are on a mission to remove 1 million cars from the roads, every
          day”
        </h1>
        <div className={styles.cardContainer}>
          <div className={styles.parentdiv}>
            <div>
              <h1>What is Quick Ride - Carpool & Bikepool?</h1>
              <p>
                We all like going together. Quick Ride helps you connect with
                verified professionals traveling on the same route at the same
                time. It automates carpooling & bikepooling, making commuting
                safer and more efficient.
              </p>
            </div>
            <div>
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
