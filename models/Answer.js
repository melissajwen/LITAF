var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  prompt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt'
  },
  name: String,
  answer: String,
  est_grade: Number
});

module.exports = mongoose.model('Answer', AnswerSchema);