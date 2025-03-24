const express = require('express');
const router = express.Router();

const { recommendCourses, startCourse } = require('../controllers/recommendationController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Personalized course recommendations
 */

/**
 * @swagger
 * /api/recommend/recommend:
 *   post:
 *     summary: Recommend courses based on user survey answers
 *     tags: [Recommendations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - skillLevel
 *               - goal
 *               - interest
 *               - learningFormat
 *             properties:
 *               skillLevel:
 *                 type: string
 *                 example: Beginner
 *               goal:
 *                 type: string
 *                 example: Build websites
 *               interest:
 *                 type: string
 *                 example: Web Development
 *               learningFormat:
 *                 type: string
 *                 example: Video Lessons
 *     responses:
 *       200:
 *         description: List of recommended courses
 *       500:
 *         description: Internal server error
 */
router.post('/recommend', auth, recommendCourses);

/**
 * @swagger
 * /api/recommend/start-course:
 *   post:
 *     summary: Track when a user starts a course
 *     tags: [Recommendations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: 605c5d9e8a42d93294dd3e4c
 *     responses:
 *       201:
 *         description: Course started
 *       400:
 *         description: Course already started
 *       500:
 *         description: Could not start course
 */
router.post('/start-course',auth, startCourse);

module.exports = router;
