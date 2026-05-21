const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

// ========== REGISTER ==========
router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

//========= CHECK IF USER ALREADY EXISTS ========== 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

//========= HASH PASSWORD ==========
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

//========= CREATE NEW USER ==========
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    //========= SAVE USER TO DATABASE ==========
    console.log("Before save");

await newUser.save();

console.log("After save");

    res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ========== LOGIN ==========
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
       res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });

    }
});

module.exports = router;