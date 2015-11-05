/** Nodejs framework modules necessary to response the request
*/

'use strict';

 //var bodyParser = require('body-parser');

//var route = require('./Route.js')

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var config = require('./config/environment');
var path = require('path');

var app = express();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
// app.use( express.logger() );
app.use( bodyParser.json());
app.use(express.static(__dirname + '/public'));
// app.configure(function(){
//     app.use( express.logger() );
//     app.use( express.cookieParser() );
//     app.use( express.bodyParser());
//     app.use(express.static(__dirname + '/public'));
//     //app.use(express.static(__dirname +  '/client'));
// });

// Start server
server.listen(6080, function () {
  console.log('Express server listening on %d, in %s mode', 6080, app.get('env'));

});

// Expose app
exports = module.exports = app;



// ///Create a nodejs server
// http.createServer(function (request, response) {

//   route.route(request,response);


// }).listen(8080);

// console.log('Server running at http://127.0.0.1:8080/');
