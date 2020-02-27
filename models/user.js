let mongoose = require('mongoose');
mongoose.set('userCreateIndex', true);
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
  username:String,
  password:String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema)