const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for users
const userSchema = new Schema({
    name: {
        type : String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        min: 6,
        required: true
    },
    password :  {
        type: String,
        min: 6,
        select: false
    },
    street : {
        type : String,
        required: true
    },
    streetNumber : {
        type : String,
        required: true
    },
    npa : {
        type : Number,
        min : 1000,
        max : 9999,
    },
    city : {
        type : String,
        required: true
    },
    dateBirth : {
        type : Date,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    tag : {
        type : Array
    }
});
// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);