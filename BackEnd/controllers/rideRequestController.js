// backend/controllers/rideRequestController.js
const RideRequest = require("../models/RideRequest");

const createRideRequest = async (req, res) => {
  try {
    const {
      startLocation,
      endLocation,
      startTime,
      endTime,
      daysOfWeek,
      seatsAvailable,
      pricePerSeat,
      description,
      isDriver,
    } = req.body;

    const newRideRequest = new RideRequest({
      userId: req.user.id, // Get user ID from auth middleware
      startLocation: {
        type: "Point",
        coordinates: startLocation, //[longitude, latitude]
      },
      endLocation: {
        type: "Point",
        coordinates: endLocation,
      },
      startTime,
      endTime,
      daysOfWeek,
      seatsAvailable,
      pricePerSeat,
      description,
      isDriver,
    });

    const savedRideRequest = await newRideRequest.save();
    res.status(201).json(savedRideRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating ride request" });
  }
};

const getAllRideRequests = async (req, res) => {
  try {
    const rideRequests = await RideRequest.find(); // Fetch all requests
    res.json(rideRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching ride requests" });
  }
};

const findMatches = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id; // Assuming you're using auth middleware
    //Fetch user and check isDriver or not
    const userDetails = await User.findById(userId);
    const userRideRequests = await RideRequest.find({ userId: userId });
    let matchedRequests = [];

    for (const request of userRideRequests) {
      // Find potential matches based on location, time, and days
      let potentialMatches;
      if (userDetails.vehicleOwner) {
        potentialMatches = await RideRequest.find({
          _id: { $ne: request._id }, // Exclude the user's own request
          "startLocation.coordinates": {
            $near: {
              $geometry: request.startLocation,
              $maxDistance: 1000, // Adjust distance tolerance in meters
            },
          },
          "endLocation.coordinates": {
            $near: {
              $geometry: request.endLocation,
              $maxDistance: 1000, // Adjust distance tolerance in meters
            },
          },
          daysOfWeek: { $in: request.daysOfWeek }, // Match days of the week
          isDriver: false, // Only match with non-drivers if the user is a driver
        });
      } else {
        potentialMatches = await RideRequest.find({
          _id: { $ne: request._id }, // Exclude the user's own request
          "startLocation.coordinates": {
            $near: {
              $geometry: request.startLocation,
              $maxDistance: 1000, // Adjust distance tolerance in meters
            },
          },
          "endLocation.coordinates": {
            $near: {
              $geometry: request.endLocation,
              $maxDistance: 1000, // Adjust distance tolerance in meters
            },
          },
          daysOfWeek: { $in: request.daysOfWeek }, // Match days of the week
          isDriver: true, // Only match with drivers if the user is a non-driver
        });
      }

      // Filter the potential matches based on timing and other criteria
      const filteredMatches = potentialMatches.filter((match) => {
        // Check time overlap (adjust the time window as needed)
        const timeDifference = Math.abs(request.startTime - match.startTime);
        return timeDifference <= 3600000; // 1 hour in milliseconds

        // You can add more filtering based on preferences here
      });

      matchedRequests = matchedRequests.concat(filteredMatches);
    }

    res.json(matchedRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error finding matches" });
  }
};

module.exports = { createRideRequest, getAllRideRequests, findMatches };
