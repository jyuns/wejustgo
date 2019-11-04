const mongoose = require('mongoose')

var Schema = mongoose.Schema

var BlogSchema = new Schema({
    blogUrl : String,
    blogTitle : String,
    blogImage : String,
    blogDescription : String,
})

var YoutubeSchema = new Schema({
    youtubeUrl : String,
    youtubeTitle : String,
    youtubeImage : String,
    youtubeDescription : String,
})

var CountrySchema = new Schema({
    countryCode : String,
    climate : String,
    policeTel : String,
    continent : String,

    url : {
        interUrl : String,
        collegeUrl : String,
    },

    social : {
        blog : [BlogSchema],
        youtube : [YoutubeSchema],
    },

    embassy : {
        location : String,
        tel : String,
        email : String,
    }
})

module.exports = mongoose.model('country', CountrySchema, colletion='country')