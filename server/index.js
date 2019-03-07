require("newrelic");
let express = require("express");
let bodyParse = require("body-parser");
// let db = require('../database/index') // mongoDB
// const db = require("../database/neo4j"); // neo4j db
const db = require("../database/psql"); // psql db
let cors = require("cors");

let app = express();
let port = process.env.port || 3003;

app.use(bodyParse.json());
app.use(express.static(__dirname + "/../client/dist"));
app.use(cors());

app.get("/get/:category", (req, res) => {
  let category = req.params.category;
  db.get(category, (err, response) => {
    if (err) console.log(err);
    res.json(response);
  });
});

//USE PORT 3003!!!

app.listen(port, () => console.log("listening to port: ", port));
