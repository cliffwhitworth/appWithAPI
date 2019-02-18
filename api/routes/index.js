const login = require('./login');
const users = require('./users');

module.exports = (router) => {
  login(router),
  users(router)
  return router;
};
