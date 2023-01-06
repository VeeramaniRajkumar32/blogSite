const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique:true,
    minlength:3
  },
  password: {
    type: String,
    required: true
  },
  token: { 
    type: String
  },
},{
    timestamps:true
});

module.exports = mongoose.model("user",userSchema,"user");