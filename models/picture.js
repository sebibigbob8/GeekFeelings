const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
// Define the schema for users
const pictureSchema = new Schema({
    src: {
        type: String,
        required: true,
        unique: true,
        /**
        validate: {
            validator: validatePictureSrcUniqueness,
            message: 'Picture {value} already exists'
        }
        */
    },
    description: {
        type: String,
        minlength: 0,
        maxlength: 200,
    }
    
});

module.exports = mongoose.model('Picture', pictureSchema);