const { bool } = require('joi');
const mongoose = require('mongoose')
// Define schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
  username: String,
  password: String,
  onlineStatus:Object
});

// Compile model from schema
var UserModel = mongoose.model('UserModel', UserModelSchema );
module.exports=UserModel;