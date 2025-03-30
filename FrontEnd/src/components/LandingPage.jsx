// import React, { useState, useRef, useEffect } from "react"; // Import useRef and useEffect
// import styles from "../styles/LandingPage.module.css";
// import myImage from "../assets/ride2.webp";
// import Footer from "./Footer";
// import BuildingImage from "../assets/billding.png";
// import axios from "axios"; // Move axios import to the top
// // Import LocationIQSearch

// const LocationIQSearch = ({ onSelectLocation, placeholder }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] = useState(false); // Track if suggestion box is open
//   const searchInputRef = useRef(null); // Create a ref for the input element

//   const API_KEY = "pk.3778810c42d0c13a9a7e0ed5424c937d"; // Replace with your API key

//   const handleSearch = async (e) => {
//     const inputValue = e.target.value;
//     setQuery(inputValue);

//     if (inputValue.length > 2) {
//       try {
//         const response = await axios.get(
//           `https://us1.locationiq.com/v1/search.php`,
//           {
//             params: {
//               key: API_KEY,
//               q: inputValue,
//               format: "json",
//             },
//           }
//         );

//         setSuggestions(response.data);
//         setIsSuggestionBoxOpen(true); // Open the suggestion box when results are available
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setSuggestions([]);
//         setIsSuggestionBoxOpen(false); // Close the suggestion box on error
//       }
//     } else {
//       setSuggestions([]);
//       setIsSuggestionBoxOpen(false); // Close the suggestion box if query is too short
//     }
//   };

//   const handleSelect = (location) => {
//     onSelectLocation(location); // Call the parent's function
//     setQuery(location.display_name);
//     setSuggestions([]);
//     setIsSuggestionBoxOpen(false); // Close the suggestion box after selection
//   };

//   // Handle clicks outside the input and suggestion box to close the box
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
//         setIsSuggestionBoxOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [searchInputRef]);

//   return (
//     <div ref={searchInputRef} style={{ position: "relative" }}> {/* Added position relative */}
//       <input
//         type="text"
//         value={query}
//         onChange={handleSearch}
//         placeholder={placeholder || "Search location..."}
//         style={{ width: "300px", padding: "10px" }}
//         onFocus={() => {
//           if (suggestions.length > 0) {
//             setIsSuggestionBoxOpen(true);
//           }
//         }}  // Open suggestions on focus if there are suggestions.
//       />

//       {isSuggestionBoxOpen && (
//         <ul
//           style={{
//             listStyle: "none",
//             padding: 0,
//             margin: 0,
//             position: "absolute",
//             top: "100%",
//             left: 0,
//             width: "100%",
//             backgroundColor: "white",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//             boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//             zIndex: 1,
//           }}
//         >
//           {suggestions.map((place) => (
//             <li
//               key={place.place_id}
//               onClick={() => handleSelect(place)}
//               style={{
//                 cursor: "pointer",
//                 padding: "5px 10px",
//                 borderBottom: "1px solid #eee",
//                 backgroundColor: "white", // Add white background
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.backgroundColor = "#f0f0f0";  // Light gray on hover
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.backgroundColor = "white";  // Back to white on leave
//               }}
//             >
//               {place.display_name}
//             </li>
//           ))}
//           {suggestions.length === 0 && query.length > 2 && (
//             <li style={{ padding: "5px 10px", color: "#777" }}>No results found.</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// function RequestRideSection() {
//   const [pickupLocation, setPickupLocation] = useState(null);
//   const [destination, setDestination] = useState(null);

//   return (
//     <div className={styles.rideSectionContent}>
//       <h1 className={styles.heading}>
//         Request a ride for
//         <br />
//         now or later
//       </h1>
//       <p className={styles.subheading}>
//         Add your trip details, hop in, and go.
//       </p>
//       <div className={styles.ub4}>
//         <div>
//           <LocationIQSearch
//             onSelectLocation={(location) => setPickupLocation(location)}
//             placeholder="Enter Pickup Location"
//           />
//           {pickupLocation && (
//             <p>
//               Pickup Location Selected: {pickupLocation.display_name} (Lat:{" "}
//               {pickupLocation.lat}, Lng: {pickupLocation.lon})
//             </p>
//           )}
//         </div>
//         <div>
//           <LocationIQSearch
//             onSelectLocation={(location) => setDestination(location)}
//             placeholder="Enter Destination"
//           />
//           {destination && (
//             <p>
//               Destination Selected: {destination.display_name} (Lat:{" "}
//               {destination.lat}, Lng: {destination.lon})
//             </p>
//           )}
//         </div>
//       </div>
//       <div className={styles.buttonRow}>
//         <button className={styles.seePricesButton}>See prices</button>
//         <button className={styles.scheduleButton}>Schedule for later</button>
//       </div>
//     </div>
//   );
// }

