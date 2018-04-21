'use strict';


var mongoose = require('mongoose'),
  Carport = mongoose.model('carport');

exports.list_all_carports = function (req, res) {
  Carport.find({}, function (err, carport) {
    if (err)
      res.send(err);
    res.json(carport);
  });
};


exports.read_a_carport = function (req, res) {
  Carport.findById(req.params.carportId, function (err, carport) {
    if (err)
      res.send(err);
    res.json(carport);
  });
};

exports.find_carport_list = function (req, res) {
  //console.log(req.params.ownerId);
  Carport.find({ owner_user_ID: req.params.ownerId }, function (err, carport) {
    if (err)
      res.send(err);
    res.json(carport);
  });
};

// async await await
exports.create_a_carport = function (req, res) {
  var chunk = '', carportdata;
  req.on('data', function (data) {
    chunk += data; // here you get your raw data.
  })
  req.on('end', function () {

    carportdata = JSON.parse(chunk);
    Carport.findOne({ community_ID: carportdata.community_ID, parkingNumber: carportdata.parkingNumber }).then(isDupicate => {
      if (isDupicate && isDupicate._id) {
        res.json({ parkingNumber: '-1' });
      } else {
        Carport.find({ community_ID: carportdata.community_ID, owner_user_ID: carportdata.owner_user_ID }).then(cpOfOwner => { 
          if (cpOfOwner && cpOfOwner.length > 3) {
            res.json({ parkingNumber: '-3' });
          } else {
            var new_carport = new Carport(carportdata);
            new_carport.save(function (err, carport) {
              if (err)
                res.send(err);
              res.json(carport);
            });
          }
        })
      }
    });
  });
};

exports.update_a_carport = function (req, res) {
  var chunk = '', data;
  req.on('data', function (data) {
    chunk += data; // here you get your raw data.
  })
  req.on('end', function () {

    data = JSON.parse(chunk);
    Carport.findOneAndUpdate({ _id: req.params.carportId }, data, { new: true }, function (err, carport) {
      if (err)
        res.send(err);
      res.json(carport);
    });
  });
};


exports.delete_a_carport = function (req, res) {
  Carport.remove({
    _id: req.params.taskId
  }, function (err, carport) {
    if (err)
      res.send(err);
    res.json({ message: 'carport successfully deleted' });
  });
};
