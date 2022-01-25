const mongoose = require("mongoose");

// Schema
const noteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Model
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
