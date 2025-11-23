const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

connectDB();

const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))