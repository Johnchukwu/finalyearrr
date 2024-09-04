// routes/auth.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController'); // Ensure this path is correct

const router = express.Router();
router.post(
  '/register',
  [
    check('fullName', 'Full name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.register // Ensure this function is defined in authController
);
  

router.post(
  '/verify-email',
  [
    check('uid', 'UID is required').notEmpty(), // Validate UID
    check('otp', 'OTP is required').notEmpty(), // Validate OTP
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.verifyEmail // Ensure this function is defined in authController
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.login // Ensure this function is defined in authController
);

module.exports = router;
