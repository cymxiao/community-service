'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 

var CountrySchema = new Schema({
  code: {
    type: String,
    required: 'Kindly enter the code'
  },
  name: {
    type: String,
    required: 'Kindly enter the name'
  } 
});

module.exports = mongoose.model('country', CountrySchema);