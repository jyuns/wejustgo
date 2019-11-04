var Review = require('../database/model/review.js')
var College = require('../database/model/college.js')
var ObjectId = require('mongodb').ObjectID

module.exports = {

    addReview : async (reviewText, reviewRate, reviewYear, writer, writeTime, collegeId) => {
        const result = await Review.create({
            reviewText : reviewText,
            reviewYear : reviewYear,

            reviewRate0 : reviewRate[0].review0,
            reviewRate1 : reviewRate[1].review1,
            reviewRate2 : reviewRate[2].review2,
            reviewRate3 : reviewRate[3].review3,
            reviewRate4 : reviewRate[4].review4,
            reviewRate5 : reviewRate[5].review5,
            reviewRate6 : reviewRate[6].review6,
            reviewRate7 : reviewRate[7].review7,
            reviewRate8 : reviewRate[8].review8,
            reviewRate9 : reviewRate[9].review9,

            writer : writer,
            writeTime : writeTime,

            collegeId : collegeId
        })

        if(result) return true
    },

    fetchReview : async (collegeId) => {

        return await Review.find({
            collegeId : collegeId
        })
    },

    reviewBatchTask : async () => {

        //* Get Review Review rate and count Num
        const rate = await Review.aggregate(
              [{$group : {
                _id: "$collegeId",
                
                reviewRate0: {
                  $sum: "$reviewRate0.value"
                },
                reviewRate1: {
                  $sum: "$reviewRate1.value"
                },
                reviewRate2: {
                  $sum: "$reviewRate2.value"
                },
                reviewRate3: {
                  $sum: "$reviewRate3.value"
                },
                reviewRate4: {
                  $sum: "$reviewRate4.value"
                },
                reviewRate5: {
                  $sum: "$reviewRate5.value"
                },
                reviewRate6: {
                  $sum: "$reviewRate6.value"
                },
                reviewRate7: {
                  $sum: "$reviewRate7.value"
                },
                reviewRate8: {
                  $sum: "$reviewRate8.value"
                },
                reviewRate9: {
                  $sum: "$reviewRate9.value"
                },
                reviewRateAll : {
                  $sum :{
                    $sum :
                    ["$reviewRate0.value",
                    "$reviewRate1.value",
                    "$reviewRate2.value",
                    "$reviewRate3.value",
                    "$reviewRate4.value",
                    "$reviewRate5.value",
                    "$reviewRate6.value",
                    "$reviewRate7.value",
                    "$reviewRate8.value",
                    "$reviewRate9.value",]
                  }
                },
                count: {
                    $sum: 1}
              }}])

              //* update college Data
              for( i in rate) {
                await College.findOneAndUpdate({
                    _id : ObjectId(rate[i]._id)
                },
                {
                    'review.reviewCount' : rate[i].count,
                    'review.reviewRateAll' : (rate[i].reviewRateAll)/(rate[i].count*10),
                    'review.reviewRate0' : (rate[i].reviewRate0)/(rate[i].count),
                    'review.reviewRate1' : (rate[i].reviewRate1)/(rate[i].count),
                    'review.reviewRate2' : (rate[i].reviewRate2)/(rate[i].count),
                    'review.reviewRate3' : (rate[i].reviewRate3)/(rate[i].count),
                    'review.reviewRate4' : (rate[i].reviewRate4)/(rate[i].count),
                    'review.reviewRate5' : (rate[i].reviewRate5)/(rate[i].count),
                    'review.reviewRate6' : (rate[i].reviewRate6)/(rate[i].count),
                    'review.reviewRate7' : (rate[i].reviewRate7)/(rate[i].count),
                    'review.reviewRate8' : (rate[i].reviewRate8)/(rate[i].count),
                    'review.reviewRate9' : (rate[i].reviewRate9)/(rate[i].count),
                })
              }}
}