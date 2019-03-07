var config = require("../knexfile.js");
var env = "development";
var knex = require("knex")(config[env]);

module.exports = {
  get: (category, cb) => {
    // const query = `SELECT * FROM adventures INNER JOIN categories
    //                 ON adventures.cat_id = categories.cat_id AND categories.type = '${category}'
    //                 LIMIT 25;`;

    const query = `SELECT * FROM adventures INNER JOIN categories
                    ON adventures.cat_id = categories.cat_id AND adventures.cat_id = ${category}
                    LIMIT 25`;

    knex
      .raw(query)
      .then(result => {
        cb(null, result.rows);
      })
      .catch(err => cb(err));
  }
};
