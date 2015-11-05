/**
 * Validate the session, if still active or inactive.
 * @type {Object}
 */
var mysql = require('mysql');
module.exports = {
  validateSession : function(connection,json, callback){
    if (validateJSON(json)) {
      var token    = json['token'];
      var userId = json['userId'];

      console.log(token);
      console.log(userId);

      connection.query("SELECT s1.id FROM session s1 WHERE s1.uuid = "+ mysql.escape(token) +
      " and s1.user = (SELECT u1.id FROM user u1 WHERE u1.id = "+  mysql.escape(userId) + " limit 1) and s1.expirationDate > NOW() and s1.enabled = 1" ,
         null,
         function(err, results) {
           if (!err) {
             if (results.length != 0) {
               callback(null,true);
             } else {
               callback({code:401, message:"invalid session"}, null);
             }
           }else  {
             console.log(err);
             callback({code:401, message:"invalid session"}, null);
           }

         });
    }
    else
    {
        callback({code:401, message:"invalid parameters"}, null);
    }
  }

};

function validateJSON(json) {
  var isValid = true;
  console.log(json);
  if (json == undefined) {
    isValid = false;
  }else if (json['userId'] == undefined || json['token'] == undefined) {
    isValid = false;

  }
  return isValid;
}
