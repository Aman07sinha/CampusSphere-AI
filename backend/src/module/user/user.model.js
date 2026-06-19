const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      sparse: true,
      default: null, 
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // NEW FIELD
    isActive: {
      type: Boolean,
      default: true,
    },

    // NEW FIELD
    lastLogin: {
      type: Date,
    },

    avatar: {
      type: String,
      default: "",
    },

    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index(
  { userId: 1 },
  {
    unique: true,
    sparse: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

