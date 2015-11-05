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

  // Get list of holes
  exports.index = function(req, res) {
        connection.connection(function (err, conn) {
          var json = req.body;
          console.log(json);
          if (!err) {
            //check if the session is valid, this check the expirationDate, username,password,token
            sessionValidator.validateSession(conn,json,function (error, success) {

              //if the session is valid go ahead
              if (!error) {
                conn.query("SELECT * FROM fruit",
                   null,
                   function(err, results) {
                     conn.end(function(err) {
                       console.log("error disconnecting the connection");
                       console.log(err);
                     });
                     if (!err) {
                       console.log(results);
                        res.send(JSON.stringify(results));
                     }
                     else
                     {
                       return res.status(500).send({code:500, message:"Internal server error (sure)"});

                     }
                 });


              }
              else
              {
                return res.status(401).send(error);

              }
            });
          }
          else {
             return res.status(500).send({code:500, message:"Internal server error (sure)"});
          }
        });
  };

  //Method need a post like this {creditcard: "" , userId: "",  products: [{fruitId:"", quantity: 2}]}
exports.buyFruits = function (req, res) {
  var json = req.body;


  connection.connection(function (err, conn) {
    if (!err) {
      sessionValidator.validateSession(conn,json,function (error, success) {
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
