'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 

var CommunitySchema = new Schema({
  // code: {
  //   type: String,
  //   required: 'Kindly enter the code'
  // },
  name: {
    type: String,
    required: 'Kindly enter the name'
  },
  city_ID: {
    type: Schema.Types.ObjectId,  
    // ref: 'cities',
    // required: 'Kindly enter the city_ID'
  },
  mapid: {
    type: String 
  } ,
  position: {
    type: String 
  } ,
  address: {
    type: String 
  } 
});

module.exports = mongoose.model('community', CommunitySchema);