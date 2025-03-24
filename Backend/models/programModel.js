const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number, // percentage 0–100
    default: 0
  }
});

module.exports = mongoose.model('Program', programSchema);
