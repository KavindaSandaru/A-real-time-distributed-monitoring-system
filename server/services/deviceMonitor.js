const cron = require("node-cron");

const Device = require("../models/Device");

const startDeviceMonitor = () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const fiveMinutesAgo = new Date(
        Date.now() - 60 * 1000
      );

      await Device.updateMany(
        {
          lastSeen: {
            $lt: fiveMinutesAgo,
          },
        },
        {
          status: "offline",
        }
      );

      console.log(
        "Offline device check completed"
      );
    } catch (error) {
      console.error(error);
    }
  });
};

module.exports = startDeviceMonitor;