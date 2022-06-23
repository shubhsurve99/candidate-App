const express = require("express");
const router = express.Router();

// Candidate model
const Candidates = require("../models/candidates");

// @route   GET /api/candidates/
// @desc    Get all candidates
// @access  Public
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidates.find({});
    res.send({ candidates });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   GET /api/candidates/:id
// @desc    Get a specific candidate
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const candidate = await Candidates.findById(req.params.id);
    res.send({ candidate });
  } catch (err) {
    res.status(404).send({ message: "Candidate not found!" });
  }
});

// @route   POST /api/candidates/
// @desc    Create a candidate
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newCandidate = await Candidates.create({
      name: req.body.name,
      phone: req.body.phone,
      role: req.body.role,
      rating: req.body.rating,
    });
    res.send({ newCandidate });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   PUT /api/candidates/:id
// @desc    Update a candidate
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const updatedCandidate = await Candidates.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ message: "The candidate was updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/candidates/:id
// @desc    Delete a candidate
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const removeCandidate = await Candidates.findByIdAndRemove(req.params.id);
    res.send({ message: "The candidate was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
