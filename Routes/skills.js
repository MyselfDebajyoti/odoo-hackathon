const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const Skill = require("../models/skillSchema");

// @route   POST /api/skills
// @desc    Add a new skill
router.post("/", protect, async (req, res) => {
  const { skillType, name, description } = req.body;

  try {
    const skill = new Skill({
      user: req.user.id,
      skillType,
      name,
      description,
    });

    await skill.save();
    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/skills
// @desc    Get all skills for current user
router.get("/", protect, async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user.id });
    res.json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/skills/search
// @desc    Search skills
router.get("/search", protect, async (req, res) => {
  const { q } = req.query;

  try {
    const skills = await Skill.find({
      name: { $regex: q, $options: "i" },
    }).populate("user", "name profilePhoto");

    res.json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete a skill
router.delete("/:id", protect, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json({ message: "Skill removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
