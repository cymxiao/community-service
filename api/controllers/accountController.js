'use strict';


var mongoose = require('mongoose'),
 
  Account = mongoose.model('accounts');


exports.create_a_account = function(req, res) {

    var chunk = '', accountData;
    req.on('data', function (data) {
      chunk += data; // here you get your raw data.
    })
    req.on('end', function () { 
     
      accountData = JSON.parse(chunk); 
      var new_account = new Account(accountData);
      new_account.save(function(err, acnt) {
        if (err)
          res.send(err);
        res.json(acnt);
      });
    });
  };

  exports.find_a_account_by_userId = function(req, res) {
    //console.log(req);
    Account.findOne(req.params.userId, function(err, acnt) {
      if (err)
        res.send(err);
      res.json(acnt);
    });
  };
  

exports.update_a_account = function (req, res) {

    var chunk = '', data;
    req.on('data', function (data) {
      chunk += data; // here you get your raw data.
    })
    req.on('end', function () {
  
      data = JSON.parse(chunk);
      //Account.findOneAndUpdate({ user_ID: req.params.userId },   data , { new: true }, function (err, acnt) {
      Account.findOneAndUpdate({ user_ID: req.params.userId }, {'$inc': data }, { new: true }, function (err, acnt) {
        if (err)
          res.send(err);
        res.json(acnt);
      });
    });
  };