var express = require('express');
var router = express.Router();

var Response = require('../models/Response');

// Show specific response page
router.get('/:id', function(req, res) {
  Response.findOne({'_id': req.params.id}, function(err, response) {
    if (err) res.status(500).render('error', {error: err});
    
    res.render('response/show', { response: response});
  });
})

module.exports = router;
