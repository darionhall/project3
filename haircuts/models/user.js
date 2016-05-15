var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Style = require('./style'); //this paht may be different...not sure yet.

// img path
var imgPath = '/path/to/some/img.png';

var UserSchema = new mongoose.Schema({
  fName: { type: String,  required: true },
  lName: { type: String, required: true },
  email: {type: String, match: /.+\@.+\..+/,required: true},
  username: {type: String, required: true},
  password: {type: String, validate: [
      function(password) {
        return password.length >= 5;
      },
      'Password should be longer'
    ], required: true},
  profilePic: {type: String , default: 'http://www.sessionlogs.com/media/icons/defaultIcon.png'},
  // style_id: {type: mongoose.Schema.Style.ObjectId, ref:'User'},
}, {timestamps: true});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', UserSchema);
