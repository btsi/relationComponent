let express = require('express')
let bodyParse = require('body-parser')
let db = require('../database/index')

let app = express()
let port = process.env.port || 3003


app.use(bodyParse.json())
app.use(express.static(__dirname + '/../client/dist'))

//USE PORT 3003!!!

app.post('/photos', (req, res) => {
  //console.log('inside of server POST with: ', req.body) //works!!
  let data = req.body
  db.insert(data)
})

app.get('/photos/:catagory', (req, res) => {
  console.log('did it get in here?', req.params.catagory) // works!
  let payload = req.params.catagory
  db.retrieve(payload, (err, data) => {
    if (err) console.log('ERROR coming back from db.retrieve()')
    else {
      let payload = data
      res.send(payload)
    }
  })
})

app.listen(port, () => console.log('listening to port: ', port))