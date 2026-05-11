const express = require("express");

const router = express.Router();

const {
  getDevices,
  registerOrUpdateDevice,
} = require("../controllers/deviceController");

router.get("/", getDevices);

router.post("/", registerOrUpdateDevice);

module.exports = router;