const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')
require('dotenv').config()

const PORT = process.env.PORT


// Create the Express Server
const app = express();

// Mongo Database
dbConnection()

//CORS
app.use(cors())

//Public Directory
app.use(express.static('public'))

// Reading and parse body
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//TODO: CRUD






// Listen petitions
app.listen(PORT, () => {

  console.log(`Serverlistening in port ${PORT}`);
})