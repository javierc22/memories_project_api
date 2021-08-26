import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'

// Config
dotenv.config()
const app = express()
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ limit: '30mb', extended: true}))
app.use(cors())
// Routes
app.use('/posts', postRoutes)
app.get('/', (req, res) => {
  res.send('Hello to memories API')
})

// Mongoose connection
const { CONNECTION_URL, PORT } = process.env

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
