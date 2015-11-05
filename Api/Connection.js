/**
 * Connection to the data base, is better just using a class to make the conection.
 * @type {Object}
 */

var mysql      = require('mysql');

module.exports = {
  connection : function(callback) {
    var pool = mysql.createPool({
      host     : 'localhost',
      port : 3307,
      user     : 'root',
      password : '',
      database : 'fruits'
      //
      //Production
        // host     : '127.0.0.1',
        // user     : 'usuario10',
        // password : '7yJW2Zk6b8',
        // database : 'usuario10'

    });


    pool.getConnection(function(err, conn) {
      if (!err)
      {
        callback(undefined, conn)
        console.log("connection success");
        //console.log(conn);
        // Added to have :params :like :these.
        // conn.config.queryFormat = function(query, values) {
        //   if(!values) return query;
        //   return query.replace(/\:(\w+)/g, function (txt, key) {
        //     if(values.hasOwnProperty(key)) {
        //       return this.escape(values[key]);
        //     }
        //     return txt;
        //   }.bind(this));
        // }
        //return conn;
      }
      else {
        console.log(err);
        callback(err, null);
      }

    });
  }
};

// function connection(pool, erro) {
//
// }
