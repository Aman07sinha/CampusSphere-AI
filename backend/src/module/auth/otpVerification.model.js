const mongoose = require("mongoose");

const otpVerificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      expires: 0

    },
  },
  {
    timestamps: true,
  }
);

const OTPVerification = mongoose.model(
  "OTPVerification",
  otpVerificationSchema
);

module.exports = OTPVerification;