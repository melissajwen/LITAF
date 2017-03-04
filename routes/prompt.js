var express = require('express');
var router = express.Router();

var Answer = require('../models/Answer');
var Prompt = require('../models/Prompt');

/* Display form for creating a new prompt */
router.get('/', function(req, res) {
  res.render('../views/prompt/create');
});

/* Create a new prompt object and save to database */
router.post('/new', function(req, res) {
  Prompt.create({
    question: req.body.question,
    answer: req.body.answer
  }, function(err, prompt) {
    if (err) {
      // Set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // Render the error page with status code of 500
      res.status(err.status || 500);
      res.render('../views/error');
    } else {
      res.redirect('/prompt/' + prompt._id + '/' + prompt.master_key);
    }
  });
});

/* Show a specific prompt (for students) */
router.get('/:id', function(req, res) {
  // Grab the prompt provided by the ID
  Prompt.findOne({'_id': req.params.id}, function(err, prompt) {
    if (err) {
      // If there is an error (weird database connection, DB goes down?) .. we deal with it

      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // Render the error page with status code of 500
      res.status(err.status || 500);
      res.render('../views/error');
    } else {
      if (prompt) {
        // If we find a prompt, show the default view to users
        res.render('../views/prompt/show', {
          id: prompt._id,
          question: prompt.question,
          answer: prompt.answer
        });
      } else {
        // If we don't find a prompt, issue a 404 error
        res.status(404);
        res.render('../views/prompt/error', { message: 'Could not find prompt!'});
      }
    }
  });
});

/* Show the master of the prompt (for the teacher) */
router.get('/:id/:master', function(req, res) {
  Prompt.findOne({'_id': req.params.id}, function(err, prompt) {
    if (err) {
      // Set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // Render the error page with status code of 500
      res.status(err.status || 500);
      res.render('../views/error');
    } else {
      // Only show master page if the provided master key is equal to the one stored in the database
      if (prompt.master_key === req.params.master) {
        // Get currently submitted student answers
        Answer.find({'prompt': req.params.id}, function(err, answers) {
          if (err) {
            // Set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // Render the error page with status code of 500
            res.status(err.status || 500);
            res.render('../views/error');
          } else {
            res.render('../views/prompt/master', {
              id: prompt._id,
              question: prompt.question,
              answer: prompt.answer,
              student_answers: answers
            });
          }
        })
      } else {
        // If the master key provided isn't the one in the database, let them know they're not authorized
        res.status(401);
        res.render('../views/prompt/error', { message: 'Invalid master key!'});
      }
    }
  });
});

module.exports = router;
