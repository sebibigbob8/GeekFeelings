const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const userSchema = require('./user')
const Schema = mongoose.Schema;
var softDelete = require('mongoose-delete');

// Define the schema for rdvs
const rdvSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    guest: {
        type: Array,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    purposeTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 9999,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    }
});

rdvSchema.plugin(softDelete);
rdvSchema.plugin(softDelete, {overrideMethods: 'all'});
// Create the model from the schema and export it
module.exports = mongoose.model('Rdv', rdvSchema);
