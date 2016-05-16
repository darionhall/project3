var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var User = require('../models/user');
var Styles = require('../models/style');
// var passport = require('passport');
=======
//var User = require('../models/user');
//var Styles = require('../models/style');
var passport = require('passport');
>>>>>>> e8989f4c8d4be545705688cb1047098003fa5922

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', message: req.flash()});  // add the message
});

// GET /signup
router.get('/signup', function(req, res, next) {
<<<<<<< HEAD
  res.render('signup.ejs');
=======
  res.render('signup.ejs', { message: req.flash()});
>>>>>>> e8989f4c8d4be545705688cb1047098003fa5922
});

// POST /signup
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
<<<<<<< HEAD
    successRedirect : '/todos',
=======
    successRedirect : '/styles',
>>>>>>> e8989f4c8d4be545705688cb1047098003fa5922
    failureRedirect : '/signup',
    failureFlash : true
  });
  return signUpStrategy(req, res, next);
<<<<<<< HEAD
    res.redirect('/user/:id');
});

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login.ejs');
});

// POST /login
// router.post('/login', function(req, res, next) {
//   var loginProperty = passport.authenticate('local-login', {
//     successRedirect : '/todos',
//     failureRedirect : '/login',
//     failureFlash : true
//   });
=======
//     res.redirect('/user/:id');
   });

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash()});
});

// POST /login
 router.post('/login', function(req, res, next) {
   var loginProperty = passport.authenticate('local-login', {
     successRedirect : '/styles',
     failureRedirect : '/login',
     failureFlash : true
   });
>>>>>>> e8989f4c8d4be545705688cb1047098003fa5922

   return loginProperty(req, res, next);
 });

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

// Restricted page
router.get('/secret', function(req, res, next) {
<<<<<<< HEAD
  if (currentUser) {
=======
   if (currentUser) {
>>>>>>> e8989f4c8d4be545705688cb1047098003fa5922
    res.render('secret.ejs');
  }
  else {
    res.redirect('/');
  }
});

module.exports = router;

