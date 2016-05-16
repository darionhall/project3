var mongoose = require('mongoose');
//var User = require('./models/user');
var Style = require('./models/style');

mongoose.connect('mongodb://localhost/styles') //update based on routes

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('Quitting!');
}
// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old users...');
User.remove({})
.then(function(){
  console.log('previous users removed');
  console.log('creating new users');
  var joe = new User({ fName:'Joe', lName: 'Schmoe', email: 'JSchmoe@gmail.com', username: 'JSchmoe', password:'abc123!'}),
  var jane = new User({ fName:'Jane', lName: 'Shay', email: 'JShay@gmail.com', username: 'JShay', password:'abc123!', style_id:1}),
})
.then(function(savedUsers){
  console.log('Just saved', savedUsers.length, 'users.');
  return User.find({});
})
.then(function(allUsers){
  console.log('Printing all users:')
  allusers.forEach(function(user){
    console.log(user);
  });
  return User.findOne({username:'JSchmoe'});
})
.then(function(JSchmoe) {
  JSchmoe.completed = true;
  return JSchmoe.save();
})
.then(function(JSchmoe) {
  console.log('updated JSchmoe:', JSchmoe);
  return JSchmoe.remove();
})
.then(function(deleted) {
  return User.find({});
})
.then(function(allUsers) {
  console.log('Printing all users:');
  allUsers.forEach(function(user) {
    console.log(user);
})
///.then functions for the rest of crud

console.log('removing old styles...');
User.remove({})
.then(function(){
  console.log('previous styles removed');
  console.log('creating new styles');
  var short = new Style({ type: 'short', tools:'clipperblade #2, blow drier, pomade-medium', notes: 'has a cowlick on the back left of the head. Will make hair wonky.', duration: 45, media: 'http://66.media.tumblr.com/071c3f43c5f4fc10bdbe30804bcef452/tumblr_ncq4vislXG1tq0584o1_500.jpg', stylist: 'CC', haircutRating: '5/10', salonName: 'Mary Todd Salon', location: '188 Caroll St SE, Atlanta, GA, 30312'
, user_id: 1}),

var buzz = new Style({ type: 'buzz', tools:'clipperblade #4', notes: 'has a cowlick on the back left of the head. Will make hair wonky.', duration: 45, media: 'http://66.media.tumblr.com/071c3f43c5f4fc10bdbe30804bcef452/tumblr_ncq4vislXG1tq0584o1_500.jpg', stylist: 'CC', haircutRating: '5/10', salonName: 'Mary Todd Salon', location: '188 Caroll St SE, Atlanta, GA, 30312'
, user_id: 2})
});
.then(function(savedStyles){
  console.log('Just saved', savedStyles.length, 'styles.');
  return Styles.find({});
})
.then(function(allStyles){
  console.log('Printing all Styles:')
  allstyles.forEach(function(style){
    console.log(user);
  });
  return style.findOne({type:'buzz'});
})
.then(function(buzz) {
  buzz.completed = true;
  return buzz.save();
})
.then(function(buzz) {
  console.log('updated buzz:', buzz);
  return buzz.remove();
})
.then(function(deleted) {
  return Style.find({});
})
.then(function(allStyles) {
  console.log('Printing all styles:');
  allStyles.forEach(function(style) {
    console.log(style);
  });
quit();




