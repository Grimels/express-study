const {
  Users,
  findUserByEmail,
  findUserById,
  addUser
} = require('../models/users');
const { hashData } = require('./lib/auth/authHelper');

const registerUser = userData => {
  const hashPassword = hashData(userData.password);

  return addUser({ ...userData, password: hashPassword });
};

const tryToLogIn = ({ email, password }) =>
  findUserByEmail(email).then(user => {
    const hashPassword = hashData(password);

    return user.attributes.password === hashPassword
      ? user.attributes.id
      : null;
  });

const getUser = id =>
  findUserById(id).then(user => Promise.resolve(user.attributes));

module.exports = {
  registerUser,
  tryToLogIn,
  getUser
};
