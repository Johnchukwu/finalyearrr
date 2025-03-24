const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Add a new course
router.post('/', async (req, res) => {
    const { courseId, courseName, description, instructor, duration } = req.body;

    const course = new Course({
        courseId,
        courseName,
        description,
        instructor,
        duration
    });

    try {
        await course.save();
        res.status(201).json({ message: 'Course added successfully', course });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a course
router.delete('/:courseId', async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ courseId: req.params.courseId });
        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Edit a course
router.put('/:courseId', async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { courseId: req.params.courseId },
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );

        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.json({ message: 'Course updated successfully', course });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
