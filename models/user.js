const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var softDelete = require('mongoose-delete');
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        min: 6,
        required: true
    },
    password: {
        type: String,
        min: 6,
        select: false,
        required : true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    street: {
        type: String,
        required: true
    },
    streetNumber: {
        type: String,
        required: true
    },
    npa: {
        type: Number,
        min: 1000,
        max: 9999,
    },
    city: {
        type: String,
        required: true
    },
    dateBirth: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: Array
    },
    deleted: {
        select: false
    }
});


//userSchema.plugin(softDelete);
userSchema.plugin(softDelete, {overrideMethods: 'all'});
module.exports = mongoose.model('User', userSchema);