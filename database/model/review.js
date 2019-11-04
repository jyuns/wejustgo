const mongoose = require('mongoose')

var Schema = mongoose.Schema

var ReviewSchema = new Schema({
    writer : String,
    writeTime : String,

    reviewYear : String,
    reviewText : String,
    
    reviewRate0 : Object,
    reviewRate1 : Object,
    reviewRate2 : Object,
    reviewRate3 : Object,
    reviewRate4 : Object,
    reviewRate5 : Object,
    reviewRate6 : Object,
    reviewRate7 : Object,
    reviewRate8 : Object,
    reviewRate9 : Object,

    collegeId : String,
})

module.exports = mongoose.model('review', ReviewSchema, colletion='review')