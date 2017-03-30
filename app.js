var pru = require('pryjs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var session = require('express-session');
var hbs = require('hbs');

// It is a zero-dependency module that loads environment variables from a .env file into process.env.
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI);

// Getting the router files
// var index = require('./routes/index');
var users = require('./routes/users');
var sessionsRoute = require('./routes/sessions');
var placesRoute = require('./routes/places');
var photosRoute = require('./routes/photos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Gets the partial files
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
    secret: "thesecretcodeistopsecret",
    resave: false,
    saveUninitialized: false
}));


// Redirects into routers based on the user choice
app.use('/sessions', sessionsRoute);
app.use('/', users);
app.use('/:userId/places/', placesRoute);
app.use('/:userId/:placesId/photos/', photosRoute);
app.use('/:placesId/photos/', photosRoute);
app.use('/galary', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
