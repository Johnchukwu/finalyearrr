const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  niche: String,
  time_to_finish: String,
  number_of_students: String,
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  lessons: Number,
  price: String,
  image: String,
  goal: [String],
  interest: [String],
  format: [String]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
