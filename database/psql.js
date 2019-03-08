var config = require("../knexfile.js");
var env = "development";
var knex = require("knex")(config[env]);

module.exports = {
  get: (category, cb) => {
    const advQuery = `SELECT * FROM adventures WHERE cat_id = ${category}`;
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
