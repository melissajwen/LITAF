var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'LitAF'}); // TODO: Update this when we figure out a cool name
});

module.exports = router;