// // Placeholder component for Offer section
// function OfferSection() {
//   const [pickupLocation, setPickupLocation] = useState(null);
//   const [destination, setDestination] = useState(null);

//   return (
//     <div className={styles.offerSectionContent}>
//       <h1 className={styles.heading}>Offer a Ride</h1>
//       <p className={styles.subheading}>
//         Help others get around your city. Share your route, set your price, and
//         earn money.
//       </p>
//       <div className={styles.ub4}>
//         <div >
//           <LocationIQSearch
//             onSelectLocation={(location) => setPickupLocation(location)}
//             placeholder="Enter Pickup Location"
//           />
//           {pickupLocation && (
//             <p>
//               Pickup Location Selected: {pickupLocation.display_name} (Lat:{" "}
//               {pickupLocation.lat}, Lng: {pickupLocation.lon})
//             </p>
//           )}
//         </div>
//         <div>
//           <LocationIQSearch
//             onSelectLocation={(location) => setDestination(location)}
//             placeholder="Enter Destination"
//           />
//           {destination && (
//             <p>
//               Destination Selected: {destination.display_name} (Lat:{" "}
//               {destination.lat}, Lng: {destination.lon})
//             </p>
//           )}
//         </div>
//       </div>
//       <div className={styles.buttonRow}>
//         <button className={styles.seePricesButton}>See Prices</button>
//         <button className={styles.scheduleButton}>Schedule for Latter</button>
//       </div>
//     </div>
//   );
// }

// const Card = ({ imageUrl, title, description, buttonText }) => {
//   return (
//     <div className={styles.card}>
//       <img src={imageUrl} alt={title} className={styles.cardImage} />
//       <h2 className={styles.cardTitle}>{title}</h2>
//       <p className={styles.cardDescription}>{description}</p>
//       <button className={styles.cardButton}>{buttonText}</button>
//     </div>
//   );
// };

// function LandingPage() {
//   const [activeSection, setActiveSection] = useState("request"); // 'request' or 'offer'

//   const handleButtonClick = (section) => {
//     setActiveSection(section);
//   };

//   return (
//     <div>
//       <div className={styles.landingPage}>
//         <div className={styles.left}>
//           <div className={styles.ub1}>
//             <button
//               onClick={() => handleButtonClick("request")}
//               className={activeSection === "request" ? styles.activeButton : ""}
//             >
//               Request
//             </button>
//             <button
//               onClick={() => handleButtonClick("offer")}
//               className={activeSection === "offer" ? styles.activeButton : ""}
//             >
//               Offer
//             </button>
//           </div>
//           {activeSection === "request" && <RequestRideSection />}
//           {activeSection === "offer" && <OfferSection />}
//         </div>
//         <div className={styles.right}>
//           <img src={myImage} height="500px" width="50px" alt="Commute" />
//         </div>
//       </div>

//       <div className={styles.cardSection}>
//         <h1 className={styles.sectionTitle}>
//           “We are on a mission to remove 1 million cars from the roads, every
//           day”
//         </h1>
//         <div className={styles.cardContainer}>
//           <div className={styles.parentdiv}>
//             <div>
//               <h1>What is Quick Ride - Carpool & Bikepool</h1>
//               <p>
//                 We all like going together. Quick Ride will help you connect
//                 with other like-minded verified professionals who are traveling
//                 on the same route at the same time. Quick Ride helps commuters
//                 to start sharing the ride instead of traveling alone. Innovative
//                 technology to discover, connect, coordinate, and cost-share in a
//                 seamless manner. Quick Ride automates the end to end process of
//                 carpooling & bikepooling and makes pooling safe and hassle-free
//                 for commuters. Quick Ride makes your office commute a fun
//                 experience every day.
//               </p>
//             </div>
//             <div>
//               {" "}
//               <img
//                 src={BuildingImage}
//                 alt="Building"
//                 className={styles.BuildingImage}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default LandingPage;

// import React, { useState, useRef, useEffect } from "react"; // Import useRef and useEffect
// import styles from "../styles/LandingPage.module.css";
// import myImage from "../assets/ride2.webp";
// import Footer from "./Footer";
// import BuildingImage from "../assets/billding.png";
// import axios from "axios"; // Move axios import to the top
// // Import LocationIQSearch

