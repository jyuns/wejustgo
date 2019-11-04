var ObjectId = require('mongodb').ObjectID
var College = require('../database/model/college.js')
var Country = require('../database/model/country.js')
var Region = require('../database/model/region.js')

module.exports = {
 
    fetchAutoCompleteColleges : async (value) => {
        return await College.find({
            $or : [
                {collegeKor : {$regex : value}},
                {collegeEng : {$regex : value}}]
        }).limit(5)
    },

    fetchCollege : async(type, keyword) => {

        if (type == '전체') {
            return await College.find({
                $or : [
                    {collegeKor : {$regex : keyword}},
                    {collegeEng : {$regex : keyword}},
                    {"address.countryKor"  : {$regex : keyword}},
                    {"address.countryEng"  : {$regex : keyword}},
                    {"address.continentKor"  : {$regex : keyword}},
                    {"address.continentEng"  : {$regex : keyword}},
                ]
            })

        } else if (type == '대륙') {
            return await College.find({
                $or : [
                    {"address.continentKor"  : {$regex : keyword}},
                    {"address.continentEng"  : {$regex : keyword}},
                ]
            })
        } else if (type == '국가') {
            return await College.find({
                $or : [
                    {"address.countryKor"  : {$regex : keyword}},
                    {"address.countryEng"  : {$regex : keyword}},
                ]
            })
        } else {
            return await College.find({
                $or : [
                    {collegeKor : {$regex : keyword}},
                    {collegeEng : {$regex : keyword}},
                ]
            })
        }
    },

    fetchCollegeData : async(id) => {    
        return College.findOne({"_id" : ObjectId(id)})
    },

    fetchYoutubeData : async(code) => {
        return Country.findOne({"countryCode" : code})
    },

    fetchRegionData : async(code) => {
        return Region.findOne({"regionCode" : code})
    },
}