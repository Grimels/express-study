const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://malyarenko:72386@localhost:5432/malyarenko',
  searchPath: ['knex', 'public']
});

const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('pagination');

let db = false;

const getConnection = () => {
  if (!db) {
    db = bookshelf;
  }
  return db;
};

module.exports = {
  getConnection
};
