const express = require('express')
const router = express.Router()
const Url = require('../models/url')

// GET /:code
router.get('/:code', async (req, res) => {

  try {
    // find the code
    const foundUrl = await Url.findOne({ urlCode: req.params.code })
  
    // respond 404 if url is not found
    if (!foundUrl) res.status(404).json('URL Not Found')

    // redirect to link
    return res.redirect(foundUrl.longUrl)

  } catch (error) {

    // log error
    console.log(error)

    // respond 500 if error
    return res.status(500).json(error.message)
  }
})

module.exports = router