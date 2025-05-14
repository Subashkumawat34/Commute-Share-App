import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Navbar from "./components/Navbar";
import RideRequestForm from "./components/RideRequestForm";
import RideOfferForm from "./components/RideOfferForm";
import RideMatches from "./components/RideMatches";
import UserProfile from "./components/UserProfile";
import MapView from "./components/MapView";
import { AuthProvider } from "./context/AuthProvider"; // Import AuthProvider

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the app with AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/app/request-ride" element={<RideRequestForm />} />
          <Route path="/app/offer-ride" element={<RideOfferForm />} />
          <Route path="/app/matches" element={<RideMatches />} />
          <Route path="/app/profile" element={<UserProfile />} />
          <Route path="/app/map" element={<MapView />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> c67acaed26ec0cc1343a74d857196805701e841a
