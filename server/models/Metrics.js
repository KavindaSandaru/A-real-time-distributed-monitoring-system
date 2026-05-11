const mongoose = require("mongoose");

const metricsSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
  },

  cpuUsage: {
    type: Number,
    default: 0,
  },

  ramUsage: {
    type: Number,
    default: 0,
  },

  diskUsage: {
    type: Number,
    default: 0,
  },

  networkSent: {
    type: Number,
    default: 0,
  },

  networkReceived: {
    type: Number,
    default: 0,
  },

  uptime: {
    type: Number,
    default: 0,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Metrics", metricsSchema);