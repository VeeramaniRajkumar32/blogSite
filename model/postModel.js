const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", PostSchema,"post");