const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  visitHistory: [{timestamp: {type: Date}}]
}, {timestamps: true});

const Url = mongoose.model("urls", urlSchema);

module.exports = Url;