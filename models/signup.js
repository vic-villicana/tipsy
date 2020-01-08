let mongoose = require('mongoose');

let signupSchema = new mongoose.Schema({
  email:String
})

module.exports = mongoose.model("signups", signupSchema);