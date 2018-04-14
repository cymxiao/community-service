'use strict';
module.exports = function(app) {
  var leisurePark = require('../controllers/leisureParkController');
 
  app.route('/leisurePark')
    .get(leisurePark.list_all_leisureParks)
    .post(leisurePark.create_a_leisurePark);


  app.route('/leisurePark/:leisureParkId')
    .get(leisurePark.read_a_leisurePark)
    .post(leisurePark.update_a_leisurePark)
    .delete(leisurePark.delete_a_leisurePark);

  app.route('/getleisurePark/:ownerId')
    .get(leisurePark.list_leisureParks_for_Owner);
  
  app.route('/getleisureParkbyCom/:comId/:ownerId')
    .get(leisurePark.list_leisureParks_by_Community);

  app.route('/groupleisurePark')
    .get(leisurePark.groupCountbyCommunity)
};
