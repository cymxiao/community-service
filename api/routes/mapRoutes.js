'use strict';
module.exports = function(app) {
  var map = require('../controllers/mapController');

  // todoList Routes
  app.route('/maps')
    .get(map.getMapData);
    
};
