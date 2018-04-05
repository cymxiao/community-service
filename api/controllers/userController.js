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

  console.log(req.is('text/*'));

  var new_user;
  if (req.body && req.body.data) {
    //if (req.body) {
    console.dir(req.body);
    var body = JSON.parse(req.body);

    new_user = new User(body);
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
      console.log(chunk);
      userdata = JSON.parse(chunk);
      //console.log(userdata);
      new_user = new User(userdata);
      new_user.save(function (err, task) {
        if (err)
          res.send(err);
        res.json(task);
      });
    })
  }
};


exports.login_a_user = function (req, res) {
  User.findOne({ username: req.query.username, password: req.query.password }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
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
