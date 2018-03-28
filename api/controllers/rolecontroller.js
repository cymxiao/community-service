'use strict';


var mongoose = require('mongoose'),
  Role = mongoose.model('roles');

exports.list_all_roles = function(req, res) {
    Role.find({}, function(err, role) {
    if (err)
      res.send(err);
    res.json(role);
  });
};
 
exports.create_a_role = function(req, res) {
  var new_role = new City(req.body);
  new_role.save(function(err, role) {
    if (err)
      res.send(err);
    res.json(role);
  });
};
 