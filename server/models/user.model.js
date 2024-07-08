const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true, // Convert email to lowercase
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: [String]
    }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;