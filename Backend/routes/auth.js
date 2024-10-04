import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Note the .js extension

const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  
  try {
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid email or password');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router; // Use export instead of module.exports
