const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const User = require("../models/userSchema");

// @route   PUT /api/users
// @desc    Update user profile
router.put("/", protect, async (req, res) => {
  const { name, location, profilePhoto, isPublic, availability } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, location, profilePhoto, isPublic, availability },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/users
// @desc    Get all public users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ isPublic: true }).select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isPublic && user._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this profile" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
