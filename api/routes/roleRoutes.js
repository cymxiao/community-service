'use strict';
module.exports = function(app) {
  var role = require('../controllers/rolecontroller');
 
  app.route('/role')
    .get(role.list_all_roles)
    .post(role.create_a_role); 
};
