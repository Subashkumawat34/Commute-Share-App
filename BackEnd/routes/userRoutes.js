// backend/routes/userRoutes.js
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile", auth, userController.getUserProfile);

module.exports = router;
