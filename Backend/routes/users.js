const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import the auth middleware
const User = require('../models/User'); // Import the User model

// GET user details (protected route)
router.get('/me', auth, async (req, res) => {
  try {
    // Fetch the user details by ID stored in the decoded token
    const user = await User.findById(req.user.id).select('-password -otp'); // Exclude password and OTP from the response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user details
    res.json({
      fullName: user.fullName,
      email: user.email,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE user details (protected route)
router.put('/me', auth, async (req, res) => {
  try {
    const { fullName, email } = req.body;

    // Update user details using findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, email },
      { new: true, runValidators: true } // Return the updated document and validate input
    ).select('-password -otp'); // Exclude password and OTP from the response

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with updated user details
    res.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE user (protected route)
router.delete('/me', auth, async (req, res) => {
  try {
    // Find and delete the user
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with a success message
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
