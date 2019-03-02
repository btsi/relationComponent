const db = require("../database/neo4j");
const session = db.session;
const { join } = require("path");

(async () => {
  const start = process.hrtime();
  const path = join(__dirname, "/seed.csv");

  const empty = "MATCH (n) DETACH DELETE n";

  const fill = `
                USING PERIODIC COMMIT 500
                LOAD CSV WITH HEADERS FROM 'file:///${path}' AS row
                CREATE (a:Adventure {title:row.title, description:row.description, price:row.price})
                MERGE (c:Category {type: row.category})  SET c.image = row.cat_img
                CREATE (a)-[:BELONGS_TO]->(c)`;

  const start1 = process.hrtime();
  await session.run(empty);
  const end1 = process.hrtime(start1);
  console.info("Empty time: %ds %dms", end1[0], end1[1] / 1000000);

  const start2 = process.hrtime();
  await session.run(fill);
  const end2 = process.hrtime(start2);
  console.info("Fill time: %ds %dms", end2[0], end2[1] / 1000000);

  const end = process.hrtime(start);
  console.info("Total time: %ds %dms", end[0], end[1] / 1000000);
  process.exit();
})();

// const advPath = join(__dirname, "/adventures.csv");
// const catPath = join(__dirname, "/categories.csv");

// const adv = `USING PERIODIC COMMIT 500
//                LOAD CSV WITH HEADERS FROM 'file:///${advPath}' AS row
//                CREATE (a:Adventure {id:row.id})
//                   SET a.title = row.title,
//                       a.image = row.image,
//                       a.description = row.description,
//                       a.price = row.price`;
// const cat = `USING PERIODIC COMMIT 500
//                LOAD CSV WITH HEADERS FROM 'file:///${catPath}' AS row
//                CREATE (c:Category {id:row.id})
//                   SET c.type = row.type,
//                       c.image = row.image`;

// const relate = `USING PERIODIC COMMIT 500
//                  LOAD CSV WITH HEADERS FROM 'file:///${advPath}' AS row
//                  MATCH (a:Adventure {id:row.id})
//                  MATCH (c:Category {type:row.category})
//                  CREATE (a)-[rel:BELONGS_TO]->(c)`;

// (async () => {
//   const start = process.hrtime();

//   await session.run("MATCH (n) DETACH DELETE n");
//   console.log("emptied");

//   await session.run(
//     "CREATE CONSTRAINT ON (c:Category) assert c.category IS UNIQUE;"
//   );
//   await session.run(
//     "CREATE CONSTRAINT ON (a:Adventure) assert a.id IS UNIQUE;"
//   );
//   console.log("constrained");
//   session.run(cat);
//   await session.run(adv);
//   console.log("loaded");
//   await session.run(relate);

//   const end = process.hrtime(start);
//   console.info("Execution time: %ds %dms", end[0], end[1] / 1000000);
//   process.exit();
// })();
