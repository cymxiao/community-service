'use strict';


var https = require("https");
var url = "https://api.mysubmail.com/message/send";


exports.checkSMSTime = function (req, res) {

    // get is a simple wrapper for request()
    // which sets the http method to GET
    var request = https.get("https://api.mysubmail.com/service/timestamp", function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event    
        var buffer = "",
            data;


        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            // finished transferring data
            // dump the raw data
            console.log(buffer);
            console.log("\n");
            data = JSON.parse(buffer);
            res.json(data);
        });
    });
}

exports.sendSMS = function (req, res) {
    var body;
    const smsBody = JSON.stringify({
        "appid": '23171',
        "signature": '92e80748c54a46ffd5c5954ffbbbe8e6',
        "to": req.params.cellPhone,
        // cellPhone: "13816873730",
        // verifyCode: "123789"
        "content": '【快易停】 您的验证码是' + req.params.verifyCode + '，请在10分钟内输入。'
    });
    console.log(new Date());
    console.dir(smsBody);
    // prepare the header
    var postheaders = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(smsBody, 'utf8')
    };
    var optionspost = {
        host: 'api.mysubmail.com',
        port: 443,
        path: '/message/send',
        method: 'POST',
        headers: postheaders
    };

    var reqPost = https.request(optionspost, function (res) {
        console.log("statusCode: ", res.statusCode);

        res.on('data', function (d) {
            body += d;
            //console.info('POST result: ');
            //console.info(' POST completed');
        });

        res.on('end', function () {
            console.log(body);
            // var jsonResponse = JSON.parse(body);
            // if (success) return success(jsonResponse);

        });
    });

    // write the json data
    reqPost.write(smsBody);
    reqPost.end();
    // reqPost.on('error', function (e) {
    //     console.log(e);
    // });
}