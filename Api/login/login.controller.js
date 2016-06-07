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
var tokenGenerator = require('../TokenGenerator.js');
var sqlInjectionDetector = require('../Diversificacion/SQLInjectionDetector.js');

var winston = require('winston');

// Get list of holes
//
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'successAttacks.csv' })
  ]
});



exports.index = function (req, res) {
  console.log(req.param);
  var username = req.param('username');
  var password = req.param('password');
  //var json  = req.body;
  //console.log(json);
  ///Check if all parameters all filled
  var isValidJSON = true;

  if (isValidJSON) {
    //chequear si es un usuario valido en caso de ser un usuario valido
    connection.connection(function (err, conn) {
      //console.log("response is");

      if (!err) {
        console.log("connection is not null we can use this");
        loginUser(conn, username, password, function (error, credential) {
          // end the connection
          conn.release(function (err) {
            //  console.log("error disconnecting the connection");
            //  console.log(err);
          });
          //The user exist in data base so go ahead
          if (!error) {
            //generar el uuid
            res.send(credential);
          } else {
            return res.status(401).send(JSON.stringify(error));
          }
          //console.log(response);
        })
      } else {
        res.status(500).send({ code: 500, message: "Internal error" });
      }
    });
  } else {
    return res.status(401).send({ code: 404, message: "invalid credentials" });
    res.sendfile(app.get('appPath') + '/login.html');
  }
};

//Logout session with id
exports.logout = function (req, res) {
  var json = { "token": req.param('token'), "userId": req.param('userId') };
  if (validateLogoutSession(json)) {
    var token = json["token"];
    var userId = json["userId"];
    //console.log(json);
    connection.connection(function (err, conn) {
      //UPDATE t1 SET col1 = col1 + 1;
      if (!err) {
        var rawQueryString = "UPDATE session SET enabled = 0 where uuid='{0}' OR user = '{1}'";
        var tokenizedResult = sqlInjectionDetector.generateTokenizedQuery(rawQueryString);
        var formatedAndTokenizedQueryString = String.format(tokenizedResult.tokenizedQuery, token, userId);
        var isValidQuery = sqlInjectionDetector.checkIfIsValidQuery(formatedAndTokenizedQueryString, tokenizedResult.token);

        if (isValidQuery) {
          conn.query(String.format(rawQueryString, token, userId), null,
            function (error, result) {
              if (error) {
                console.log(error);
                res.status(500).status({ message: "Internal error", code: 500 });
              } else {
                if (result.changedRows != 0) {
                  logger.info(formatedAndTokenizedQueryString + ", inyectado");
                } else {
                  logger.info(formatedAndTokenizedQueryString + ", no valido");
                }
                console.log("not error");
                console.log(result);
                conn.release(function (err) { });
                res.send(result);
              }
            });
        }
        else {
          callback({ code: 505, message: "Agarrado hackeando" }, null);
        }
      } else {
        res.status(500).status({ message: "Internal error", code: 500 });
      }


    });

  }
  else {
    res.status(401).send({ code: 404, message: "invalid credentials" });
  }

};

function validateLogoutSession(json) {
  var isValid = true;
  if (json == undefined) {
    isValid = false;
  }
  else if (json['token'] == undefined || json['userId'] == undefined) {
    isValid = false;
  }
  return isValid;
}

function loginUser(conn, username, password, callback) {
  //var queryString = "SELECT * FROM user WHERE username = xx and password ="
  //
  //"{0}{1}".format("{1}", "{0}")
  //
  //
  //String.format('{0} is dead, but {1} is alive! {0} {2}', 'ASP', 'ASP.NET');
  //
  if (username && password) {
    var rawQueryString = "SELECT * FROM user WHERE username = '{0}' and password = '{1}'";
    // var result =tokenizer.tokenizar(rawQueryString);
    // result.token;
    // result.query;
    //
    //var returnValue = {tokenizedQuery:tokenizedString, token:token};
    var tokenizedResult = sqlInjectionDetector.generateTokenizedQuery(rawQueryString);
    //
    var formatedAndTokenizedQueryString = String.format(tokenizedResult.tokenizedQuery, username, password);
    //
    // console.log("formated and tokenized string :"+ formatedAndTokenizedQueryString);
    //
    var isValidQuery = sqlInjectionDetector.checkIfIsValidQuery(formatedAndTokenizedQueryString, tokenizedResult.token);

    if (isValidQuery) {
      conn.query(String.format(rawQueryString, username, password),
        null,
        function (err, results) {

          //there's not error
          if (!err) {
            //user  exist in data base
            if (results.length != 0) {
              var user = results[0];
              // console.log("usuario");
              logger.info(formatedAndTokenizedQueryString + ", inyectado");

              //create the token to be inserted into the table @session
              var token = tokenGenerator.generateToken();
              //console.log("token generado para usuario: "+token);
              //callback(null, user);
              conn.query("INSERT INTO session(uuid,user) VALUES(" + mysql.escape(token) + ", " + mysql.escape(user["id"]) + ")",
                null,
                function (err, session) {
                  if (!err) {
                    var credential = { token: token, userId: user["id"], role: user["role"] };
                    callback(null, credential);
                    //  conn.releaseConnection();
                  } else {
                    //  conn.releaseConnection();
                    //conn.release();
                    callback({ code: 500, message: "Internal server error" }, null);
                  }

                }
              );
            }
            //user  doesnot exist in data base
            else {
              logger.info(formatedAndTokenizedQueryString + ", no valido");
              //  conn.releaseConnection();
              callback({ code: 404, message: "invalid credentials" }, null);
            }
          } else {
            //console.log(err);
            //console.log(err);
            //  conn.releaseConnection();
            callback({ code: 404, message: "invalid user" }, null);
          }
        });
    }
    else {
      callback({ code: 505, message: "Agarrado hackeando" }, null);
    }
  }
  else {
    callback({ code: 505, message: "Agarrado hackeando" }, null);
  }

}

function validateJSON(json) {
  console.log(json);
  var isValid = true;
  if (json == undefined) {
    isValid = false;
  } else if (json['username'] == undefined || json['password'] == undefined) {
    isValid = false;
  }
  return isValid;
}
