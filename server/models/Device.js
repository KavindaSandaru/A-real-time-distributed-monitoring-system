const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  hostname: String,
  username: String,

  os: String,
  osVersion: String,
  architecture: String,

  cpuModel: String,
  cpuUsage: Number,

  ramUsage: Number,
  totalRam: String,

  diskUsage: Number,
  totalDisk: String,
  freeDisk: String,

  uptime: Number,

  localIp: String,
  publicIp: String,

  macAddress: String,

  networkSent: Number,
  networkReceived: Number,

  processes: Array,

  status: {
    type: String,
    default: "online"
  },

  lastSeen: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Device", deviceSchema);