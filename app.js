/* Express Setup */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// If we're NOT in production, load in environment variables (like the database URI) from the .env file
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config() // For use in development to load in configuration variables (like the database URI)
}

/* MongoDB set up */
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
db = process.env.DB_URI;
mongoose.connect(db);

var app = express();

app.set('port', (process.env.PORT || 3001));

/* View Engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middleware setup */
app.use(express.static(path.join(__dirname, 'public'))); // Static file serving
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Import routes */
var index = require('./routes/index');
var assignment = require('./routes/assignment');
var response = require('./routes/response');

app.use('/', index);
app.use('/assignment', assignment);
app.use('/response', response);

/* Error Handler */
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* Start Express app on port specified by env variable or 3001 */
app.listen(app.get('port'), () => {
  console.log('Server started at http://localhost:' + app.get('port'));
});
