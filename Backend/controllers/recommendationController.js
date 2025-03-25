const Recommendations = require('../models/courseModel');
const MyCourse = require('../models/myCourseModel');
const Program = require('../models/programModel'); // not programModel (typo)

const recommendCourses = async (req, res) => {
  try {
    const { skillLevel, goal, interest, learningFormat } = req.body;
    const userId = req.user.user.id;
console.log(req.user.user)
    const matches = await Recommendations.find({
        level: { $regex: new RegExp(skillLevel.trim(), 'i') },
        goal: { $in: [goal.trim()] },
        interest: { $in: [interest.trim()] },
        format: { $in: [learningFormat.trim()] }
      }).limit(5);

    await MyCourse.deleteMany({ userId });

    const recommendations = matches.map(course => ({
      userId,
      title: course.title,
      author: course.author,
      niche: course.niche,
      time_to_finish: course.time_to_finish,
      number_of_students: course.number_of_students,
      level: course.level,
      lessons: course.lessons,
      price: course.price,
      image: course.image,
      goal: course.goal,
      interest: course.interest,
      format: course.format    
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
    const userId = req.user.user.id;

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
