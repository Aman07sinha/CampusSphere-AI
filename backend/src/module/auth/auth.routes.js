const express = require("express");
const { protect } = require("../../middlewares/authmiddleware");
const {
    register, 
    verifyEmail, 
    login, 
    getMe, 
    forgotPasswordController, 
    resetPasswordController, 
    logout 
} = require("./auth.controller");

const router = express.Router();

router.post( "/register", register);
router.post( "/verify-email", verifyEmail );
router.post( "/login", login );
router.post( "/forgot-password", forgotPasswordController );
router.post( "/reset-password", resetPasswordController );
router.post( "/logout", logout );

router.get("/me", protect, getMe);


module.exports = router;