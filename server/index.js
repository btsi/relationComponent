let express = require('express')
let bodyParse = require('body-parser')
let db = require('../database/index')


let app = express()
let port = process.env.port || 3003


app.use(bodyParse.json())
app.use(express.static(__dirname + '/../client/dist'))

//USE PORT 3003!!!

app.get('/', (req, res) => {
  db.retrieve()
  //res.send('incoming transmission')
})

app.listen(port, () => console.log('listening to port: ', port))