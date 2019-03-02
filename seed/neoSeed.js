const mockData = require("../mockData");
const categories = mockData.headers;
const adventures = mockData.events;

const db = require("../database/neo4j");
const session = db.session;

console.log(__dirname);
// (function emptyAndSeed() {
//   const query = "MATCH (n) DETACH DELETE n";
//   session
//     .run(query)
//     .then(() => {
//       console.log("db emptied");
//       adventures.forEach(adv => {
//         const advQuery = `MERGE (a:Adventure { title: "${adv.title}", image: "${
//           adv.image_URL
//         }", description: "${adv.description}", price: ${adv.price}, id: ${
//           adv.id
//         }, category: "${adv.category}"})
//                           MERGE (c:Category {type: "${adv.category}"})
//                           MERGE (a)-[:BELONGS_TO]->(c)`;
//         session.run(advQuery).catch(err => console.log(err));
//       });
//     })
//     .catch(() => {
//       console.log("error emptying db");
//     });
// })();
