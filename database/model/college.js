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

var CollegeSchema = new Schema({
    info : String,
    collegeKor : String,
    collegeEng : String,

    url : {
        interUrl : String,
        collegeUrl : String,
    },

    address : {
        location : String,
        continentKor : String,
        continentEng : String,
        countryKor : String,
        countryEng : String,
        countryCode : String,
        regionKor : String,
        regionEng : String,
        regionCode : String,
    },

    social : {
        blog : [BlogSchema],
        youtube : [YoutubeSchema],
    },

    applyAvailable : {
        applyCollege : Array,
        applyCollegeSearchUrl : Array,
    },

    review : {
        reviewCount : Number,
        reviewRateAll : Number,
        reviewRate0 : Number,
        reviewRate1 : Number,
        reviewRate2 : Number,
        reviewRate3 : Number,
        reviewRate4 : Number,
        reviewRate5 : Number,
        reviewRate6 : Number,
        reviewRate7 : Number,
        reviewRate8 : Number,
        reviewRate9 : Number,
    }
})

module.exports = mongoose.model('colleges', CollegeSchema, colletion='colleges')