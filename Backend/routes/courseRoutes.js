const express = require('express');
const router = express.Router();
const Course = require('../models/courseModel');

/**
 * @swagger
 * /api/course:
 *   get:
 *     summary: Get all available courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of all courses
 */
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
