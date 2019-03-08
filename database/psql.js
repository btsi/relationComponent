var config = require("../knexfile.js");
var env = "development";
var knex = require("knex")(config[env]);

module.exports = {
  get: (category, cb) => {
    // const query = `SELECT * FROM adventures INNER JOIN categories
    //                 ON adventures.cat_id = categories.cat_id AND categories.type = '${category}'
    //                 LIMIT 25;`;

    const advQuery = `SELECT * FROM adventures WHERE cat_id = ${category} LIMIT 30`;
    const catQuery = `SELECT * FROM categories WHERE cat_id = ${category}`;

    knex
      .raw(advQuery)
      .then(adventures => {
        knex.raw(catQuery).then(category => {
          const data = { adventures, category };
          cb(null, data);
        });
      })
      .catch(err => cb(err));
  }
};
