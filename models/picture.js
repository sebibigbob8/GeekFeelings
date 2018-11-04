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
        REF: "User",
        default: null,
        required: true,
    }
    
    
});



pictureSchema.virtual('userHref').get(getUserHref).set(setUserHref);


function getUserHref() {
  return `/api/user/${this.user._id || this.user}`;
}


function setUserHref(value) {

  // Store the original hyperlink 
  this._userHref = value;

  // Remove "/api/user/" from the beginning of the value
  const personId = value.replace(/^\/api\/user\//, '');

  if (ObjectId.isValid(personId)) {
    // Set the director if the value is a valid MongoDB ObjectId
    this.user = personId;
  } else {
    // Unset the director otherwise
    this.user = null;
  }
}


function validateUser(value, callback) {
  if (!value && !this._userHref) {
    this.invalidate('userHref', 'Path `userHref` is required', value, 'required');
    return callback();
  } else if (!ObjectId.isValid(value)) {
    this.invalidate('userHref', 'Path `userHref` is not a valid User reference', this._userHref, 'resourceNotFound');
    return callback();
  }

  mongoose.model('User').findOne({ _id: ObjectId(value) }).exec(function(err, user) {
    if (err || !user) {
      this.invalidate('userHref', 'Path `userrHref` does not reference a User that exists', this._userrHref, 'resourceNotFound');
    }

    callback();
  });
}
/**
function validatePictureSrcUniqueness(value, callback) {
    const picture = this;
    this.constructor.findOne().where('src').equals(value).exec(function(err, existingPicture) {
        callback(!err && (!existingPicture || existingPicture._id.equals(picture._id)));
    });
}
*/




module.exports = mongoose.model('Picture', pictureSchema);