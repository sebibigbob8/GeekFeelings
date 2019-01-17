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
    }
});
module.exports = mongoose.model('Picture', pictureSchema);