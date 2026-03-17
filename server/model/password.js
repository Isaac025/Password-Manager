const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    site: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String, // encrypted password
      required: true,
    },
  },
  { timestamps: true },
);

const PASSWORD = mongoose.model("password", passwordSchema);

module.exports = PASSWORD;
