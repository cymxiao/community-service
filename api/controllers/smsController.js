'use strict';
 
 
var http = require("http");
var url = "https://api.mysubmail.com/message/send";

exports.sendSMS = function (req, res) { 
    const smsBody = {
         appid: "23171",
         signature: "92e80748c54a46ffd5c5954ffbbbe8e6",
         to:  req.params.cellPhone,
        // cellPhone: "13816873730",
        // verifyCode: "123789"
        content: "【享停车】 您的验证码是" +  req.params.verifyCode + "，请在10分钟内输入。"
    };

    http.post(url , JSON.parse(smsBody),function (response) {
        //response.json(role);
    }); 
}