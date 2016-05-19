var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt = require('bcrypt-nodejs');
var Style = require('./style');
var User = require('./user');

var User = new mongoose.Schema({
  local : {
    fname : { type: String,  required: true },
    lname : String,
    email    : { type: String,  required: true },
    password : { type: String,  required: true }
  },
  styles : [Style.schema]
});

User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);
