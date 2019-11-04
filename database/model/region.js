const mongoose = require('mongoose')

var Schema = mongoose.Schema

var RegionSchema = new Schema({
    regionKor : String,
    regionEng : String,
    countryCode : String,
    regionCode : String,
    safety : String,
})

module.exports = mongoose.model('region', RegionSchema, colletion='region')