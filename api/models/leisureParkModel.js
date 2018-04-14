'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 

var leisureParkSchema = new Schema({
  startTime: {
    type: Date,
    required: 'Kindly enter the startTime'
  },
  endTime: {
    type: Date,
    required: 'Kindly enter the endTime'
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'active','applied', 'invalid']
    }],
    default: ['active']
  },
  carport_ID : {
    type: Schema.Types.ObjectId,
    ref: 'carports',
    required: 'Kindly enter the carport_ID'
  },
  applied_UserID : {
    type: Schema.Types.ObjectId,
    ref: 'users' 
  },
  shared_UserID : {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  //it's great to add community forein key here. It's used to make statistic of avaiable carports by community..
  community_ID: {
    type: Schema.Types.ObjectId,  
    ref: 'communities' 
  },
  priceUnit: {
    type: [{
      type: String,
      enum: ['hour','day',  'month']
    }],
    default: ['day']
  },
  price: {
    type : Number,
    required:'Kindly enter the price'
  },
  timestamp : { type: Date, default: Date.now },
});

module.exports = mongoose.model('leisurePark', leisureParkSchema);