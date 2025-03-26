const jwt = require('jsonwebtoken');

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

    // ✅ Generate Access & Refresh Tokens
    const accessToken = jwt.sign(
      { id: response.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // 🔥 Short-lived access token (15 minutes)
    );

    const refreshToken = jwt.sign(
      { id: response.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // 🔥 Long-lived refresh token (7 days)
    );

    res.status(200).json({
      accessToken,
      refreshToken, // ✅ Send refresh token to frontend
      id: response.user._id, 
      username: response.user.username,
      email: response.user.email,
      image: response.user.image || "",
    });

  } catch (error) {
    console.error("🔥 Error logging in:", error);
    res.status(401).send({ message: 'Invalid credentials' });
  }
};
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log("📌 Login attempt for:", email); // ✅ Log email being used
    
//     const response = await authService.loginUser(email, password);

//     if (!response.token) {
//       console.log("❌ Login failed: No token or user found"); // ✅ Debugging
//       return res.status(401).send({ message: 'Invalid credentials' });
//     }
//     console.log("✅ Login successful:", response.user); // ✅ Log user details

//     res.status(200).json({
//       token: response.token,
//       id: response.user._id, // ✅ Ensure user ID is included
//       username: response.user.username,
//       email: response.user.email,
//     });

//   } catch (error) {
//     console.error("🔥 Error logging in:", error);
//     res.status(401).send({ message: 'Invalid credentials' });
//   }
// };


exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(403).json({ message: "Refresh token required" });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" } // 🔥 Renewed access token for 15 minutes
      );

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

