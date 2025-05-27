const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    console.log("Register input:", req.body);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("Email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const accessToken = uuidv4();

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      accessToken,
    });

    console.log("User created:", newUser);
    res.status(201).json({ message: "User registered", user: newUser, accessToken });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // ✅ Create JWT token
    const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);

    res.json({ accessToken, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
