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
      enum: ['pending', 'available', 'unavailable']
    }],
    default: ['available']
  },
  carport_ID : {
    type: Schema.Types.ObjectId,
    ref: 'carports',
    required: 'Kindly enter the carport_ID'
  },
  applied_UserID : {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = mongoose.model('leisurePark', leisureParkSchema);