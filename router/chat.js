const { sendMessage } = require('../api/chat.js')

const { Router } = require('express')

const firebase = require('../plugins/firebase.js')

const router = Router()

router.post('/send', async (req, res) => {
    var chatCurrentRoom = req.body.param.chatCurrentRoom
    console.log(chatCurrentRoom + 'send router')
    var msg = req.body.param.msg
    var timeStamp = req.body.param.timeStamp
    var from = req.body.param.from

    const sendMessageResult = await sendMessage(firebase, chatCurrentRoom, msg, timeStamp, from) ? true : false

    return res.send(sendMessageResult)
    
}),

module.exports = router