const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const register = async (req, res) => {
    const { username, password, email } = req.body;
    // Validation
    if (!username || !password || !email) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new User({
        username,
        password: hashedPassword,
        email,
    });

    user.save().then (user => {
        return res.status(200).json({ message: 'Registered successfully' });
    })
    .catch(err => {
        return res.status(400).json({ message: 'Registration failed' });
    });
};



const login = async (req, res) => {
    const { username, password } = req.body;
    // Validation
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    user = User.findOne({ username: username }, function (err, user) {
        if (err) { return res.status(400).json({ msg: 'Invalid credentials' }); }
        if (!user) { return res.status(400).json({ msg: 'Invalid credentials' }); }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    
        return res.status(200).json({
            message: 'Logged in successfully',
            token: "Bearer " + token
        });

    });
};

module.exports = {
    register,
    login,
};