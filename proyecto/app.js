var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const Busboy = require('busboy');
var indexRouter = require('./routes/index');
const fs = require('fs');
const imagesDir = path.join(__dirname, 'public/files/images');
const bannerDir = path.join(__dirname, 'public/files/images/banner');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('port', process.env.PORT || 8082);
app.set('host', process.env.HOST || '0.0.0.0');

app.use('/', indexRouter);

app.post('/upload', function (req, res) {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    var saveTo = path.join(imagesDir, filename);
    console.log('Uploading: ' + saveTo);
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', function () {
    console.log('Upload complete');
    res.writeHead(200, { 'Connection': 'close' });
    res.end("That's all folks!");
  });
  return req.pipe(busboy);
});

app.post('/banner', function (req, res) {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    var saveTo = path.join(bannerDir, filename);
    console.log('Uploading: ' + saveTo);
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', function () {
    console.log('Upload complete');
    res.writeHead(200, { 'Connection': 'close' });
    res.end("That's all folks!");
  });
  return req.pipe(busboy);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/:anything', express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(app.get('port'), app.get('host'), () => {
  console.log('Server on port ' + app.get('port') + " on host " + app.get('host'));
})
