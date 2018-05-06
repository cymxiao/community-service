'use strict';


var mongoose = require('mongoose'),
  Country = mongoose.model('country');

exports.list_all_countries = function (req, res) {
  Country.find({}, function (err, country) {
    if (err)
      res.send(err);
    res.json(country);
  });
};




exports.create_a_country = function (req, res) {

  var chunk = '', countryData;
  req.on('data', function (data) {
    chunk += data; // here you get your raw data.
  })
  req.on('end', function () {

    countryData = JSON.parse(chunk);
    //console.log(userdata);
    var new_country = new Country(countryData);
    new_country.save(function (err, country) {
      if (err)
        res.send(err);
      res.json(country);
    });
  })
};


// exports.read_a_task = function(req, res) {
//   Task.findById(req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_a_task = function(req, res) {


//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
//};
