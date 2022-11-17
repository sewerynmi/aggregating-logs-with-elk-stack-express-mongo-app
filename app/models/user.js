let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  age: {
    type: Number,
    min: [1],
    max: [110],
    required: [true, "User should have age"],
  },
});

module.exports = mongoose.model("User", UserSchema);
