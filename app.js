var express = require('express');
var multer = require('multer');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var signup = require('./routes/signup');
var signin = require('./routes/signin');
var friends = require('./routes/friends');
var chats = require('./routes/chats');
var uploads = require('./routes/uploads');

//set storage engine
/*var storage = multer.diskStorage({
	destination = './public/uploads/',
	filename:function(req,file,cb){
		cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
	}
});

//init uploads/
var upload = multer({
	storage:storage
}).single('myImage');*/

var app = express();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//mongoose.connect('mongodb://localhost/kavens_chat', { promiseLibrary: require('bluebird') }).then(() =>  console.log('connection succesful')).catch((err) => console.error(err));
//mongoose.connect('mongodb://323d4fad6df2752326e5a4c70cd43e76:Bala@143@6a.mongo.evennode.com:27017/323d4fad6df2752326e5a4c70cd43e76', { useMongoClient: true, promiseLibrary: require('bluebird') }).then(() =>  console.log('connection succesful')).catch((err) => console.error(err));
//mongoose.connect('mongodb://admin:QSNeyf24275@mongodb9175-env-0280780.mj.milesweb.cloud/kavens').then(() =>  console.log('connection succesful')).catch((err) => console.error(err));
mongoose.connect('mongodb://kavens:Kavens@143@mongodb/kavensdb').then(() =>  console.log('connection succesful')).catch((err) => console.error(err));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
//app.use('/signup', express.static(path.join(__dirname, 'dist')));
//app.use('/', express.static('app', {index:signin}));



app.use('/uploads', uploads);
app.use('/signup', signup);
app.use('/signin', signin);
app.use('/friends', friends);
app.use('/chats', chats);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});*/

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