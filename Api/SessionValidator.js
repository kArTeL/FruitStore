/**
 * Validate the session, if still active or inactive.
 * @type {Object}
 */
var mysql = require('mysql');
var sqlInjectionDetector = require('./Diversificacion/SQLInjectionDetector.js');

module.exports = {
  validateSession: function (connection, json, formattedQuery, callback) {
    if (validateJSON(json)) {
      var token = json['token'];
      var userId = json['userId'];

      var rawQueryString = "SELECT s1.id FROM session s1 WHERE s1.uuid = '{0}' and s1.user = (SELECT u1.id FROM user u1 WHERE u1.id = {1} LIMIT 1) and s1.expirationDate > NOW() and s1.enabled = 1";
      var tokenizedResult = sqlInjectionDetector.generateTokenizedQuery(rawQueryString);
      formattedQuery.formatedAndTokenizedQueryString = String.format(tokenizedResult.tokenizedQuery, token, userId);
      var isValidQuery = sqlInjectionDetector.checkIfIsValidQuery(formattedQuery.formatedAndTokenizedQueryString, tokenizedResult.token);
        
      if (isValidQuery) {
        connection.query(String.format(rawQueryString, token, userId),
            null,
            function (err, results) {
              if (!err) {
                if (results.length != 0) {
                  callback(null, true);
                } else {
                  callback({ code: 401, message: "invalid session" }, null);
                }
              } else {
                console.log(err);
                callback({ code: 401, message: "invalid session" }, null);
              }
            }
          );
      }
      else {
        callback({ code: 505, message: "Agarrado hackeando" }, null);
      }
    }
    else {
      callback({ code: 401, message: "invalid parameters" }, null);
    }
  }
};

function validateJSON(json) {
  var isValid = true;
  console.log(json);
  if (json == undefined) {
    isValid = false;
  } else if (json['userId'] == undefined || json['token'] == undefined) {
    isValid = false;

  }
  return isValid;
}