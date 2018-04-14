'use strict';


var mongoose = require('mongoose'),
  //Carport = mongoose.model('carport'),
  cp = require('../models/carportModel'),
  u = require('../models/userModel'),
  Carport = mongoose.model('carport', cp.schema),
  //com = require('../models/communityModel'),
  User = require('../models/userModel',u.schema),
  //Community = mongoose.model('community', com.schema),
  LeisurePark = mongoose.model('leisurePark');
 
  
exports.list_all_leisureParks = function (req, res) {
  LeisurePark.find({}, function (err, leisurePark) {
    if (err)
      res.send(err);
    res.json(leisurePark);
  });
};

exports.list_leisureParks_for_Owner = function (req, res) { 
  LeisurePark.find({ shared_UserID : req.params.ownerId}, null, {sort: { timestamp: -1 }}, function (err, leisurePark) {
    if (err)
      res.send(err);
    res.json(leisurePark);
  }).populate([{path:'carport_ID', model : Carport }]);
  //.sort({ timestamp : 1}) 
  //}).populate('carport_ID');
};

exports.list_leisureParks_for_Applier = function (req, res) { 
  LeisurePark.find({ applied_UserID : req.params.applierId}, null, {sort: { timestamp: -1 }}, function (err, leisurePark) {
    if (err)
      res.send(err);
    res.json(leisurePark);
  }).populate([{path:'carport_ID', model : Carport }]);
  //.sort({ timestamp : 1}) 
  //}).populate('carport_ID');
};

exports.list_leisureParks_by_Community = function (req, res) { 
  LeisurePark.find({ community_ID : req.params.comId, status : 'active', 
        shared_UserID: { "$ne": req.params.ownerId }, startTime : {"$lte": Date.now() } , endTime: {"$gte": Date.now() }
      }, null, {sort: { timestamp: -1 }}, function (err, leisurePark) {
    if (err)
      res.send(err);
    res.json(leisurePark);
  }).populate([{path:'carport_ID', model : Carport }]).populate([{path:'shared_UserID', model : User }]); 
};



exports.groupCountbyCommunity = function (req, res) {
  var rules = [{ 'priceUnit': 'day' }]; //, {price: {$gte: 200}}
  LeisurePark.aggregate([
    {
      $match: { $and: rules }
    },
    {
      $group: {
        _id: '$community_ID',  //$region is the column name in collection
        count: { $sum: 1 }
      }
    },
    {
      "$lookup": {
        "from": "communities",
        "localField": "_id",
        "foreignField": "_id",
        "as": "community_info"
      }
    }
  ], function (err, result) {
    if (err) {
      next(err);
    } else {
      res.json(result);
    }
  });//.populate([{path:'_id', model : Community }]);
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

  var chunk = '', data;
  req.on('data', function (data) {
    chunk += data; // here you get your raw data.
  })
  req.on('end', function () {

    data = JSON.parse(chunk);
    LeisurePark.findOneAndUpdate({ _id: req.params.leisureParkId }, data, { new: true }, function (err, leisurePark) {
      if (err)
        res.send(err);
      res.json(leisurePark);
    });
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
