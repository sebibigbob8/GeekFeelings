const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for users
const pictureSchema = new Schema({
    src: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 60,
        unique: true,
        validate: {
            validator: validatePictureSrcUniqueness,
            message: 'Picture {value} already exists'
        }
    },
    description: {
        type: String,
        minlength: 0,
        maxlength: 200,
    }
    
});

function validatePictureUniquess(value, callback){
    const image = this;
    this.constructor.findOne().where('src').equals(value).exec(function(err, existingImg) {
        callback(!err && (!existingImg || existingImg._id.equals(img._id)));
    });
}
// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);