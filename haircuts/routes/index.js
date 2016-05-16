var express = require('express');
var router = express.Router();
//var User = require('../models/user');
//var Styles = require('../models/style');
//var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});  // add the message
});

// GET /signup
//router.get('/signup', function(req, res, next) {
//  res.render('signup.ejs');
//});

// POST /signup
//router.post('/signup', function(req, res, next) {
//  var signUpStrategy = passport.authenticate('local-signup', {
//    successRedirect : '/styles',
//    failureRedirect : '/signup',
//    failureFlash : true
//  });
//  return signUpStrategy(req, res, next);
//     res.redirect('/user/:id');
//   });

// GET /login
//router.get('/login', function(req, res, next) {
//  res.render('login.ejs');
//});

// POST /login
// router.post('/login', function(req, res, next) {
//   var loginProperty = passport.authenticate('local-login', {
//     successRedirect : '/styles',
//     failureRedirect : '/login',
//     failureFlash : true
//   });

//   return loginProperty(req, res, next);
// });

// GET /logout
//router.get('/logout', function(req, res, next) {
//  req.logout();
//  res.redirect('/');
//});

// Restricted page
//router.get('/secret', function(req, res, next) {
//   if (currentUser) {
//    res.render('secret.ejs');
//  }
//  else {
//    res.redirect('/');
//  }
//});

module.exports = router;

