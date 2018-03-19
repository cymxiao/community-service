var express = require('express'),
  app = express(),

   

  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  User = require('./api/models/userModel'), //created user loading here
  Country = require('./api/models/countryModel'),
  City = require('./api/models/cityModel'),
  Community = require('./api/models/communityModel'),
  Carport = require('./api/models/carportModel'),
  LeisurePark = require('./api/models/leisureParkModel'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});


var routes = require('./api/routes/todoListRoutes'); //importing route
var users = require('./api/routes/userRoutes'); 
var maps = require('./api/routes/mapRoutes'); 
var country = require('./api/routes/countryRoutes'); 
routes(app); //register the route
users(app);
maps(app); 
country(app);

app.listen(port);


console.log('Community RESTful API server started on: ' + port);


app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
