const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  buildCommand: { type: String },
  startCommand: { type: String },
  envVariables: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  status: { type: String, default: "stopped" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Service", serviceSchema);