// const LocationIQSearch = ({ onSelectLocation, placeholder, setManualLocation }) => {
//     const [query, setQuery] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] = useState(false); // Track if suggestion box is open
//     const searchInputRef = useRef(null); // Create a ref for the input element

//     const API_KEY = "pk.3778810c42d0c13a9a7e0ed5424c937d"; // Replace with your API key

//     const handleSearch = async (e) => {
//         const inputValue = e.target.value;
//         setQuery(inputValue);
//         setManualLocation(null);  // Clear selected location when user types manually

//         if (inputValue.length > 2) {
//             try {
//                 const response = await axios.get(
//                     `https://us1.locationiq.com/v1/search.php`,
//                     {
//                         params: {
//                             key: API_KEY,
//                             q: inputValue,
//                             format: "json",
//                         },
//                     }
//                 );

//                 setSuggestions(response.data);
//                 setIsSuggestionBoxOpen(true); // Open the suggestion box when results are available
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setSuggestions([]);
//                 setIsSuggestionBoxOpen(false); // Close the suggestion box on error
//             }
//         } else {
//             setSuggestions([]);
//             setIsSuggestionBoxOpen(false); // Close the suggestion box if query is too short
//         }
//     };

//     const handleSelect = (location) => {
//         onSelectLocation(location); // Call the parent's function
//         setQuery(location.display_name);
//         setSuggestions([]);
//         setIsSuggestionBoxOpen(false); // Close the suggestion box after selection
//     };

//     // Handle clicks outside the input and suggestion box to close the box
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
//                 setIsSuggestionBoxOpen(false);
//             }
//         }

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [searchInputRef]);

//     return (
//         <div ref={searchInputRef} style={{ position: "relative" }}> {/* Added position relative */}
//             <input
//                 type="text"
//                 value={query}
//                 onChange={handleSearch}
//                 placeholder={placeholder || "Search location..."}
//                 style={{ width: "300px", padding: "10px" }}
//                 onFocus={() => {
//                     if (suggestions.length > 0) {
//                         setIsSuggestionBoxOpen(true);
//                     }
//                 }}  // Open suggestions on focus if there are suggestions.
//             />

//             {isSuggestionBoxOpen && (
//                 <ul
//                     style={{
//                         listStyle: "none",
//                         padding: 0,
//                         margin: 0,
//                         position: "absolute",
//                         top: "100%",
//                         left: 0,
//                         width: "100%",
//                         backgroundColor: "white",
//                         border: "1px solid #ccc",
//                         borderRadius: "4px",
//                         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                         zIndex: 1,
//                     }}
//                 >
//                     {suggestions.map((place) => (
//                         <li
//                             key={place.place_id}
//                             onClick={() => handleSelect(place)}
//                             style={{
//                                 cursor: "pointer",
//                                 padding: "5px 10px",
//                                 borderBottom: "1px solid #eee",
//                                 backgroundColor: "white", // Add white background
//                             }}
//                             onMouseEnter={(e) => {
//                                 e.target.style.backgroundColor = "#f0f0f0";  // Light gray on hover
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.target.style.backgroundColor = "white";  // Back to white on leave
//                             }}
//                         >
//                             {place.display_name}
//                         </li>
//                     ))}
//                     {suggestions.length === 0 && query.length > 2 && (
//                         <li style={{ padding: "5px 10px", color: "#777" }}>No results found.</li>
//                     )}
//                 </ul>
//             )}
//         </div>
//     );
// };

// function RequestRideSection() {
//     const [pickupLocation, setPickupLocation] = useState(null);
//     const [destination, setDestination] = useState(null);
//     const [pickupManualLocation, setPickupManualLocation] = useState(null);
//     const [destinationManualLocation, setDestinationManualLocation] = useState(null);

