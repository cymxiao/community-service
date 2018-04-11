'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');
  //var bodyParser = require('body-parser')
  // create application/json parser
  //var jsonParser = bodyParser.json();

  // todoList Routes
  app.route('/users')
    .get(user.list_all_users)
    .post(user.create_a_user);//, jsonParser);

  app.route('/userlogin')
    .get(user.login_a_user)


  app.route('/users/:userId')
    .get(user.read_a_user)
    //.put(user.update_a_user)
    .post(user.update_a_user)
    .delete(user.delete_a_user);
};
