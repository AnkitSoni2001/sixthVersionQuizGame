const connectToMongo = require('./db');
const express = require('express')
var authRouter = require('./routes/auth')
var quizRouter = require('./routes/quiz')
var cors = require('cors')
const app = express()
const port = 1000

app.use(cors())
app.use(express.json())//if we want to use req.body this middleware is required

// Available Routes
app.use('/api/auth', authRouter)
app.use('/api/quiz', quizRouter)

app.use('/api/auth', require('./routes/auth'))
app.use('/api/quiz', require('./routes/quiz'))

connectToMongo();

app.listen(port, () => {
  console.log(`quiz backend listening on port ${port}`)
})


