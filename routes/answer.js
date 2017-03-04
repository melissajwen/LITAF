var express = require('express');
var router = express.Router();

var Prompt = require('../models/Prompt');
var Answer = require('../models/Answer');

/* View the new answer object*/
router.get('/:id', function(req, res) {
  Answer.findOne({'_id': req.params.id})
        .populate('prompt')
        .exec(function(err, answer) {
          if (err) {
            // If there is an error (weird database connection, DB goes down?) .. we deal with it

            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // Render the error page with status code of 500
            res.status(err.status || 500);
            res.render('../views/error');
          } else {
            if (answer) {
              // If we find the answer, display it
              res.render('../views/answer/show', {
                prompt: answer.prompt,
                name: answer.name,
                answer: answer.answer,
              });
            } else {
              // If we don't find one, issue a 404 error
              res.status(404);
              res.render('../views/answer/error', { message: 'Could not find answer!'});
            }
          }
        });
});

/* Create a new answer object tied to a prompt and save to database */
router.post('/:prompt_id/new', function(req, res) {
  Answer.create({
    name: req.body.name,
    prompt: req.params.prompt_id,
    answer: req.body.answer
  }, function(err, answer) {
    if (err) {
      // Set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // Render the error page with status code of 500
      res.status(err.status || 500);
      res.render('../views/error');
    } else {
      res.redirect('/answer/' + answer._id);
    }
  });
});

module.exports = router;
