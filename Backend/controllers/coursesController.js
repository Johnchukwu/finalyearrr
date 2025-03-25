const Course = require('../models/course');

// Add a new course
exports.addCourse = async (req, res) => {
    const { courseId, courseName, description, instructor, duration, coverImage } = req.body;

    try {
        // Create a new course instance
        const course = new Course({
            courseId,
            courseName,
            description,
            instructor,
            duration,
            coverImage
        });

        // Save the course to the database
        await course.save();
        res.status(201).json({ message: 'Course added successfully', course });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
        // Find and delete the course by courseId
        const course = await Course.findOneAndDelete({ courseId: req.params.courseId });
        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Edit a course
exports.editCourse = async (req, res) => {
    try {
        // Find and update the course by courseId
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
};
