'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});



var UserSchema = new Schema({
  username: {
    type: String,
    required: 'Kindly enter the username'
  },
  password: {
    type: String,
    required: 'Kindly enter the password'
  },
  status: {
    type: [{
      type: String,
      enum: ['active', 'blocked', 'deleted']
    }],
    default: ['active']
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);