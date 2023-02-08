const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      // required: true,
      min: 3,
      max: 3,
    },
    address: {
      type: String,
    },
    mobile: {
      type: String,
      match: /^(\+\d{1,3}[- ]?)?\d{10}$/,
    },
    email: {
      type: String,
      // required: true,
      max: 50,
      unique: true,
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
