exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE categories(
    id INTEGER PRIMARY KEY,
    type TEXT,
    image TEXT
  )`;

  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = "DROP TABLE categories";
  return knex.raw(dropQuery);
};
