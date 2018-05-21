'use strict';
module.exports = function(app) {
  var sms = require('../controllers/smsController');

  app.route('/sms/')
    .get(sms.checkSMSTime);

  // todoList Routes
  app.route('/sms/:cellPhone/:verifyCode')
    .post(sms.sendSMS);
    
};
