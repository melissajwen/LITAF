var mongoose = require('mongoose');

var AssignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [{
    text: String,
    ideal_answer: String,
    key_words: [String]
  }],
  master_key: String
});

AssignmentSchema.pre('save', function(next) {
  // Assign a random master key to the Prompt
  var self = this;
  self.master_key = Math.random().toString(36).slice(2);
  next();
});

module.exports = mongoose.model('Assignment', AssignmentSchema);