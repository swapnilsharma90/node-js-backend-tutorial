// var express = require("express");
// var bodyParser = require("body-parser");
// var app = express();
 
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
 
// var routes = require("./routes/routes.js")(app);
 
// var server = app.listen(3000, function () {
//     console.log("Listening on port %s...", server.address().port);
// });


//new
var express = require('express'),
    wine = require('./routes/wines');

var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.configure(function () {
//     app.use(express.logger('dev'));      'default', 'short', 'tiny', 'dev' 
//     app.use(express.bodyParser());
// });

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);


//app.listen(3000);


var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
