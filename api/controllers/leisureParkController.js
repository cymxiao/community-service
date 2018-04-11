'use strict';


var mongoose = require('mongoose'),
  LeisurePark = mongoose.model('leisurePark');

exports.list_all_leisureParks = function (req, res) {
  LeisurePark.find({}, function (err, leisurePark) {
    if (err)
      res.send(err);
    res.json(leisurePark);
  });
};


exports.read_a_leisurePark = function (req, res) {
  LeisurePark.findById(req.params.taskId, function (err, leisurePark) {
    if (err)
      res.send(err);
    res.json(leisurePark);
  });
};

exports.create_a_leisurePark = function (req, res) {

  var chunk = '', data;
  req.on('data', function (data) {
    chunk += data; // here you get your raw data.
  })
  req.on('end', function () {

    data = JSON.parse(chunk);
    var new_leisurePark = new LeisurePark(data);
    new_leisurePark.save(function (err, leisurePark) {
      if (err)
        res.send(err);
      res.json(leisurePark);
    });
  });
}


exports.update_a_leisurePark = function (req, res) {
  LeisurePark.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, leisurePark) {
    if (err)
      res.send(err);
    res.json(leisurePark);
  });
};


exports.delete_a_leisurePark = function (req, res) {
  LeisurePark.remove({
    _id: req.params.taskId
  }, function (err, leisurePark) {
    if (err)
      res.send(err);
    res.json({ message: 'leisurePark successfully deleted' });
  });
};
