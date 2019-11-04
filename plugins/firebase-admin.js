const firebaseAdmin = require('firebase-admin')
var serviceAccount = require("./wejustgoServicekey.json");

const sessionApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://wejugo-23ad2.firebaseio.com'
  }, 'sessionApp')


  module.exports = sessionApp