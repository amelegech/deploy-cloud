const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
   foodname: String, 
   price: Number, 
   foodImage: Image, 
   rate: Number
})
module.exports = mongoose.model('Restaurant',userSchema);