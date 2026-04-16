const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: String, default: "" },
    complete: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Todo", TodoSchema);
