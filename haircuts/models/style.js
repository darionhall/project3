var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// var addressSubschema = {
//     street: String, number: String, zip: String, city: String
// }

var StyleSchema = new Schema({
  type: { type: String,  required: true },
  date: Date,
  notes: String,
  duration: String,
  cost: Number,
  stylist: String,
  haircutRating: Number,
  salonName: String,
  // salonLocation: [addressSubschema],
  avatar_url: String,
  users: { type: Schema.ObjectId, ref:"User" }
});

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

StyleSchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

StyleSchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};


module.exports = mongoose.model('Style', StyleSchema);
