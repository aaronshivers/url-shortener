const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const shortId = require('shortid')
const Url = require('../models/url')

// POST /api/url/shorten
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body
  const baseUrl = `http://localhost:${ process.env.PORT }`

  // respond 401 if url is invalid
  if (!validUrl.isUri(baseUrl)) return res.status(401).json('Invalid Base Url')

  // create url code
  const urlCode = shortId.generate()

  // check long url
  if (!validUrl.isUri(longUrl)) return 

  try {
    // check db for url
    const existingUrl = await Url.findOne({ longUrl })

    // if url already exists return url from db
    if (existingUrl) return res.json(existingUrl)

    // create shortUrl
    const shortUrl = baseUrl + '/' + urlCode

    // create newUrl object
    const newUrl = new Url({
      longUrl,
      shortUrl,
      urlCode,
      createdAt: new Date()
    })
    
    // save newUrl to DB
    await newUrl.save()

    // return newUrl
    return res.json(newUrl)

  } catch (error) {

    // log error
    console.log(error)

    // return error
    return res.status(500).json(error.message)
  }

})

module.exports = router