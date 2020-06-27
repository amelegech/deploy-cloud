const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const Schema = mongoose.Schema;
const userSchema = new Schema({
   name: String, 
   email: String, 
   password: String, 
   role: String,
})
module.exports = mongoose.model('User', userSchema);