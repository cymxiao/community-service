'use strict';


var mongoose = require('mongoose'),
 
  xjMember = mongoose.model('xjMembers');

exports.list_all_xjMembers = function (req, res) {
    xjMember.find({},null, {sort: { timestamp: -1 }} , function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_xjMember = function (req, res) {
 
  var new_user;
  if (req.body && req.body.data) {
    //if (req.body) {
    console.dir(req.body);
    var body = JSON.parse(req.body);

    new_user = new xjMember(body);
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
      // console.log('else path'); //just show in console
      // console.log(chunk);
      userdata = JSON.parse(chunk);


      xjMember.findOne({ name: userdata.name, cellPhone: userdata.cellPhone }, function (err, task) {
        if (err)
          res.send(err);
        //check if username already exist
        if (!task) {
          //console.log(userdata);
          new_user = new xjMember(userdata);
          new_user.save(function (err, task) {
            if (err)
              res.send(err);
            res.json(task);
          });//.populate([{ path: 'community_ID', model: Community }]);
        } else {
          res.json({ _id:task._id ,duplicateUsername: true });
        }
      });
    })
  }
};

 
exports.update_a_xjMember = function (req, res) {
  //console.log(req.body);
  var chunk = '', userdata;
  req.on('data', function (data) {
    chunk += data; // here you get your raw data.
  })
  req.on('end', function () {

    userdata = JSON.parse(chunk);

    xjMember.findOneAndUpdate({ _id: req.params.xjMemberId }, userdata, { new: true }, function (err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  })
};


exports.delete_a_xjMember = function (req, res) { 
   xjMember.remove({
    _id: req.params.xjMemberId
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
