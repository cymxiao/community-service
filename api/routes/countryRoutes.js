'use strict';
module.exports = function(app) {
  var country = require('../controllers/countryController');

  // todoList Routes
  app.route('/country')
    .get(country.list_all_countries)
    .post(country.create_a_country);


//   app.route('/country/:countryId')
//     .get(user.read_a_user)
//     .put(user.update_a_user)
//     .delete(user.delete_a_user);
};
