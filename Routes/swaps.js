const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const SwapRequest = require("../models/swapRequest");
const Skill = require("../models/skillSchema");

//    POST /api/swaps
//    Create a swap request
router.post("/", protect, async (req, res) => {
  const { recipientId, requestedSkillId, offeredSkillId } = req.body;

  try {
    const requestedSkill = await Skill.findById(requestedSkillId);
    const offeredSkill = await Skill.findById(offeredSkillId);

    if (!requestedSkill || !offeredSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (requestedSkill.user.toString() !== recipientId) {
      return res
        .status(400)
        .json({ message: "Requested skill does not belong to recipient" });
    }

    if (offeredSkill.user.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ message: "Offered skill does not belong to you" });
    }

    const swapRequest = new SwapRequest({
      requester: req.user._id,
      recipient: recipientId,
      requestedSkill: requestedSkillId,
      offeredSkill: offeredSkillId,
      status: "pending",
    });

    await swapRequest.save();
    res.json(swapRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//    GET /api/swaps/sent
//  Get swap requests sent by current user
router.get("/sent", protect, async (req, res) => {
  try {
    const swapRequests = await SwapRequest.find({ requester: req.user.id })
      .populate("recipient", "name profilePhoto")
      .populate("requestedSkill", "name description")
      .populate("offeredSkill", "name description");

    res.json(swapRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//    GET /api/swaps/received
//    Get swap requests received by current user
router.get("/received", protect, async (req, res) => {
  try {
    const swapRequests = await SwapRequest.find({
      recipient: req.user.id,
      status: "pending",
    })
      .populate("requester", "name profilePhoto")
      .populate("requestedSkill", "name description")
      .populate("offeredSkill", "name description");

    res.json(swapRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//    PUT /api/swaps/:id/accept
//     Accept a swap request
router.put("/:id/accept", protect, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);
    if (!swapRequest) {
      return res.status(404).json({ message: "Swap request not found" });
    }

    if (swapRequest.recipient.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    swapRequest.status = "accepted";
    await swapRequest.save();

    res.json(swapRequest);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Swap request not found" });
    }
    res.status(500).send("Server error");
  }
});

//    PUT /api/swaps/:id/reject
//    Reject a swap request
router.put("/:id/reject", protect, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);
    if (!swapRequest) {
      return res.status(404).json({ message: "Swap request not found" });
    }

    if (swapRequest.recipient.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    swapRequest.status = "rejected";
    await swapRequest.save();

    res.json(swapRequest);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Swap request not found" });
    }
    res.status(500).send("Server error");
  }
});

//    PUT /api/swaps/:id/cancel
//     Cancel a swap request (only requester can cancel)
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);
    if (!swapRequest) {
      return res.status(404).json({ message: "Swap request not found" });
    }

    if (swapRequest.requester.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (swapRequest.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending requests can be cancelled" });
    }

    swapRequest.status = "cancelled";
    await swapRequest.save();

    res.json(swapRequest);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Swap request not found" });
    }
    res.status(500).send("Server error");
  }
});

//    PUT /api/swaps/:id/complete
//     Mark a swap as completed
router.put("/:id/complete", protect, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);
    if (!swapRequest) {
      return res.status(404).json({ message: "Swap request not found" });
    }

    if (
      swapRequest.requester.toString() !== req.user.id &&
      swapRequest.recipient.toString() !== req.user.id
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (swapRequest.status !== "accepted") {
      return res
        .status(400)
        .json({ message: "Only accepted swaps can be completed" });
    }

    swapRequest.status = "completed";
    await swapRequest.save();

    res.json(swapRequest);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Swap request not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
