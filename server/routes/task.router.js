const express = require('express');
const taskModel = require('../models/task.model');
const router = express.Router();

// POST endpoint to add a new task
router.post('/', async (req, res) => {
    const { taskName, desc, userId } = req.body;
    try {
        const task = await taskModel.create({ taskName, desc, status: 'Not Completed', date: new Date(), userId });
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Failed to create task' });
    }
});

// GET endpoint to fetch tasks for a particular user
router.get('/', async (req, res) => {
    const { userId } = req.query;
    try {
        const tasks = await taskModel.find({ userId });
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

// DELETE endpoint to delete a task by ID
router.delete('/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        const deletedTask = await taskModel.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Failed to delete task' });
    }
});

// PUT endpoint to update task status by ID
router.put('/:id', async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(taskId, { status }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Failed to update task' });
    }
});

module.exports = router;
