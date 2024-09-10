const User = require('../models/User'); // Import the User model

// Controller to get user details
exports.getUserDetails = async (req, res) => {
  try {
    // Fetch the user details using the user ID from the token (decoded in the auth middleware)
    const user = await User.findById(req.user.id).select('-password -otp'); // Exclude password and OTP fields

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user details as a response
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
};

// Controller to update user details (optional)
exports.updateUserDetails = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // The ID comes from the token
      { fullName, email },
      { new: true, runValidators: true } // Return the updated user and validate input
    ).select('-password -otp');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Controller to delete user details
exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete user from the database
      await User.findByIdAndDelete(req.user.id);
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };