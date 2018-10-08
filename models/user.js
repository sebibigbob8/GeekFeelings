const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for users
const userSchema = new Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        min: 6
    },
    password :  {
        type: String,
        min: 6
    },
    street : String,
    streetNumber : String,
    npa : {
        type : number,
        min : 4,
        max : 4,
    },
    city : String,
    dateBirth : Date,
    description : String,
    tag : Array
});
// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);