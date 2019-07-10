require('dotenv').config()

const express = require('express')
const connectToDB = require('./config/db')
const app = express()

connectToDB(process.env.MONGO_URI)

app.use(express.json())

app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))

const { PORT } = process.env || 3000

app.listen(PORT, () => console.log(`Server on port ${ PORT }.`))
