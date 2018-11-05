const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
var softDelete = require('mongoose-delete');

// Define the schema for rdvs
const rdvSchema = new Schema({

    creator: {
        type: String,
        required: true
    },

    date: {
      type: Date,
      required: true
    },

    guest: {
        type: String,
        required: false
    },

    city: {
        type : String,
        required: true
    },
    npa :  {
        type: Number,
        min: 6,
        select: true
    },
    street: {
        type: String,
        required: true
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
        required: false
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
