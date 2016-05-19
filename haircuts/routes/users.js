var express = require('express');
var router = express.Router();
var User = require('../models/user');

function makeError(res, message, status) {
    res.statusCode = status;
    var error = new Error(message);
    error.status = status;
    return error;
}

var authenticate = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
}

/* GET users listing. */
//router.get('/', authenticate, function(req, res, next) {
//var users = global.currentUser.users;
// res.render('users/index', { users: users});
//});


//SHOW
router.get('/:id', authenticate, function(req, res, next) {
    console.log(currentUser);
    var user = currentUser._id;
    // var users = global.currentUser.users;

    if (!user) return next(makeError(res, 'Document not found', 404));
    res.render('users/show', { user: user });
});


//EDIT
router.get('/:id/edit', function(req, res, next) {
    var user = currentUser.users.id(req.params.id);
    if (!user) return next(makeError(res, 'Document not found', 404));
    res.render('users/edit', { user: user });
});

//router.get('/:id/edit', function(req, res, next) {
//  User.findById(re.params.id)
//  .then(function(user) {
//var user = currentUser.users.id(req.params.id);
//if (!user) return next(makeError(res, 'Document not found', 404));
//res.render('edit', { user: user});
//}, function(err) {
//return next(err);
//});
//});


//UPDATE
router.put('/:id', authenticate, function(req, res, next) {
    var user = currentUser.users.id(req.params.id);
    if (!user) return next(makeError(res, 'Document not found', 404));
    else {
        user.email = req.body.email;
        user.password = req.body.username;
        currentUser.save()
            .then(function(saved) {
                res.redirect('/users');
            }, function(err) {
                return next(err);
            });
    };
});

//DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
    var user = currentUser.users.id(req.params.id);
    if (!user) return next(makeError(res, 'Document not found', 404));
    var index = currentUser.users.indexOf(user);
    currentUser.users.splice(index, 1);
    currentUser.save()
        .then(function(saved) {
            res.redirect('/users');
        }, function(err) {
            return next(err);
        });
});


module.exports = router;
