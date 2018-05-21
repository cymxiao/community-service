'use strict';
module.exports = function(app) {
  var sms = require('../controllers/smsController');

  // todoList Routes
  app.route('/sms/:cellPhone/:verifyCode')
    .post(sms.sendSMS);
    
};
