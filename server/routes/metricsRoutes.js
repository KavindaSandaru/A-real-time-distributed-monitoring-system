const express = require("express");

const router = express.Router();

const Metrics = require("../models/Metrics");

router.get("/:deviceId", async (req, res) => {
  try {
    const metrics = await Metrics.find({
      deviceId: req.params.deviceId,
    })
      .sort({ createdAt: 1 })
      .limit(50);

    res.json(metrics);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;