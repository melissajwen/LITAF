var mongoose = require('mongoose');

var ResponseSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  },
  name: String,
  student_id: String,
  email: String,
  answers: [String]
});

module.exports = mongoose.model('Response', ResponseSchema);