/* Express Setup */
var express = require('express');
var path = require('path');
require('dotenv').config()

var app = express();

app.set('port', (process.env.PORT || 3001));

/* View Engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Static file serving */
app.use(express.static(path.join(__dirname, 'public')));

/* Basic Routes (TEMP) */
app.get('/', function(req, res) {
  res.render('index');
});

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
