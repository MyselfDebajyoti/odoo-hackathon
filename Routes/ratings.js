const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const Rating = require("../models/ratingSchema");
const SwapRequest = require("../models/swapRequest");

// @route   POST /api/ratings
// @desc    Add a rating for a swap
router.post("/", protect, async (req, res) => {
  const { swapId, rating, feedback } = req.body;

  try {
    const swap = await SwapRequest.findById(swapId);
    if (!swap) {
      return res.status(404).json({ message: "Swap not found" });
    }

    if (swap.status !== "completed") {
      return res
        .status(400)
        .json({ message: "Only completed swaps can be rated" });
    }

    if (
      swap.requester.toString() !== req.user.id &&
      swap.recipient.toString() !== req.user.id
    ) {
      return res
        .status(401)
        .json({ message: "Not authorized to rate this swap" });
    }

    const ratedUserId =
      swap.requester.toString() === req.user.id
        ? swap.recipient
        : swap.requester;

    const newRating = new Rating({
      swap: swapId,
      rater: req.user.id,
      ratedUser: ratedUserId,
      rating,
      feedback,
    });

    await newRating.save();
    res.json(newRating);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/ratings/user/:userId
// @desc    Get ratings for a user
router.get("/user/:userId", protect, async (req, res) => {
  try {
    const ratings = await Rating.find({ ratedUser: req.params.userId })
      .populate("rater", "name profilePhoto")
      .populate("swap", "requestedSkill offeredSkill");

    res.json(ratings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
