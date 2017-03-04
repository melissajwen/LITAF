var mongoose = require('mongoose');

var PromptSchema = new mongoose.Schema({
  question: String,
  answer: String,
  master_key: String
});

// Define a pre-save method for categorySchema
PromptSchema.pre('save', function(next) {
  // Assign a random master key to the Prompt
  var self = this;
  self.master_key = Math.random().toString(36).slice(2);
  next();
});

module.exports = mongoose.model('Prompt', PromptSchema);