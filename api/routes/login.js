const controller = require('../controllers/login');

module.exports = (router) => {
  router.route('/login').get(controller.getLogin);
  router.route('/login').post(controller.login);
};
