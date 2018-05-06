'use strict';


var mongoose = require('mongoose'),
  City = mongoose.model('city');

exports.list_all_cities = function (req, res) {
  City.find({}, function (err, city) {
    if (err)
      res.send(err);
    res.json(city);
  });
};

exports.create_a_city = function (req, res) {

  var chunk = '', cityData;
  req.on('data', function (data) {
    chunk += data; // here you get your raw data.
  })
  req.on('end', function () {
    console.log(chunk);
    cityData = JSON.parse(chunk);
    //console.log(userdata);
    var new_city = new City(cityData);
    new_city.save(function (err, city) {
      if (err)
        res.send(err);
      res.json(city);
    });
  })
};
