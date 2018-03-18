'use strict';

//1.
//var http = require('http');
// var mapData = {};
// //2.
// var extServerOptions = {
//     host: 'api.map.baidu.com',
//     port: '80',
//     path: 'location/ip?ak=BwpRyGZipdkOdgRx8Z27Ynlp',
//     method: 'GET'
// };

// exports.getMapData = function (req, response) {
//     //3.
//     http.request(extServerOptions, function (res) {
//         console.log('haha strart request');
//         res.setEncoding('utf8');
//         res.on('data', function (data) {
//             mapData = JSON.parse(data);
//             response.json(mapData);
//             console.dir(mapData);
//         });

//     }).end();

//     //console.log('haha end request');
//     //console.log("Doing the Get Operations....");
// };





// var http = require('http');
// var data = JSON.stringify({
//   'id': '2'
// });

// var options = {
//   host: 'host.com',
//   port: '80',
//   path: '/WebServiceUtility.aspx/CustomOrderService',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json; charset=utf-8',
//     'Content-Length': data.length
//   }
// };

// var req = http.request(options, function(res) {
//   var msg = '';

//   res.setEncoding('utf8');
//   res.on('data', function(chunk) {
//     msg += chunk;
//   });
//   res.on('end', function() {
//     console.log(JSON.parse(msg));
//   });
// });

// req.write(data);
// req.end();



// get walking directions from central park to the empire state building
var http = require("http");
var url = "http://api.map.baidu.com/location/ip?ak=BwpRyGZipdkOdgRx8Z27Ynlp";


exports.getMapData = function (req, res) {
    // get is a simple wrapper for request()
    // which sets the http method to GET
    var request = http.get(url, function (response) {
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