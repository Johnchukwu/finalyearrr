const Course = require('../models/courseModel');
const MyCourse = require('../models/myCourseModel');
const Program = require('../models/programModel'); // not programModel (typo)

const recommendCourses = async (req, res) => {
  try {
    const { skillLevel, goal, interest, learningFormat } = req.body;
    const userId = req.user._id;

    const matches = await Course.find({
      level: { $regex: new RegExp(skillLevel, 'i') },
      goal,
      interest,
      format: learningFormat
    }).limit(5);

    await MyCourse.deleteMany({ userId });

    const recommendations = matches.map(course => ({
      userId,
      course: course._id
    }));

    await MyCourse.insertMany(recommendations);

    res.status(200).json({ message: 'Recommendations saved.', data: matches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error recommending courses.' });
  }
};

const startCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    const exists = await Program.findOne({ userId, course: courseId });
    if (exists) return res.status(400).json({ message: 'Course already started' });

    const newProgram = await Program.create({
      userId,
      course: courseId
    });

    res.status(201).json({ message: 'Course started', data: newProgram });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not start course' });
  }
};

module.exports = {
  recommendCourses,
  startCourse
};
