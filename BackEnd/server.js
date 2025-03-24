// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import Routes
const userRoutes = require("./routes/userRoutes");
const rideRequestRoutes = require("./routes/rideRequestRoutes");

app.use("/api/users", userRoutes);
app.use("/api/rides", rideRequestRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
