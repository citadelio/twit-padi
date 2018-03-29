var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var messages = require('express-messages');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
 
var app = express();
var port = 8010

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// flash messages
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'any thing',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = messages(req, res);
  next();
});

//use express router
var index = require('./routes/index');
app.use('/', index);

app.listen(process.env.PORT || port, function(){
	console.log(`Server started on port ${port}`)
})