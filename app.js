const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const cors = require('cors')
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')
const morgan = require('morgan')

dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/v1/tasks', taskRoutes)
app.use('/api/v1/users', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server running on port ${PORT}`)
})
