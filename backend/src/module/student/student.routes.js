const express = require("express");

const { createProfile, getProfile, updateProfile} = require("./student.controller");


const {protect} = require("../../middlewares/authmiddleware");


const {authorize} = require("../../middlewares/rolemiddleware");


const router = express.Router();


// Create Profile

router.post("/profile", protect, authorize("student"),createProfile);


// Get Profile

router.get("/profile", protect, authorize("student"), getProfile);


// Update Profile

router.put("/profile", protect, authorize("student"), updateProfile);


module.exports = router;
