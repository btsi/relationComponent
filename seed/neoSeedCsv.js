const db = require("../database/neo4j");
const session = db.session;
const { join } = require("path");

const empty = (() => {
  const query = "MATCH (n) DETACH DELETE n";
  session
    .run(query)
    .then(() => {
      console.log("db emptied");
    })
    .catch(err => console.log(err));
})();

const fill = (() => {
  const path = join(__dirname, "/seed.csv");
  const query = `LOAD CSV WITH HEADERS FROM 'file:///${path}' AS row
  MERGE (a:Adventure {id:row.id}) ON CREATE SET a.title = row.title,
                a.image = row.image,
                a.description = row.description,
                a.price = row.price

  MERGE (c:Category {type: row.category}) ON CREATE SET c.image = row.cat_img
  MERGE (a)-[:BELONGS_TO]->(c)`;
  session
    .run(query)
    .then(stuff => {
      console.log("No errors boss");
    })
    .catch(err => console.log(err));
})();
// const path = join(__dirname, "/seed.csv");

// console.log(path);

// const path = join(__dirname, "/seed.csv");

// session
//   .run(`LOAD CSV WITH HEADERS FROM 'file:///${path}' AS row RETURN count(*);`)
//   .then(() => console.log("did this"))
//   .catch();
