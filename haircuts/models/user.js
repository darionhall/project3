var mongoose = require('mongoose');

// img path
var imgPath = '/path/to/some/img.png';

var UserSchema = new mongoose.Schema({
  fName: { type: String,  required: true },
  lName: { type: String, required: true },
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  profilePic: {type: String , default: 'http://www.sessionlogs.com/media/icons/defaultIcon.png'},
  // style_id: {type: mongoose.Schema.Style.ObjectId, ref:'User'},
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
