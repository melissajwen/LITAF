var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  prompt: ObjectId,
  name: String,
  answer: String,
  est_grade: Number
});

module.exports = mongoose.model('Answer', AnswerSchema);