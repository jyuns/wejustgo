const { fetchAutoCompleteColleges, fetchCollege, fetchCollegeData, fetchYoutubeData, fetchRegionData } = require('../api/search.js')

const { Router } = require('express')

const router = Router()

router.post('/chats', async (req, res) => {

    var value = req.body.param.value
    const result = await fetchAutoCompleteColleges(value)

    return res.send(result)
})

router.post('/colleges', async(req, res) => {
    var type = req.body.param.type
    var keyword = req.body.param.keyword
    
    const result = await fetchCollege(type, keyword)
    
    return res.send(result)

})

router.post('/college_data', async(req, res) => {
    var id = req.body.param.id

    const result = await fetchCollegeData(id)

    return res.send(result)
})

router.post('/youtube_data', async(req, res) => {
    var code = req.body.param.code

    const result = await fetchYoutubeData(code)
    
    return res.send(result)
})

router.post('/region_data', async(req, res) => {
    var code = req.body.param.code

    const result = await fetchRegionData(code)
    
    return res.send(result)
})

module.exports = router