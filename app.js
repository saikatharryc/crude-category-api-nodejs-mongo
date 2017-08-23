// mongoose config
require('./database');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var methodOverride = require('method-override');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
const cors = require('cors');
var mongoose = require('mongoose');
var db = mongoose.model('collection');
var user = mongoose.model('User')

//routes
var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');


var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


app.get('/api', function (req, res) {
  res.render('upload', { title: 'Upload Photos' });
});


app.post('/api/upload', function (req, res) {

  var form = new formidable.IncomingForm();

  // Formidable Options
  form.uploadDir = __dirname + '/uploads';
  form.keepExtensions = true;
  form.on('file', function (field, file) {
    //rename the incoming file to the file's name
    fs.rename(file.path, form.uploadDir + "/" + file.name);
  });

  form.on('error', function (err) {
    console.log("an error has occured with form upload");
    console.log(err);
    request.resume();
  });

  form.on('aborted', function (err) {
    console.log("user aborted upload");
  });

  form.on('end', function () {
    console.log('-> upload done');
  });
 
  form.parse(req, function (err, fields, files) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('received upload:\n\n');
    res.end(util.inspect({ fields: fields, files: files }));
    new db({ imagep: req.file.imagep }, req.file).save(function (err, imo) {
      console.log(imo)
      res.redirect('/api/image');
    });

  });

});



app.listen(8080, function () {
  console.log('Server listening on 8080!');
});


app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
