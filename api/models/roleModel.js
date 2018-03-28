'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 

var RoleSchema = new Schema({
  code: {
    type: String,
    required: 'Kindly enter the code'
  },
  name: {
    type: String,
    required: 'Kindly enter the name'
  } 
});

module.exports = mongoose.model('roles', RoleSchema);