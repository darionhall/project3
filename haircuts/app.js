var flash = require('connect-flash');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var morgan = require('morgan');
var $ = require('jQuery');

//sendgrid
var sendgrid  = require('sendgrid')('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');

    // var payload   = {
    //   to      : 'darionhall@gmail.com',
    //   from    : 'darionhall2@gmail.com',
    //   subject : 'Subject',
    //   text    : 'Can you style this?'
    // };

    // var success = false;
    // var error;
    // sendgrid.send(new sendgrid.Email(payload), function(err, json) {
    //   if (err) {
    //     console.error(err);
    //     // error = err;
    //   }
    //   else{
    //     success = true;
    //   }
    // });


//passport
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

//Routes
var routes = require('./routes/index');
var users = require('./routes/users');
var stylesRouter = require('./routes/styles');

var app = express();

//Connect to database
mongoose.connect('mongodb://localhost/styles');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


//passport
app.use(session({ secret: "Don't get a bad haircut", cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport/passport')(passport);

//Middleware that allows use to use the currentUser in our views and routing
app.use(function(req, res, next){
  global.currentUser = req.user;
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/styles', stylesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler; will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler; no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log('Running in %s mode', app.get('env'));

module.exports = app;
