// backend/routes/rideRequestRoutes.js
const express = require("express");
const router = express.Router();
const rideRequestController = require("../controllers/rideRequestController");
const auth = require("../middleware/auth"); // Add authentication middleware

router.post("/", auth, rideRequestController.createRideRequest);
router.get("/", auth, rideRequestController.getAllRideRequests); // All ride requests
router.get("/matches", auth, rideRequestController.findMatches); // Get matches for the logged-in user

// Example routes, you will need more
// router.get('/ride-requests/:id', auth, rideRequestController.getRideRequest);
// router.put('/ride-requests/:id', auth, rideRequestController.updateRideRequest);
// router.delete('/ride-requests/:id', auth, rideRequestController.deleteRideRequest);
module.exports = router;
