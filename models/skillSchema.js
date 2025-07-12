const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skillType: {
    type: String,
    enum: ["offered", "wanted"],
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please enter skill name"],
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  skillsOffered: {
    type: [String],
    default: [],
  },

  skillsWanted: {
    type: [String],
    default: [],
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});

module.exports = mongoose.model("Skill", skillSchema);
