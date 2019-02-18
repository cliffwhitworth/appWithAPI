const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/users').post(controller.postUsers);
  
  // needs validation
  router.route('/users/validate').get(validateToken, controller.validate);
};
