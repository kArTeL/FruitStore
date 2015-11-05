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
// require('./routes')(app);
//
// // Your own super cool function
var logger = function(req, res, next) {
    console.log("original path " + req.path);
    req.path = req.path.replace("//", "/");
    console.log(req.path);
    next(); // Passing the request to the next handler in the stack.
}
app.use( bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(logger);
var logincontroller = require('./Api/login/login.controller.js');
var fruitcontroller = require('./Api/fruit/fruit.controller.js');

// router.post('/', controller.index);
// router.post('/buyFruits', controller.buyFruits);
// app.get('/', routes.index);
//
// router.post('/', controller.index);
// router.post('/logout', controller.logout);


app.post('/api/fruits', fruitcontroller.index);
app.post('/api/login', logincontroller.index);
app.post('/api/buyFruits', fruitcontroller.buyFruits);
app.post('/api/login/logout', logincontroller.logout);

app.route('/*')
  .get(function(req, res) {
    res.sendfile(app.get('appPath') + '/login.html');
  });

// app.configure(function(){
//     app.use( express.logger() );
//     app.use( express.cookieParser() );
//     app.use( express.bodyParser());
//     app.use(express.static(__dirname + '/public'));
//     //app.use(express.static(__dirname +  '/client'));
// });

// Start server
server.listen(6010, function () {
  console.log('Express server listening on %d, in %s mode', 6080, app.get('env'));

});

// Expose app
exports = module.exports = app;



// ///Create a nodejs server
// http.createServer(function (request, response) {

//   route.route(request,response);


// }).listen(8080);

// console.log('Server running at http://127.0.0.1:8080/');
