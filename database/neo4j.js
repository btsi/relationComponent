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
        `MATCH(a:Adventure)-[:BELONGS_TO]->(:Category {type: "${category}"}) RETURN a`
      )
      .then(result => {
        let data = [];
        result.records.forEach(record => {
          data.push(record._fields[0].properties);
        });
        cb(null, data);
      })
      .catch(err => cb(err));
  }
};

module.exports.session = session;
