// for generating id's

const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    sequenceValue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Counter = mongoose.model(
  "Counter",
  counterSchema
);

module.exports = Counter;
