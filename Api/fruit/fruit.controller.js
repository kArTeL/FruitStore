/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';
var mysql = require('mysql');
var connection = require('../Connection.js');
var sessionValidator = require('../SessionValidator.js');
var fruitBuyer = require('./ProductOperation.js');
var loggerBuilder = require('../LoggerBuilder.js');
var tokenGenerator = require('../TokenGenerator.js');
var sqlInjectionDetector = require('../Diversificacion/SQLInjectionDetector.js');

var logger = loggerBuilder.getLogger();

// Get list of holes
exports.index = function (req, res) {
  connection.connection(function (err, conn) {
    var json = { "token": req.param('token'), "userId": req.param('userId') };
    if (!err) {
      //check if the session is valid, this check the expirationDate, username,password,token
      var formatedAndTokenizedQueryString = "";
      sessionValidator.validateSession(conn, json, formatedAndTokenizedQueryString, function (error, success) {
        //if the session is valid go ahead
        if (!error) {
          logger.info(formatedAndTokenizedQueryString + ", inyectado");
          connection.query("SELECT * FROM fruit",
            null,
            function (err, results) {
              conn.end(function (err) {
                console.log("error disconnecting the connection");
                console.log(err);
              });
              conn.release(function (err) { });
              if (!err) {
                console.log(results);
                res.send(JSON.stringify(results));
              }
              else {
                return res.status(500).send({ code: 500, message: "Internal server error (sure)" });
              }
            });
        }
        else {
          conn.release(function (err) { });
          logger.info(formatedAndTokenizedQueryString + ", no valido");
          return res.status(401).send(error);
        }
      });
    }
    else {
      return res.status(500).send({ code: 500, message: "Internal server error (sure)" });
    }
  });
};

  //Method need a post like this {creditcard: "" , userId: "",  products: [{fruitId:"", quantity: 2}]}
exports.buyFruits = function (req, res) {
  var json = req.body;


  connection.connection(function (err, conn) {
    if (!err) {
      var formatedAndTokenizedQueryString = "";
      sessionValidator.validateSession(conn,json,formatedAndTokenizedQueryString,function (error, success) {
        //if not error
        if (!error) {



          if (json['products'] && json['creditcard']) {
            json.products = JSON.parse(json['products']);
            json.products .sort(function(a, b) {
                return parseFloat(a.fruitId) - parseFloat(b.fruitId);
            });
            console.log(json);
            fruitBuyer.buyProduct(conn,json, function(err, success) {
              if (!err) {

                res.send({orderId:success});
              }else {
                return res.status(401).send(err);
              }
            })
          }else {
            console.log(json);
            //response.writeHead(404, {"Content-Type": "application/json"});
            return res.status(401).send({code:404, message:"Invalid parameters"});
            //response.end();
          }
        }
        //Invalid session
        else {
             return res.status(401).send({code:401, message: "Invalid session"});

        }
      });
    }
    else
    {
       return res.status(500).send({code:500, message:"Internal server error(gratz)"});
    }
  });
}
