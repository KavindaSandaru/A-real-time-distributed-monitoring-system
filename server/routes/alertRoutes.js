const express = require("express");

const router = express.Router();

const Alert = require("../models/Alert");

router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(alerts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/", async (req, res) => {
  try {

    await Alert.deleteMany({});

    req.app.get("io").emit("alertsCleared");

    res.json({
      message: "All alerts cleared",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;