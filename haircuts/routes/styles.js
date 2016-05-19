var express = require('express');
var router = express.Router();
var Style = require('../models/style');
//sendgrid (email)
var sendgrid  = require('sendgrid')('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');


function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

 function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}

function buttonAction1(res){
  res.send('ok');
}


// INDEX
router.get('/', authenticate, function(req, res, next) {
  // get all the styles and render the index view
  var styles = global.currentUser.styles;
  res.render('styles/index', { styles: styles});
});



// NEW
router.get('/new', authenticate, function(req, res, next) {
  var style = {
    createdAt: '',
    type: '',
    tools: '',
    notes: '',
    duration: '',
    media: '',
    cost: '',
    stylist: '',
    haircutRating: '',
    salonName: ''
  };
  res.render('styles/new', { style: style});
});


// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var style = currentUser.styles.id(req.params.id);
  if (!style) return next(makeError(res, 'Document not found', 404));
  res.render('styles/show', { style: style} );
});


// EMAIL
// add req.body.media to text when aws api is added
router.post('/send', function (req, res, next) {
  console.log(req.body, global.currentUser.local.email);
    buttonAction1(res);
    var textMessage = "\n Type: " + req.body.type + " \n Tools: " + req.body.tools + " \n Duration: " + req.body.duration + " \n Cost: " + req.body.cost + " \n Stylist: " + req.body.stylist + " \n Salon: " + req.body.salonName + " \n Salon Location: " + req.body.salonLocation + " \n Notes: " + req.body.notes + " \n Haircut Rating: " + req.body.haircutRating
    var payload   = {
      to      : req.body.email,
      from    : global.currentUser.local.email,
      subject : 'Style.Up',
      text    : textMessage
    };
    // var error;
    sendgrid.send(new sendgrid.Email(payload), function(err, json) {
      if (err) {
        console.error(err);
      }
      else{
        console.log(true);
      }
    });
    res.redirect('/styles', { style: style} );
});


// CREATE
router.post('/', authenticate, function(req, res, next) {
  var style = {
    creadtedAt: req.body.createdAt,
    type: req.body.type,
    tools: req.body.tools,
    notes: req.body.notes,
    duration: req.body.duration,
    media: req.body.media,
    cost: req.body.cost,
    stylist: req.body.stylist,
    haircutRating: req.body.haircutRating,
    salonName: req.body.salonName,
    salonLocation: req.body.salonLocation
  };
  /* Since a user's styles are an embedded document, we just need to push a new style to the user's list of styles and save the user. */
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
  res.render('styles/edit', { style: style});
});


// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var style = currentUser.styles.id(req.params.id);
  if (!style) return next(makeError(res, 'Document not found', 404));
  else {
    style.createdAt = req.body.createdAt;
    style.type = req.body.type;
    style.tools = req.body.tools;
    style.notes = req.body.notes;
    style.duration = req.body.duration;
    style.media = req.body.media;
    style.cost = req.body.cost;
    style.stylist = req.body.stylist;
    style.haircutRating = req.body.haircutRating;
    style.salonName = req.body.salonName;
    style.salonLocation = req.body.salonLocation;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/styles');
    }, function(err) {
      return next(err);
    });
  };
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
