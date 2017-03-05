var express = require('express');
var router = express.Router();

var Assignment = require('../models/Assignment');
var Response = require('../models/Response');

/* URL for creating a new assignment */
router.get('/', function(req, res) {
  res.render('assignment/create');
});

/* Create assignment and returns JSON object w/ URL to master assignment page */
router.post('/create', function(req, res) {
  Assignment.create({
    title: req.body.title,
    description: req.body.description,
    questions: req.body.questions
  }, function(err, assignment) {
    if (err) res.status(500).render('error', {error: err});

    res.json({
      message: 'Assignment created succesfully',
      master_path: '/assignment/' + assignment._id + '/master/' + assignment.master_key
    });
  });
});

// Show specific assignment
router.get('/:id', function(req, res) {
  Assignment.findOne({'_id': req.params.id}, function(err, assignment) {
    if (err) res.status(500).render('error', {error: err});

    res.render('assignment/show', { assignment: assignment });
  });
})

// Show specific assignment's master page if there's a valid master key
router.get('/:id/master/:master_key', function(req, res) {
  Assignment.findOne({'_id': req.params.id}, function(err, assignment) {
    if (err) res.status(500).render('error', {error: err});
    
    if (assignment.master_key === req.params.master_key) {
      res.render('assignment/master', { assignment: assignment });
    } else {
      res.redirect('/assignment/' + assignment._id); // Redirect to standard assignment page
    }
  });
})

// Add response to assignment
router.post('/:id/new', function(req, res) {
  Assignment.findOne({'_id': req.params.id}, function(err, assignment) {
    if (assignment) {
      Response.create({
        assignment: assignment,
        name: req.body.name,
        student_id: req.body.student_id,
        email: req.body.email,
        answers: req.body.answers
      }, function(err, response) {
        if (err) res.status(500).render('error', {error: err});

        res.json({
          message: 'Response created succesfully',
          answer_path: '/response/' + response._id
        });
      });
    }
  });
})


module.exports = router;
