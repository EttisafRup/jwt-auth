const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    default: Date.now,
  },
});

module.exports = Schema;
