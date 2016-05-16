
var mongoose = require('mongoose');
var Style = require('./models/style');

mongoose.connect('mongodb://localhost/styles');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old styles...');
Style.remove({})
.then(function() {
  console.log('old styles removed');
  console.log('creating some new styles...');
  var groceries  = new Style({ type: String,  required: true });
  var feedTheCat = new Style({ type: String,  required: true });
  return Style.create([groceries, feedTheCat]);
})
.then(function(savedStyles) {
  console.log('Just saved', savedStyles.length, 'styles.');
  return Style.find({});
})
.then(function(allStyles) {
  console.log('Printing all todos:');
  allStyles.forEach(function(style) {
    console.log(style);
  });
  return Style.findOne({title: 'groceries'});
})
.then(function(groceries) {
  groceries.completed = true;
  return groceries.save();
})
.then(function(groceries) {
  console.log('updated groceries:', groceries);
  return groceries.remove();
})
.then(function(deleted) {
  return Style.find({});
})
.then(function(allStyles) {
  console.log('Printing all todos:');
  allStyles.forEach(function(style) {
    console.log(style);
  });
  quit();
});
