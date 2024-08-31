const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Handle user registration
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: newUser, 
            token 
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Handle user login
exports.loginUser = async (req, res) => {
    console.log('Request body:', req.body);

    const { identifier, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({ 
            message: 'Login successful', 
            user, 
            token 
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
};
