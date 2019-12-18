const { addReview, fetchReview } = require('../api/review.js')

const { Router } = require('express')

const router = Router()

router.post('/add', async (req, res) => {
    var reviewText = req.body.param.reviewText
    var reviewRate = req.body.param.reviewRate

    var reviewYear = req.body.param.reviewYear

    var writer = req.body.param.writer
    var writeTime = req.body.param.writeTime

    var collegeId = req.body.param.collegeId

    const submitReviewResult = await addReview(reviewText, reviewRate, reviewYear, writer, writeTime, collegeId)

    res.json(submitReviewResult)
})

router.post('/fetch', async(req, res) => {
    var collegeId = req.body.param.collegeId

    const fetchReviewResult = await fetchReview(collegeId)

    return res.send(fetchReviewResult)
})

module.exports = router