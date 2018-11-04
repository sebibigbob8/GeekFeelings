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
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: function validateUser(value, callback) {
        if (!value) {
            return false;
        } else if (!ObjectId.isValid(value)) {
            return false;
        }
        mongoose.model('User').findOne({_id: ObjectId(value)}).exec(function (err, user) {
            if (err || !user) {
                throw new Error('Not validate');
            }
        });
    }
}
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