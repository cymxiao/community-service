'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 

var CarportSchema = new Schema({
  parkingNumber: {
    type: String,
    required: 'Kindly enter the parkingNumber'
  },
  type: {
    type: String,
    enum: ['tiny', 'normal'] ,
    default:'normal'
  },
  route: {
    type: String
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  owner_user_ID : {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: 'Kindly enter the owner_user_ID'
  }
});

module.exports = mongoose.model('carport', CarportSchema);