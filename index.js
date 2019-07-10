require('dotenv').config()

const express = require('express')
const connectToDB = require('./config/db')
const app = express()

connectToDB(process.env.MONGO_URI)

app.use(express.json())

const { PORT } = process.env.PORT || 3000

app.listen(PORT, () => `Server on port ${ PORT }.`)
