const express = require('express');
const router = express.Router();

const { recommendCourses, startCourse } = require('../controllers/recommendationController');

router.post('/recommend', recommendCourses);
router.post('/start-course', startCourse);

module.exports = router;
