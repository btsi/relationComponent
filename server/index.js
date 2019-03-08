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

app.get("/adventures/:category", (req, res) => {
  let category = req.params.category;
  db.get(category, (err, response) => {
    const data = {
      adventures: response.adventures.rows,
      category: response.category.rows[0]
    };
    if (err) console.log(err);
    res.json(data);
  });
});

app.get("/test", (req, res) => {
  let random = Math.floor(Math.random() * 374 + 1);

  db.get(random, (err, response) => {
    const data = {
      adventures: response.adventures.rows,
      category: response.category.rows[0]
    };
    if (err) console.log(err);
    res.json(data);
  });
});

//USE PORT 3003!!!

app.listen(port, () => console.log("listening to port: ", port));

module.exports = app;
