var mongoose = require('mongoose')

var CONNECTION_URL = 'mongodb://xdstudio:dbstjd12@cluster0-shard-00-00-xo6lt.mongodb.net:27017,cluster0-shard-00-01-xo6lt.mongodb.net:27017,cluster0-shard-00-02-xo6lt.mongodb.net:27017/wejustgo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority' 
// ! useFindAndModify: true 수정가능하도록 수정
mongoose.connect(CONNECTION_URL, { dbName:'wejustgo', useUnifiedTopology: true, useNewUrlParser : true, useFindAndModify: false})

var db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
  console.log('Connected to mongod server')
})
