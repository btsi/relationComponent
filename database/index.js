require('dotenv').config()
let mongoose = require('mongoose')
mongoose.connect(process.env.DB_URI);

let db = mongoose.connection
db.on('error', console.error.bind(console, "connection error"))
db.once('open', (callback) => {
  console.log('Connected to Database --- from database/index.js')
})

let repoSchema = mongoose.Schema({
  id: Number,
  title: String,
  catagory: String,
  image_URL: String,
  description: String,
  price: Number
})

let Adventures = mongoose.model('Adventures', repoSchema);

let insert = (data) => {
  Adventures.collection.insertMany(data, {
      ordered: true
    })
    .then(data => console.log('successfully posted to DB'))
    .catch(err => console.log('error in DB insert'))
}

let retrieve = (payload, callback) => {
  Adventures.find({
    catagory: payload
  }, (err, docs) => {
    if (err) console.log('error finding the data in db')
    else {
      callback(null, docs)
    }
  })
}

module.exports = {
  retrieve: retrieve,
  insert: insert
}