const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema({

  deviceId: {
    type: String,
    required: true,
  },

  action: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model(
  "Command",
  commandSchema
);