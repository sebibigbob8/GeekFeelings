const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const pictureSchema = new Schema({
    src: {
        type: String,
        unique: false,
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
            validator: function validateUser(value) {
                if (!value) {
                    return false;
                } else if (!ObjectId.isValid(value)) {
                    return false;
                }
                mongoose.model('User').findOne({_id: ObjectId(value)}).exec(function (err, user) {
                    if (err || !user) {
                        //TODO: send correct error message
                        throw new Error('Not validate');
                    }
                });
            }
        }
    }
});
module.exports = mongoose.model('Picture', pictureSchema);