var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
global.__base = __dirname + '/';

var app = express();

var scribe = require('scribe-js/scribe')(); //loads Scribe
var fs = require('fs');

var console = process.console;

var mongoose = require('mongoose');
//mongoose.connect('mongodb://71.51.203.72:27017/tsccmstest', 
//mongoose.connect('mongodb://192.168.1.104:27017/tsccmstest', 
mongoose.connect('mongodb://topeysoft:tinbed123@ds063124.mongolab.com:63124/tscapi', 
//mongoose.connect('mongodb://127.0.0.1:27017/tsccms', 
  function (err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var config = require(__base + 'data/config');
var routes = require(__base + 'routes/index');
var preview = require(__base + 'routes/preview');
var apiRoute = require(__base + 'routes/api');
var adminRoute = require(__base + 'routes/admin');
var users = require(__base + 'routes/users');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use('/logs', scribe.webPanel());
// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/api', apiRoute);
app.use('/admin', adminRoute);
app.use('/users', users);
app.use('/preview', preview);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render(config.current_theme + '/error', {
            message: err.message,
            error: err,
            app_info: config.app_info
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render(config.current_theme + '/error', {
        message: err.message,
        error: {},
        app_info: config.app_info
    });
});


module.exports = app;
