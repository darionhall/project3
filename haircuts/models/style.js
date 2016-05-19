var mongoose = require('mongoose');
//do we need to reference user model?

// img path
var imgPath = '/path/to/some/img.png';

var StyleSchema = new mongoose.Schema({
  //createdAt: { type: Date },
  type: { type: String,  required: true },
  tools: String,
  notes: String,
  duration: String,
  cost: Number,
  stylist: String,
  haircutRating: Number,
  salonName: String,
  salonLocation: String,
}, { timestamps: true });  // createdAt, updatedAt

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
