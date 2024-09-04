// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateOTP = require('../utils/generateOTP');
const generateToken = require('../utils/generateToken');
const sendMail = require("../utils/sendmail")

//register function

exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Assuming bcrypt is used for hashing

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      otp: generateOTP(), // Replace with your OTP generation logic
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered, please verify your email',
      user_id: newUser.uid, // Return the UID
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.verifyEmail = async (req, res) => {
  const { uid, otp } = req.body;

  console.log(`Received UID: ${uid}`);
  console.log(`Received OTP: ${otp}`);

  try {
    const user = await User.findOne({ uid });
    console.log('User found:', user);

    if (!user) {
      console.log('No user found with the provided UID');
      return res.status(400).json({ message: 'Invalid UID' });
    }

    if (user.otp !== otp) {
      console.log(`Stored OTP: ${user.otp}`);
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.otp = undefined; // Clear OTP after verification
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error in verifyEmail:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
