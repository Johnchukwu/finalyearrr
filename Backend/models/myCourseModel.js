const mongoose = require('mongoose');

const myCourseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  recommendedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MyCourse', myCourseSchema);
