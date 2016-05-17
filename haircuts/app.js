var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var morgan = require('morgan');
var fs = require('fs');
var aws = require('aws-sdk');
var session = require('express-session');
var AWS_ACCESS_KEY  = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY  = process.env.AWS_SECRET_KEY;
var S3_BUCKET     = process.env.S3_BUCKET;

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
var mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/haircuts'
mongoose.connect(mongoUri);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser({uploadDir:'./uploads'}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(methodOverride(function(req, res){
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
   // look in urlencoded POST bodies and delete it
   var method = req.body._method;
   delete req.body._method;
   return method;
 }
}));
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


app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    aws.config.update({region: '' , signatureVersion: '' });
    var s3 = new aws.S3();
    console.log(S3_BUCKET)
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
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
