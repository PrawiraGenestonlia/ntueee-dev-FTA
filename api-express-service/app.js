const express = require('express');
const app = express();
const createError = require('http-errors');
const listEndpoints = require('express-list-endpoints');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require("rotating-file-stream");
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');

require('dotenv').config();

//import routes
const { authRoute, getInfoRoute } = require('./routes/user');
const { postRoute } = require('./routes/post');
const { adminUserRoute } = require('./routes/admin');
const { mentorRoute } = require('./routes/mentor');
const { seniorBuddyRoute } = require('./routes/seniorbuddy');
const { profileRoute } = require('./routes/profile');
const { clubAdminRoute } = require('./routes/club');
const { eventRoute } = require('./routes/event');
const { uploadImageRoute } = require('./routes/upload');
const { chatRoute } = require('./routes/chat');

//connect to db
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log("Connected to MongoDB...");
}).catch(err => console.error("Could not connect to MongoDB...", err));

// create a write stream (in append mode)
// const logDirectory = path.join(__dirname, 'log');
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// const accessLogStream = rfs.createStream(process.env.DEV ? 'dev.log' : 'access.log', {
//   size: "10M", // rotate every 10 MegaBytes written
//   interval: "1M", // rotate daily
//   compress: "gzip", // compress rotated files
//   path: logDirectory
// });
morgan.token('remote-addr', function (req) {
  return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin-build')));
app.use('/main', express.static(path.join(__dirname, 'user-build')));
app.use(compression());
app.use(cors());
// app.use(morgan('short', { stream: accessLogStream }));

app.get('/main/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/user-build/index.html'));
});

app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/admin-build/index.html'));
});

app.get('/api/', async (req, res) => {
  //
  let response = {
    "server": "geeenesis-api running at " + req['headers']['host'],
    "status": "alive and healthy",
    "server time": new Date().toLocaleDateString,
    "available routes": {}
  }
  //
  response["available routes"] = listEndpoints(app);
  console.table(response["available routes"]); //print table
  res.send(response);
});

app.use('/api/user', authRoute);
app.use('/api/get-user', getInfoRoute);
app.use('/api/post', postRoute);
app.use('/api/admin-user', adminUserRoute);
app.use('/api/club-admin', clubAdminRoute);
app.use('/api/mentor', mentorRoute);
app.use('/api/senior-buddy', seniorBuddyRoute);
app.use('/api/profile', profileRoute);
app.use('/api/event', eventRoute);
app.use('/api/chat', chatRoute);
app.use('/api/upload-image', uploadImageRoute);
app.use('/api/uploads', express.static('uploads'));

app.use('/', (req, res) => res.redirect('/main'));

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

module.exports = app;
