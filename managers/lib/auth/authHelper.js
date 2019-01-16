const crypto = require('crypto');

const hashData = data => {
  const hash = crypto.createHmac('sha512', 'testcryptosuperhash');
  hash.update(data);
  return hash.digest('hex');
};

module.exports = {
  hashData
};
