var express = require('express');
var router = express.Router();

var Response = require('../models/Response');

// Show specific response page
router.get('/:id', function(req, res) {
  Response.findOne({'_id': req.params.id})
          .populate('assignment')
          .exec(function(err, response) {
            if (err) res.status(500).render('error', {error: err});
            
            res.render('response/show', { response: response});
          });
})

// Show specific response page
router.get('/:id/breakdown/:master_key', function(req, res) {
  Response.findOne({'_id': req.params.id})
          .populate('assignment')
          .exec(function(err, response) {
            if (err) res.status(500).render('error', {error: err});
            
            if (req.params.master_key === response.assignment.master_key) {
              res.render('response/breakdown', { response: response});
            } else {
              res.redirect('/assignment/' + response.assignment._id);
            }
          });
})

module.exports = router;
