const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const adminOnly = async (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
};

module.exports = {
  getProfile,
  adminOnly,
};