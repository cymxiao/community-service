'use strict';
module.exports = function(app) {
  var carport = require('../controllers/carportController');

 
  app.route('/carport')
    .get(carport.list_all_carports)
    .post(carport.create_a_carport);


  app.route('/updatecarports/:comId/:ownerId')
    .post(carport.update_carports_for_owner);

  app.route('/carport/:carportId')
    .get(carport.read_a_carport)
    .post(carport.update_a_carport)
    .delete(carport.delete_a_carport);

  app.route('/searchcarport/:ownerId')
    .get(carport.find_carport_list);
};
