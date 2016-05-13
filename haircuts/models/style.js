var mongoose = require('mongoose');

var addressSubschema = {
    street: String, number: String, zip: String, city: String
}
// img path
var imgPath = '/path/to/some/img.png';

var StyleSchema = new mongoose.Schema({
  type: { type: String,  required: true },
  tools: { type: String, required: true },
  notes: type: String,
  duration: Number,
  media: {data: Buffer, contentType: String, required: true},
  cost: Number,
  stylist: String,
  haircutRating: Number,
  salonName: String,
  salonLocation: [addressSubschema],
  user_id: {type: mongoose.Schema.User.ObjectId, ref:'User'},
}, { timestamps: true });  // createdAt, updatedAt




module.exports = mongoose.model('Style', StyleSchema);
