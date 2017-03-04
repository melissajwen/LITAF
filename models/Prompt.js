var mongoose = require('mongoose');

var PromptSchema = new mongoose.Schema({
  question: String,
  answer: String,
  master_key: String
});

module.exports = mongoose.model('Prompt', PromptSchema);