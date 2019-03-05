exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE adventures(
    id INTEGER PRIMARY KEY,
    title TEXT,
    image TEXT,
    description TEXT,
    price INTEGER,
    cat_id INTEGER REFERENCES categories(id)
  )`;

  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = "DROP TABLE adventures";
  return knex.raw(dropQuery);
};
