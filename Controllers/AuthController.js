const User = require('../Models/User');

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

const register = async (req, res) => {
    const { username, password, email } = req.body;
    // Validation
    if (!username || !password || !email) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    let user = new User({
        username,
        password,
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
    return res.status(200).json({ message: 'Logged in successfully' }); // This is just a placeholder for now
};

module.exports = {
    register,
    login,
};