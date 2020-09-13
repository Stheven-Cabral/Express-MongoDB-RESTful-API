// In this module we are creating the model or schema of how the data looks for posts.
const mongoose = require('mongoose');

// In the schema below, we describe how the data will look.
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Posts', PostSchema);