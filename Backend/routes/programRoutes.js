const express = require('express');
const router = express.Router();
const Program = require('../models/programModel');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: User's started courses
 */

/**
 * @swagger
 * /api/programs:
 *   get:
 *     summary: Get all active programs for the logged-in user
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's active programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   course:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                   progress:
 *                     type: number
 *                     example: 0
 *                   completed:
 *                     type: boolean
 *                     example: false
 */
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const programs = await Program.find({ userId }).populate('course');
    res.status(200).json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