//     return (
//         <div className={styles.rideSectionContent}>
//             <h1 className={styles.heading}>
//                 Request a ride for
//                 <br />
//                 now or later
//             </h1>
//             <p className={styles.subheading}>
//                 Add your trip details, hop in, and go.
//             </p>
//             <div className={styles.ub4}>
//                 <div>
//                     <LocationIQSearch
//                         onSelectLocation={(location) => setPickupLocation(location)}
//                         placeholder="Enter Pickup Location"
//                         setManualLocation={setPickupManualLocation} // Pass setManualLocation
//                     />
//                     {pickupLocation && (
//                         <p>
//                             Pickup Location Selected: {pickupLocation.display_name} (Lat:{" "}
//                             {pickupLocation.lat}, Lng: {pickupLocation.lon})
//                         </p>
//                     )}
//                 </div>
//                 <div>
//                     <LocationIQSearch
//                         onSelectLocation={(location) => setDestination(location)}
//                         placeholder="Enter Destination"
//                         setManualLocation={setDestinationManualLocation} // Pass setManualLocation
//                     />
//                     {destination && (
//                         <p>
//                             Destination Selected: {destination.display_name} (Lat:{" "}
//                             {destination.lat}, Lng: {destination.lon})
//                         </p>
//                     )}
//                 </div>
//             </div>
//             <div className={styles.buttonRow}>
//                 <button className={styles.seePricesButton}>See prices</button>
//                 <button className={styles.scheduleButton}>Schedule for later</button>
//             </div>
//         </div>
//     );
// }

// // Placeholder component for Offer section
// function OfferSection() {
//     const [pickupLocation, setPickupLocation] = useState(null);
//     const [destination, setDestination] = useState(null);
//     const [pickupManualLocation, setPickupManualLocation] = useState(null);
//     const [destinationManualLocation, setDestinationManualLocation] = useState(null);

//     return (
//         <div className={styles.offerSectionContent}>
//             <h1 className={styles.heading}>Offer a Ride</h1>
//             <p className={styles.subheading}>
//                 Help others get around your city. Share your route, set your price, and
//                 earn money.
//             </p>
//             <div className={styles.ub4}>
//                 <div>
//                     <LocationIQSearch
//                         onSelectLocation={(location) => setPickupLocation(location)}
//                         placeholder="Enter Pickup Location"
//                         setManualLocation={setPickupManualLocation} // Pass setManualLocation
//                     />
//                     {pickupLocation && (
//                         <p>
//                             Pickup Location Selected: {pickupLocation.display_name} (Lat:{" "}
//                             {pickupLocation.lat}, Lng: {pickupLocation.lon})
//                         </p>
//                     )}
//                 </div>
//                 <div>
//                     <LocationIQSearch
//                         onSelectLocation={(location) => setDestination(location)}
//                         placeholder="Enter Destination"
//                         setManualLocation={setDestinationManualLocation} // Pass setManualLocation
//                     />
//                     {destination && (
//                         <p>
//                             Destination Selected: {destination.display_name} (Lat:{" "}
//                             {destination.lat}, Lng: {destination.lon})
//                         </p>
//                     )}
//                 </div>
//             </div>
//             <div className={styles.buttonRow}>
//                 <button className={styles.seePricesButton}>See Prices</button>
//                 <button className={styles.scheduleButton}>Schedule for Latter</button>
//             </div>
//         </div>
//     );
// }

// const Card = ({ imageUrl, title, description, buttonText }) => {
//     return (
//         <div className={styles.card}>
//             <img src={imageUrl} alt={title} className={styles.cardImage} />
//             <h2 className={styles.cardTitle}>{title}</h2>
//             <p className={styles.cardDescription}>{description}</p>
//             <button className={styles.cardButton}>{buttonText}</button>
//         </div>
//     );
// };

// function LandingPage() {
//     const [activeSection, setActiveSection] = useState("request"); // 'request' or 'offer'

//     const handleButtonClick = (section) => {
//         setActiveSection(section);
//     };

//     return (
//         <div>
//             <div className={styles.landingPage}>
//                 <div className={styles.left}>
//                     <div className={styles.ub1}>
//                         <button
//                             onClick={() => handleButtonClick("request")}
//                             className={activeSection === "request" ? styles.activeButton : ""}
//                         >
//                             Request
//                         </button>
//                         <button
//                             onClick={() => handleButtonClick("offer")}
//                             className={activeSection === "offer" ? styles.activeButton : ""}
//                         >
//                             Offer
//                         </button>
//                     </div>
//                     {activeSection === "request" && <RequestRideSection />}
//                     {activeSection === "offer" && <OfferSection />}
//                 </div>
//                 <div className={styles.right}>
//                     <img src={myImage} height="500px" width="50px" alt="Commute" />
//                 </div>
//             </div>

