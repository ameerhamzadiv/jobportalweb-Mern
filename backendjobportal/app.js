require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const route = require('./routes/root')
const userRouter = require('./routes/userRoutes')
const socialRouter = require('./routes/socialRoutes')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOption = require('./config/corsOption')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000

// Generate log file
app.use(logger)

// Enable origin or api convert into public
app.use(cors(corsOption))

// All data will be convert into json
app.use(express.json())

app.use(cookieParser())

// When server load we call static files like css html files
app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/api', userRouter,socialRouter)


// Home page route
app.use('/', route)

// 404 page show if route does not created
app.use('*', route)

// Generate error file
app.use(errorHandler)

// Check db connection
mongoose.connect(process.env.DB_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`DB conected and Server is running at ${PORT}`);
    })
})
.catch((error) => {
    console.log(error)
})

