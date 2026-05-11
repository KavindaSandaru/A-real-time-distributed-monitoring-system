const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getProfile,
  adminOnly,
} = require("../controllers/userController");

router.get("/profile", protect, getProfile);

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  adminOnly
);

module.exports = router;