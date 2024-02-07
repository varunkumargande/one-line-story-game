const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  created_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  content: {
    type: String,
    minLength: 3,
    required: true,
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
