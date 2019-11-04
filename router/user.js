const { Router } = require('express')

const router = Router()

// firebase admin 불러오기
const firebase = require( '../plugins/firebase.js')
const auth = firebase.auth()

const { firebaseLogin, firebaseRegister, firebaseDuplicate } = require('../api/user.js')

router.post('/login', async (req, res) => {

    var email = req.body.param.email
    var password = req.body.param.password
    
    var loginResult = await firebaseLogin(auth, email, password)
    
    if(!loginResult) {
        var currentUser = auth.currentUser

        var user = {
            uid : currentUser.uid,
            name : currentUser.displayName,
            email : currentUser.email,
        }

        req.session.auth = {
            // * 사용자 정보 session에 저장하기
            user
        }

        req.session.save()

        return res.json(user)
    } else {
        return res.send(loginResult)
    }
})

router.post('/logout', async (req, res) => {
    req.session.destroy()
    return res.json(true)
})

router.post('/register', async (req, res) => {
    var email = req.body.param.email
    var password = req.body.param.password

    var registerResult = await firebaseRegister(auth, email, password)
})

router.post('/duplicate', async (req, res) => {
    var email = req.body.param.email
    var duplicateResult = await firebaseDuplicate(auth, email) 
    
    return res.send(duplicateResult)
})

module.exports = router