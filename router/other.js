const { fetchSkyscanner, fetchWeather } = require('../api/other.js')

const { Router } = require('express')

const axios =require('axios')

const router = Router()

router.post('/skyscanner', async (req, res) => {

    var countryCode = req.body.param.countryCode
    
    const skyscannerResult = await fetchSkyscanner(axios, countryCode)

    return res.json(skyscannerResult.data)
})

router.post('/weather', async (req, res) => {

    var lat = req.body.param.lat
    var lon = req.body.param.lon
    
    const weatherResult = await fetchWeather(axios, lat, lon)

    return res.send(weatherResult.data)
})

module.exports = router