'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('users');

exports.list_all_users = function (req, res) {
  User.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_user = function (req, res) {
  // console.log('start creating a new user');
  // console.log(req.is('text/*'));
   console.log('create a user'  + req.reqData);
  var new_user;
  if (req.body.data) {
    new_user = new User(req.body);
    new_user.save(function (err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  } else if (req.reqData) {
    console.log('reqData');
    new_user = new User(req.reqData);
    new_user.save(function (err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  } else {
    var chunk = '', userdata;
    req.on('data', function (data) {
      chunk += data; // here you get your raw data.
    })
    req.on('end', function () {
      console.log('else path'); //just show in console
      userdata = JSON.parse(chunk);
      //var new_user = new User(req.body);
      //console.dir(userdata);
      //console.log(req.reqData);
      new_user = new User(userdata);
      new_user.save(function (err, task) {
        if (err)
          res.send(err);
        res.json(task);
      });
    })
  }
};


exports.read_a_user = function (req, res) {
  User.findById(req.params.username, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_user = function (req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_user = function (req, res) {


  User.remove({
    _id: req.params.userId
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
