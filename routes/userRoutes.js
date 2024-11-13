const express = require('express')
const { registerUser, authUser } = require('../controllers/userController')

userRoutes = express.Router()

// Routes
userRoutes.post('/register', registerUser)
userRoutes.post('/login', authUser)

module.exports = userRoutes
