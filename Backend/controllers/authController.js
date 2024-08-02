// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const transporter = require('../config/mailer');
const generateOTP = require('../utils/generateOTP');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const user = new User({ firstName, lastName, email, password: hashedPassword, otp });
    await user.save();

    // Send OTP via email
    await transporter.sendMail({
      to: email,
      subject: 'OTP for Email Verification',
      text: `Your OTP code is ${otp}`,
    });

    res.status(201).json({ message: 'User registered, please verify your email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP or email' });
    }

    user.isVerified = true;
    user.otp = undefined; // Clear OTP after verification
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
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
    res.status(500).json({ message: 'Server error' });
  }
};
