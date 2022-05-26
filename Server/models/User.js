const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    rquired: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
});

module.exports = mongoose.model("user", User);
