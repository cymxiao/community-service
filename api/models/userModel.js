'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 

var UserSchema = new Schema({
  username: {
    type: String,
    required: 'Kindly enter the username'
  },
  password: {
    type: String,
    required: 'Kindly enter the password'
  },
  community_ID: {
    type: String 
  },
  phoneNo: {
    type: String 
  },
  status: {
    type: [{
      type: String,
      enum: ['active', 'blocked', 'deleted']
    }],
    default: ['active']
  }
});

module.exports = mongoose.model('users', UserSchema);