var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var StyleSchema = new mongoose.Schema({
  type: { type: String,  required: true },
  tools: String,
  date: Date,
  notes: String,
  duration: String,
  cost: String,
  stylist: String,
  haircutRating: String,
  salonName: String,
  salonLocation: String,
  avatar_url: String,
  users: { type: Schema.ObjectId, ref:"User" }
});

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  }
   return date.toLocaleDateString('en-US', options);
 };

 StyleSchema.methods.getCreatedAt = function() {
   return date2String(this.createdAt);
 };

module.exports = mongoose.model('Style', StyleSchema);
