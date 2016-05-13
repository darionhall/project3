var express = require('express');
var router = express.Router();

var Style = require('../models/style');



function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
  // get all the styles and render the index view
  var styles = global.currentUser.styles;
  res.render('styles/index', { styles: styles, message: req.flash() });
});

// NEW
router.get('/styles/new', authenticate, function(req, res, next) {
  var style = {
    title: '',
    completed: false
  };
  res.render('styles/new', { style: style, message: req.flash() });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var style = currentUser.styles.id(req.params.id);
  if (!style) return next(makeError(res, 'Document not found', 404));
  res.render('styles/show', { style: style, message: req.flash() } );
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var style = {
    title: req.body.title,
    completed: req.body.completed ? true : false
  };
  // Since a user's styles are an embedded document, we just need to push a new
  // style to the user's list of styles and save the user.
  currentUser.styles.push(style);
  currentUser.save()
  .then(function() {
    res.redirect('/styles');
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var style = currentUser.styles.id(req.params.id);
  if (!style) return next(makeError(res, 'Document not found', 404));
  res.render('styles/edit', { style: style, message: req.flash() } );
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var style = currentUser.styles.id(req.params.id);
  if (!style) return next(makeError(res, 'Document not found', 404));
  else {
    style.title = req.body.title;
    style.completed = req.body.completed;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/styles');
    }, function(err) {
      return next(err);
    });
  }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var style = currentUser.styles.id(req.params.id);
  if (!style) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.styles.indexOf(style);
  currentUser.styles.splice(index, 1);
  currentUser.save()
  .then(function(saved) {
    res.redirect('/styles');
  }, function(err) {
    return next(err);
  });
});



module.exports = router;
