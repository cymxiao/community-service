'use strict';
module.exports = function(app) {
  var community = require('../controllers/communityController');

  // todoList Routes
  app.route('/community')
    .get(community.list_all_communities)
    .post(community.create_a_community);

  app.route('/findcommunity')
    .get(community.find_communities)

  app.route('/community/:communityId')
    .get(community.read_a_community);
 
};
