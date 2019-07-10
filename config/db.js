const mongoose = require('mongoose')

const connectToDB = async uri => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true })
    console.log('Connected to DB')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connectToDB
