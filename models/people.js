/**
 * TEST
 * @type {*|Mongoose}
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define a schema
const peopleSchema = new Schema({
    name: String,
    birthDate: String,
    date: { type: Date, default: Date.now  }, // Default value
    children : Number,
    address : String,
    street : String,
    interests : String,
    phone : Number
});
// Create the model from the schema and export it
module.exports = mongoose.model('People', peopleSchema);