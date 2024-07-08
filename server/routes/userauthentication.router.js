const express = require('express');
const cors = require('cors');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const router = express.Router();

// Use CORS with proper origin
router.use(cors({
    origin: ["http://localhost:3000"], // Adjusted to match typical local development setup
    methods: ["GET", "POST"],
    credentials: true
}));

// Parse JSON bodies
router.use(express.json());

// Session management
router.use(session({
    secret: 'srikar-token',
    resave: false,
    saveUninitialized: true
}));

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 12);
        await userModel.create({ name, email, password: hash })
            .then(user => res.json({ success: true }))
            .catch(err => res.json(err))
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // General error message
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'No record exists' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'The password is incorrect' });
        }
        const token = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: '1h' }); // Optional: Add expiry
        return res.status(200).json({ status: 'Success', token, user });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // General error message
    }
});

// Get user details route (Example, though typically not for a login endpoint)
router.get('/user', async (req, res) => {
    const { email } = req.query; // Assuming the use of query parameters for GET requests
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'No record exists' });
        }
    } catch (err) {
        console.error('Fetch user error:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // General error message
    }
});

module.exports = router;
