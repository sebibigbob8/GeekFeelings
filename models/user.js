const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for users
const userSchema = new Schema({
    name: String,
    username : String,
    street : String,
    streetNumber : String,
    npa : Number,
    city : String,
    dateNaissance : Date,
    description : String,
    tag : Array,
});
// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);