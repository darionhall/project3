var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Styles = require('../models/style');


var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}


//SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var currentUser = req.user;
  // User.findById(req.params.id)
  if (!currentUser) return next(makeError(res, 'Document not found', 404));
  res.render('./users/show', { user: currentUser} );
  }, function(err) {
    return next(err);
  ;
});


//EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var currentUser = req.user;
  if (!currentUser) return next(makeError(res, 'Document not found', 404));
  var checked = currentUser.completed ? 'checked' : '';
  res.render('users/edit', { user: currentUser, checked: checked} );
});


// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var currentUser = req.user;
  if (!currentUser) return next(makeError(res, 'Document not found', 404));
  else {
    currentUser.fName = req.body.fName;
    currentUser.lName = req.body.lName;
    currentUser.email = req.body.email;
    currentUser.password = req.body.username;
    currentUser.profilePic = req.body.profilePic
    console.log('about to save currentUser:', currentUser);
    currentUser.save()
    .then(function(saved) {
      // res.render('./users/show', { user: currentUser, message: req.flash() } );
      res.redirect('/users/' + saved._id);
    }, function(err) {
      return next(err);
    });
  };
});


//DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var currentUser = req.user;
  User.findByIdAndRemove(req.params.id)
  .then(function() {
    res.redirect('/users');
  }, function(err) {
    return next(err);
  });
});


module.exports = router;




