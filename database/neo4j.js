const neo4j = require("neo4j-driver").v1;

const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "practice")
);
const session = driver.session();

module.exports = {
  get: (category, cb) => {
    session
      .run(
        `MATCH(a:Adventure)-[:BELONGS_TO]->(c:Category {type: "${category}"}) RETURN a, c`
      )
      .then(result => {
        let data = { adv: [], cat: [] };
        result.records.forEach(record => {
          data.adv.push(record._fields[0].properties);
          data.cat.push(record._fields[1].properties);
        });
        cb(null, data);
      })
      .catch(err => cb(err));
  }
};

module.exports.session = session;
