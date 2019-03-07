exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE categories(
    cat_id SERIAL PRIMARY KEY,
    type TEXT,
    cat_image TEXT
  )`;

  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = "DROP TABLE categories";
  return knex.raw(dropQuery);
};
