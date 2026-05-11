const Device = require("../models/Device");
const Metrics = require("../models/Metrics");
const Alert = require("../models/Alert");

const getDevices = async (req, res) => {
  try {
    const devices = await Device.find();

    res.json(devices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const registerOrUpdateDevice = async (req, res) => {
  try {
    const {
      deviceId,
      deviceName,
      username,

      ipAddress,
      localIp,
      publicIp,
      macAddress,

      location,
      status,

      os,
      osVersion,
      architecture,

      cpuModel,

      cpuUsage,
      ramUsage,
      diskUsage,

      totalRam,
      totalDisk,
      freeDisk,

      networkSent,
      networkReceived,

      uptime,

      processes,
    } = req.body;

    let device = await Device.findOne({ deviceId });

    // Save metrics history
    await Metrics.create({
      deviceId,

      cpuUsage,
      ramUsage,
      diskUsage,

      networkSent,
      networkReceived,

      uptime,

      timestamp: new Date(),
    });

    // CPU Alert
    if (cpuUsage > 80) {
      const alert = await Alert.create({
        deviceId,
        deviceName,
        type: "cpu",
        message: `High CPU usage detected (${cpuUsage}%)`,
        severity: "high",
      });

      req.app.get("io").emit("newAlert", alert);
    }

    // RAM Alert
    if (ramUsage > 85) {
      const alert = await Alert.create({
        deviceId,
        deviceName,
        type: "ram",
        message: `High RAM usage detected (${ramUsage}%)`,
        severity: "high",
      });

      req.app.get("io").emit("newAlert", alert);
    }

    // Disk Alert
    if (diskUsage > 90) {
      const alert = await Alert.create({
        deviceId,
        deviceName,
        type: "disk",
        message: `High Disk usage detected (${diskUsage}%)`,
        severity: "high",
      });

      req.app.get("io").emit("newAlert", alert);
    }

    // Update existing device
    if (device) {
      device.deviceName = deviceName;
      device.username = username;

      device.ipAddress = ipAddress;
      device.localIp = localIp;
      device.publicIp = publicIp;
      device.macAddress = macAddress;

      device.location = location;
      device.status = status;

      device.os = os;
      device.osVersion = osVersion;
      device.architecture = architecture;

      device.cpuModel = cpuModel;

      device.cpuUsage = cpuUsage;
      device.ramUsage = ramUsage;
      device.diskUsage = diskUsage;

      device.totalRam = totalRam;
      device.totalDisk = totalDisk;
      device.freeDisk = freeDisk;

      device.networkSent = networkSent;
      device.networkReceived = networkReceived;

      device.uptime = uptime;

      device.processes = processes;

      device.lastSeen = new Date();

      await device.save();

      req.app.get("io").emit("deviceUpdated", device);

      return res.json(device);
    }

    // Create new device
    device = await Device.create({
      deviceId,
      deviceName,

      username,

      ipAddress,
      localIp,
      publicIp,
      macAddress,

      location,
      status,

      os,
      osVersion,
      architecture,

      cpuModel,

      cpuUsage,
      ramUsage,
      diskUsage,

      totalRam,
      totalDisk,
      freeDisk,

      networkSent,
      networkReceived,

      uptime,

      processes,

      lastSeen: new Date(),
    });

    req.app.get("io").emit("deviceUpdated", device);

    res.status(201).json(device);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDevices,
  registerOrUpdateDevice,
};