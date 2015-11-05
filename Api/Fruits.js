/**
 * Module to execute the operations on the fruit.
 * fruit validator
 */
var mysql = require('mysql');
var connection = require('./Connection');
var sessionValidator = require('./SessionValidator.js');
var fruitBuyer = require('./ProductOperation.js');

module.exports = {
  //Get all the fruits
  getFruits : function(request, response){
    var body = '';
   request.on('data', function (data) {
       body += data;

       // Too much POST data, kill the connection!
       if (body.length > 1e6)
           request.connection.destroy();
   });
   request.on('end', function () {
      //parse to json
      var json;
       if (body) {
         json = JSON.parse(body);
       }


       //Make the connection
       if (json) {
         connection.connection(function (err, conn) {
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
                        response.writeHead(500, {"Content-Type": "application/json"});
                        response.write(JSON.stringify(results));
                        response.end();
                      }
                      else
                      {
                        response.writeHead(500, {"Content-Type": "application/json"});
                        response.write(JSON.stringify({code:500, message:"Internal server error (sure)"}));
                        response.end();
                      }
                  });


               }
               else
               {
                 response.writeHead(401, {"Content-Type": "application/json"});
                 response.write(JSON.stringify(error));
                 response.end();
               }
             });
           }
           else {
             response.writeHead(500, {"Content-Type": "application/json"});
             response.write(JSON.stringify({code:500, message: "Hacking? Stop that bro"}));
             response.end();
           }
         });
       }else {
         invalidSessionResponse(response);
       }

   });
 },

  buyFruits : function(request, response){

    var body = '';
   request.on('data', function (data) {
       body += data;

       // Too much POST data, kill the connection!
       if (body.length > 1e6)
           request.connection.destroy();
   });
   request.on('end', function () {
      //parse to json
      var json;
       if (body) {
         json = JSON.parse(body);
       }
       //Make the connection
       if (json) {
         connection.connection(function (err, conn) {
           if (!err) {
             sessionValidator.validateSession(conn,json,function (error, success) {
               //if not error
               if (!error) {
                 if (json['products'] && json['creditcard']) {

                   fruitBuyer.buyProduct(conn,json, function(err, success) {
                     if (!err) {
                       response.writeHead(400, {"Content-Type": "application/json"});
                       response.write(JSON.stringify({orderId:success}));
                       response.end();
                     }else {
                       response.writeHead(400, {"Content-Type": "application/json"});
                       response.write(JSON.stringify(err));
                       response.end();
                     }
                   })
                 }else {
                   response.writeHead(404, {"Content-Type": "application/json"});
                   response.write(JSON.stringify({code:404, message:"Invalid parameters"}));
                   response.end();
                 }
               }
               //Invalid session
               else {

                 invalidSessionResponse(response);
               }
             });
           }
           else
           {
             response.writeHead(500, {"Content-Type": "application/json"});
             response.write(JSON.stringify({code:500, message:"Internal server error(gratz)"}));
             response.end();
           }
         });

       }
       else
       {
         invalidSessionResponse(response);
        //  response.writeHead(401, {"Content-Type": "application/json"});
        //  response.write(JSON.stringify({code:401, message: "Hacking? Stop that bro"}));
        //  response.end();
       }

  });


  }


};

function buySuccessfull(response) {
  response.writeHead(200, {"Content-Type": "application/json"});
  response.write(JSON.stringify({code:200, message: "Success"}));
  response.end();
}


function invalidSessionResponse(response) {
  response.writeHead(401, {"Content-Type": "application/json"});
  response.write(JSON.stringify({code:401, message: "Invalid session"}));
  response.end();
}
