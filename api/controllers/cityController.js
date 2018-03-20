'use strict';


var mongoose = require('mongoose'),
  City = mongoose.model('city');

exports.list_all_cities = function(req, res) {
  City.find({}, function(err, city) {
    if (err)
      res.send(err);
    res.json(city);
  });
};




exports.create_a_city = function(req, res) {
  var new_city = new City(req.body);
  new_city.save(function(err, city) {
    if (err)
      res.send(err);
    res.json(city);
  });
};
 