//             <div className={styles.cardSection}>
//                 <h1 className={styles.sectionTitle}>
//                     “We are on a mission to remove 1 million cars from the roads, every
//                     day”
//                 </h1>
//                 <div className={styles.cardContainer}>
//                     <div className={styles.parentdiv}>
//                         <div>
//                             <h1>What is Quick Ride - Carpool & Bikepool</h1>
//                             <p>
//                                 We all like going together. Quick Ride will help you connect
//                                 with other like-minded verified professionals who are traveling
//                                 on the same route at the same time. Quick Ride helps commuters
//                                 to start sharing the ride instead of traveling alone. Innovative
//                                 technology to discover, connect, coordinate, and cost-share in a
//                                 seamless manner. Quick Ride automates the end to end process of
//                                 carpooling & bikepooling and makes pooling safe and hassle-free
//                                 for commuters. Quick Ride makes your office commute a fun
//                                 experience every day.
//                             </p>
//                         </div>
//                         <div>
//                             {" "}
//                             <img
//                                 src={BuildingImage}
//                                 alt="Building"
//                                 className={styles.BuildingImage}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// }

// export default LandingPage;

import React, { useState, useRef, useEffect } from "react"; // Import useRef and useEffect
import styles from "../styles/LandingPage.module.css";
import myImage from "../assets/head.png";
import Footer from "./Footer";
import BuildingImage from "../assets/billding.png";
import axios from "axios"; // Move axios import to the top
// Import LocationIQSearch

const LocationIQSearch = ({ onSelectLocation, placeholder }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] = useState(false); // Track if suggestion box is open
  const searchInputRef = useRef(null); // Create a ref for the input element

  const API_KEY = "pk.3778810c42d0c13a9a7e0ed5424c937d"; // Replace with your API key

  const handleSearch = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue); // Update query as the user types.

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
        setIsSuggestionBoxOpen(true); // Open the suggestion box when results are available
      } catch (error) {
        console.error("Error fetching data:", error);
        setSuggestions([]);
        setIsSuggestionBoxOpen(false); // Close the suggestion box on error
      }
    } else {
      setSuggestions([]);
      setIsSuggestionBoxOpen(false); // Close the suggestion box if query is too short
    }
  };

  const handleSelect = (location) => {
    setQuery(location.display_name); // Update query to show selected name *in the input*.
    onSelectLocation(location); // Call the parent's function with the selected location *object*.
    setSuggestions([]);
    setIsSuggestionBoxOpen(false); // Close the suggestion box after selection
  };

  // Handle clicks outside the input and suggestion box to close the box
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInputRef]);

  return (
    <div ref={searchInputRef} style={{ position: "relative" }}>
      {" "}
      {/* Added position relative */}
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder || "Search location..."}
        style={{ width: "300px", padding: "10px" }}
        onFocus={() => {
          if (suggestions.length > 0) {
            setIsSuggestionBoxOpen(true);
          }
        }} // Open suggestions on focus if there are suggestions.
      />
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
            color: "black", // Set text color to black
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
                backgroundColor: "white", // Add white background
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f0f0f0"; // Light gray on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white"; // Back to white on leave
              }}
            >
              {place.display_name}
            </li>
          ))}
          {suggestions.length === 0 && query.length > 2 && (
            <li style={{ padding: "5px 10px", color: "#777" }}>
              No results found.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

function RequestRideSection() {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const [pickupName, setPickupName] = useState(""); // new state for pickup name
  const [destinationName, setDestinationName] = useState(""); // new state for destination name

  const handlePickupSelect = (location) => {
    setPickupLocation(location);
    setPickupName(location.display_name); // Store display name
  };

  const handleDestinationSelect = (location) => {
    setDestination(location);
    setDestinationName(location.display_name); // Store display name
  };

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
        <div className={styles.pickupLocation}>
          <LocationIQSearch
            onSelectLocation={handlePickupSelect}
            placeholder="Enter Pickup Location"
          />
        </div>
        <div className={styles.pickupLocation}>
          <LocationIQSearch
            onSelectLocation={handleDestinationSelect}
            placeholder="Enter Destination"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.seePricesButton}>Submit</button>
      </div>
    </div>
  );
}

// Placeholder component for Offer section
function OfferSection() {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const [pickupName, setPickupName] = useState(""); // new state for pickup name
  const [destinationName, setDestinationName] = useState(""); // new state for destination name

  const handlePickupSelect = (location) => {
    setPickupLocation(location);
    setPickupName(location.display_name); // Store display name
  };

  const handleDestinationSelect = (location) => {
    setDestination(location);
    setDestinationName(location.display_name); // Store display name
  };

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
            onSelectLocation={handlePickupSelect}
            placeholder="Enter Pickup Location"
          />
        </div>
        <div>
          <LocationIQSearch
            onSelectLocation={handleDestinationSelect}
            placeholder="Enter Destination"
          />
        </div>
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
          <img src={myImage} height="500px" width="60px" alt="Commute" />
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
