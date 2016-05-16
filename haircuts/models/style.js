var mongoose = require('mongoose');

//var addressSubschema = {
//    street: String, number: String, zip: String, city: String
//}
// img path
//var imgPath = '/path/to/some/img.png';

var StyleSchema = new mongoose.Schema({
  type: { type: String,  required: true },
  tools: String,
  notes: String,
  duration: Number,
  media: {data: Buffer, contentType: String},
  cost: Number,
  stylist: String,
  haircutRating: Number,
  salonName: String,
  //salonLocation: [addressSubschema],
  // user_id: {type: mongoose.Schema.User.ObjectId, ref:'User'},
}, { timestamps: true });  // createdAt, updatedAt

//function date2String(date) {
//  var options = {
//    weekday: 'long', year: 'numeric', month: 'short',
//    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
//  };
//  return date.toLocaleDateString('en-US', options);
//}

//StyleSchema.methods.getCreatedAt = function() {
//  return date2String(this.createdAt);
//};

//StyleSchema.methods.getUpdatedAt = function() {
//  return date2String(this.updatedAt);
//};


module.exports = mongoose.model('Style', StyleSchema);
