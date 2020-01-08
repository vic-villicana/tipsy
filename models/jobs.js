let mongoose = require("mongoose");

let jobSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  drinkers:Number,
  description:String,
})

module.exports = mongoose.model("jobs", jobSchema);

