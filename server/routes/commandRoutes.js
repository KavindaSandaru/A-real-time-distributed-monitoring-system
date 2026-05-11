const express = require("express");

const router = express.Router();

const Command = require("../models/Command");

/* Create Command */
router.post("/", async (req, res) => {

  try {

    const command =
      await Command.create(req.body);

    res.status(201).json(command);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

/* Agent Fetch Commands */
router.get("/:deviceId", async (req, res) => {

  try {

    const commands =
      await Command.find({
        deviceId: req.params.deviceId,
        status: "pending",
      });

    res.json(commands);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

/* Mark Executed */
router.put("/:id", async (req, res) => {

  try {

    const command =
      await Command.findById(req.params.id);

    if (!command) {

      return res.status(404).json({
        message: "Command not found",
      });

    }

    command.status = "completed";

    await command.save();

    res.json(command);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;