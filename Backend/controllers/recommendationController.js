const fs = require('fs');
const path = require('path');

const courses = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/courses.json'))
);

exports.getRecommendations = (req, res) => {
  const { skillLevel, goal, interest, timeCommitment, learningFormat } = req.body;

  const filtered = courses.filter(course => {
    const matchLevel = course.level.toLowerCase() === skillLevel.toLowerCase();
    const matchGoal = course.goal.includes(goal);
    const matchInterest = course.interest.includes(interest);
    const matchFormat = course.format.includes(learningFormat);

    return matchLevel && matchGoal && matchInterest && matchFormat;
  });

  if (filtered.length === 0) {
    return res.status(404).json({ message: 'No matching courses found.' });
  }

  res.status(200).json(filtered.slice(0, 5));
};
