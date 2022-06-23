const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  role: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("candidates", candidateSchema);
