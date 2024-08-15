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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const user = new User({ fullName, email, password: hashedPassword, otp });
    await user.save();
    
    const mail = {
      to: email,
      subject: "Verification OTP!!",
      message: `Hi ${fullName} <br><br><br> Your OTP is: ${otp}`,
    };

    await sendMail( mail);
    console.log(user);
    res.status(201).json({ message: 'User registered, please verify your email', user_id: user, user_id: user._id });

   

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error);
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
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
