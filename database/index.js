let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gutsy-database');

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

let Repo = mongoose.model('Repo', repoSchema);

let retrieve = () => {
  console.log('inside retrieve function in DB')
}

module.exports = {
  retrieve: retrieve
}