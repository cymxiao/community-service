'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 

var CitySchema = new Schema({
  code: {
    type: String,
    required: 'Kindly enter the code'
  },
  name: {
    type: String,
    required: 'Kindly enter the name'
  },
  country_ID : {
    type: Schema.Types.ObjectId, 
    ref: 'countries' ,
    required: 'Kindly enter the country_ID'
  }
});

module.exports = mongoose.model('city', CitySchema);