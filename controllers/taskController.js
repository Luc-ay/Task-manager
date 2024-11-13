const Task = require('../models/Task')

// Create a task
const createTask = async (req, res) => {
  const { title, description, deadline, priority } = req.body

  try {
    const task = await Task.create({
      title,
      description,
      deadline,
      priority,
      user: req.user._id,
    })

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' })
  }
}

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' })
  }
}

// Update a task
const updateTask = async (req, res) => {
  const { title, description, deadline, priority } = req.body

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, deadline, priority },
      { new: true }
    )

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' })
  }
}

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' })
  }
}

module.exports = { createTask, getTasks, updateTask, deleteTask }
