const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    status: {
        type: String,
        required: true,
        default: 'Not Completed'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    userId: {
        type: String,
        required: true
    }
});

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;