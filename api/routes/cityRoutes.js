'use strict';
module.exports = function(app) {
  var city = require('../controllers/cityController');
 
  app.route('/city')
    .get(city.list_all_cities)
    .post(city.create_a_city);

 
};
