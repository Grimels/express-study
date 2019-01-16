const { getConnection } = require('../db');
const bookshelf = getConnection();

const Users = bookshelf.Model.extend({
  tableName: 'users'
});

const findUserByEmail = email => Users.forge('email', email).fetch();
const findUserById = id => Users.forge('id', id).fetch();
const addUser = userData => Users.forge(userData).save();

module.exports = {
  Users,
  findUserByEmail,
  findUserById,
  addUser
};
