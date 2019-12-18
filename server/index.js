const express = require('express')
const consola = require('consola')
const cors = require('cors')
const session = require('express-session')
const firebaseStore = require('connect-session-firebase')(session)
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const schedule = require('node-schedule')

app.use(cors())
app.use(bodyParser.json())

const sessionApp = require('../plugins/firebase-admin.js')

app.use(bodyParser.json())
app.use(session({
  store : new firebaseStore({
    database : sessionApp.database()
      }),
  secret : 'super-secret-key',
  resave : false,
  saveUninitialized : true,
}))

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// Connect to Mongoose
const db = require('../database/mongoose.js')

// Import Router
const user = require('../router/user.js')
app.use('/user', user)

const other = require('../router/other.js')
app.use('/other', other)

const search = require('../router/search.js')
app.use('/search', search)

const chat = require('../router/chat.js')
app.use('/chat', chat)

const review = require('../router/review.js')
app.use('/review', review)

const {reviewBatchTask} = require('../api/review.js')

//* 매 정각마다 리뷰를 종합하도록 정의
schedule.scheduleJob('0 0 0 * * *', () => {
  reviewBatchTask()  
})

const {fetchCollegeData} = require('../api/search.js')

//* firebase 인기 채팅 리스트를 종합하도록 정의
const firebase = require('../plugins/firebase.js')

firebase.database().ref('chatRooms').on('value', (data) => {
    if(!data.val()) return 
    
    fetchCollegeData(Object.keys(data.val())[0]).then( (e) => {
    firebase.database().ref('currentChat').push({
      chatRoomId : Object.keys(data.val())[0],
      chatRoomKor : e.collegeKor,
      chatRoomEng : e.collegeEng,
      lastMsg : Object.values(data.val()[Object.keys(data.val())[0]]["chatMsg"])[Object.values(data.val()[Object.keys(data.val())[0]]["chatMsg"]).length - 1].msg
    })
  })

})


async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()