const express = require('express')
const passport = require('passport');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const cors = require('cors')
// const rateLimit = require("express-rate-limit");


const CONFIG = require('./config/config')
require("./authentication/passport.auth") // Signup and login authentication middleware
const errorHandler = require("./middleware/errorHandler")
const unknownEndpoint = require('./middleware/unknownEndpoint');
const authRouter = require('./routes/auth.route');

// const { requestLogger } = require('./utils/logger')
// const rateLimiter = require('./middleware/rateLimiter')

const app = express()

// connect to db
require('./middleware/db')(CONFIG.MONGODB_URI)


//secuirty middleware
app.use(helmet())


// Apply the rate limiting middleware to all requests
// app.use(limiter)

// allow requests from all origins
app.use(cors())

// parse information from request
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




// set info response
app.get('/api', (req, res) => {
  res.json({
    status: 'status',
    message: 'Visit the following link for access to the Repository:',
    link: 'https://bitbucket.org/bcodestech1/informify/src/master/'
  })
})

// Test Protected Route
app.get('/api/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
      status: 'status',
      message: 'Authenticated Route',
    })
  })

//Middleware for routes
app.use('/api/auth', authRouter);
// app.use('/test', testRoute);
// app.use('/test', passport.authenticate('jwt', { session: false }), testRoute);


// use middleware for unknown endpoints
app.use(unknownEndpoint);

// use error handler middleware
app.use(errorHandler);


module.exports = app