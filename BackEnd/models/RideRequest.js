// backend/models/RideRequest.js
const mongoose = require("mongoose");

const rideRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    endLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    startTime: { type: Date, required: true }, // Specific Time
    endTime: { type: Date, required: true }, // Specific time
    // Add more fields:
    daysOfWeek: { type: [String], required: true }, //[Monday, Tuesday]  Store an array of days the ride is available
    seatsAvailable: { type: Number, default: 1 }, // For drivers
    pricePerSeat: { type: Number, default: 0 },
    description: { type: String }, // optional
    isDriver: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

rideRequestSchema.index({ startLocation: "2dsphere", endLocation: "2dsphere" });

const RideRequest = mongoose.model("RideRequest", rideRequestSchema);
module.exports = RideRequest;
