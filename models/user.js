const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
    //roles: [], operations: []
});

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema);
}

const userDb = [{
    _id: 1,
    name: 'Jack',
    email: 'jack@me.com',
    password: '$2b$10$Z0xTZaPb142ChAIsn9mF5uqCu7fByH2tCiKON0O632JtzHYqKbOxO' // Test@1234
},
{
    _id: 2,
    name: 'Adam',
    email: 'adam@me.com',
    password: '$2b$10$Z0xTZaPb142ChAIsn9mF5uqCu7fByH2tCiKON0O632JtzHYqKbOxO'
}
]

const User = {};

User.findOne = ({ email }) => {
    return userDb.find(element => element.email === email);
}

User.findById = (id) => {
    return userDb.find(element => element._id === id);
}

User.length = () => { return userDb.length; }

User.generateAuthToken = ({ _id, isAdmin }) => {
    const token = jwt.sign({ _id, isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

User.add = (user) => {
    const res = userDb.push(user);
    return (res && true);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;