const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
var softDelete = require('mongoose-delete');

// Define the schema for rdvs
const rdvSchema = new Schema({
    city: {
        type : String,
        required: true
    },
    street: {
        type: String,
        unique: true,
        min: 6,
        required: true
    },
    npa :  {
        type: String,
        min: 6,
        select: true
    },
    streetNumber : {
        type : Number,
        required: true
    },
    purposeTitle : {
        type : String,
        required: true
    },
    description : {
        type : String,
        max : 9999,
    },
    category : {
        type : String,
        required: true
    },
});

rdvSchema.plugin(softDelete);
rdvSchema.plugin(softDelete, { overrideMethods: 'all' });
// Create the model from the schema and export it
module.exports = mongoose.model('Rdv', rdvSchema);