const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    description: { type: String },
    instructor: { type: String, required: true },
    duration: { type: Number }, // e.g., duration in hours
    coverImage: { type: String }, // URL or path to the cover image
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
