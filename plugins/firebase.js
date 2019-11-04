const firebase = require('firebase')

if(!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAXZ9S61eZfmfkHZRvmgxVk-hqiJSGUKQM",
    authDomain: "wejugo-23ad2-4ecb1.firebaseio.com",
    databaseURL: "https://wejugo-23ad2-4ecb1.firebaseio.com/",
    projectId: "wejugo-23ad2",
    storageBucket: "",
    messagingSenderId: "1069902654155",
    appId: "1:1069902654155:web:77abb2eb7e9f5e6e48894e"
  })
}

module.exports = firebase