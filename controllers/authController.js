const authService = require('../services/userservices');


exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const message = await authService.generateAndSendVerificationCode(email); 
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error sending verification code' }); 
  }
};

exports.verifyCode = (req, res) => {
  const { email, code } = req.body;

  const result = authService.verifyCode(email, code);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ error: result.message });
  }
};

exports.register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const message = await authService.registerUser(email, password, username);
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("📌 Login attempt for:", email); // ✅ Log email being used
    
    const response = await authService.loginUser(email, password);

    if (!response.token) {
      console.log("❌ Login failed: No token or user found"); // ✅ Debugging
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    console.log("✅ Login successful:", response.user); // ✅ Log user details

    res.status(200).json({
      token: response.token,
      id: response.user._id, // ✅ Ensure user ID is included
      username: response.user.username,
      email: response.user.email,
    });

  } catch (error) {
    console.error("🔥 Error logging in:", error);
    res.status(401).send({ message: 'Invalid credentials' });
  }
};
