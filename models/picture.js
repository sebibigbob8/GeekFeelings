const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
// Define the schema for users
const pictureSchema = new Schema({
    src: {
        type: String,
        required: true,
        unique: true,
        /**validate: {
            validator: validatePictureSrcUniqueness,
            message: 'Picture {value} already exists',
            isAsync: true,
        }*/
    },
    description: {
        type: String,
        minlength: 0,
        maxlength: 200,
    },
    user: {
        type: String,
        default: null,
        required: true,
    }
    
    
});

/**
function validatePictureSrcUniqueness(value, callback) {
    const picture = this;
    this.constructor.findOne().where('src').equals(value).exec(function(err, existingPicture) {
        callback(!err && (!existingPicture || existingPicture._id.equals(picture._id)));
    });
}
*/




module.exports = mongoose.model('Picture', pictureSchema);