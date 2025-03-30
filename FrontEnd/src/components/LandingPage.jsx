import React, { useState } from "react";
import styles from "../styles/LandingPage.module.css";
import myImage from "../assets/j2.webp";
import Footer from "./Footer";
import BuildingImage from "../assets/billding.png";
// import rideImage from "../assets/ride.webp";
// import ride1Image from "../assets/ride2.webp";
// import ride2Image from "../assets/ride3.webp";

function RequestRideSection() {
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
          <input type="text" placeholder="Enter location" />
        </div>
        <div>
          <input type="text" placeholder="Enter Destination" />
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
  return (
    <div className={styles.offerSectionContent}>
      <h1 className={styles.heading}>Offer a Ride</h1>
      <p className={styles.subheading}>
        Help others get around your city. Share your route, set your price, and
        earn money.
      </p>
      <div className={styles.ub4}>
        <div>
          <input type="text" placeholder="Enter Pickup Location" />
        </div>
        <div>
          <input type="text" placeholder="Enter Destination" />
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
