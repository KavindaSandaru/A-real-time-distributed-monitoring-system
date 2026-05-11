const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    deviceId: String,

    deviceName: String,

    type: String,

    message: String,

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Alert",
  alertSchema
);