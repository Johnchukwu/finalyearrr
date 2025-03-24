const Course = require('../models/courseModel');

exports.getRecommendations = async (req, res) => {
  try {
    const { skillLevel, goal, interest, timeCommitment, learningFormat } = req.body;

    const courses = await Course.find({
      level: { $regex: new RegExp(skillLevel, 'i') },
      goal: goal,
      interest: interest,
      format: learningFormat
    }).limit(5);

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No matching courses found.' });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
