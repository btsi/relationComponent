let express = require('express')
let bodyParse = require('body-parser')
let db = require('../database/index')
let cors = require('cors')


let app = express()
let port = process.env.port || 3003

const instance = process.env.AXIOS_LOCATION || 'http://ec2-3-86-240-133.compute-1.amazonaws.com'

app.use(bodyParse.json())
app.use(express.static(__dirname + '/../client/dist'))
app.use(cors())

//USE PORT 3003!!!

app.post('/photos', (req, res) => {
  //console.log('inside of server POST with: ', req.body) //works!!
  let data = req.body
  db.insert(data, (err, results) => {
    if (err) console.log('error inserting to DB')
    else {
      res.status(201)
      res.send('successful insert to DB')
    }
  })
})

app.get(`${instance}/photos/:catagory`, (req, res) => {
  //console.log('did it get in here?', req.params.catagory) // works!
  let payload = req.params.catagory
  db.retrieve(payload, (err, data) => {
    if (err) console.log('ERROR coming back from db.retrieve()')
    else {
      let payload = data
      res.send(payload)
    }
  })
})

app.get(`${instance}/index`, (req, res) => {
  db.getAll((err, collection) => {
    if (err) console.log('ERROR coming back from db.getAll()')
    else {
      let payload = collection
      res.send(payload)
    }
  })
})

app.listen(port, () => console.log('listening to port: ', port))