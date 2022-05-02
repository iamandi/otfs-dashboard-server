'use strict';
const auth = require('../middleware/auth');
const { User, validate } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

// GET LOGGED IN USER'S INFO
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    delete user.password;

    res.send(user);
});

// SIGN UP ROUTE
router.post('/', async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const _id = User.length() + 1;
    User.add({
        _id,
        name,
        email,
        password: hashedPassword
    })

    const token = User.generateAuthToken({ _id, isAdmin: false });
    res.header('x-auth-token', token).send({ _id, name, email });
});

module.exports = router;