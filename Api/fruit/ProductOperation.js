
var connection = require('../Connection.js');
var sessionInvalid = require('../SessionValidator');
var mysql = require('mysql');
var async = require('async');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// var server  = email.server.connect({
//    user:    "neilliga@gmail.com",
//    password:"neil29102910",
//    host:    "smtp.gmail.com",
//    ssl:     true
// });
var fruitsPurchased = "";

module.exports = {
  buyProduct : function(conn,json, callback) {
    if (json['products']){
      console.log("buying");
      var userId = json['userId']
      var products = json['products'];

      conn.query("SELECT * FROM user WHERE id = "+ mysql.escape(userId),
         null,
         function(err, results) {
           //there's not error
           if (!err) {
             if (results.length> 0) {
               checkFruitsQuantity(conn,products,function(isValid) {
                 if (isValid) {
                   createTransactionAndMakePayment(conn,json['creditcard'],userId, function (error, result) {
                     if (!error) {
                       var transactionId =  result.insertId;
                      //  (products, transactionId, block)
                       insertSales(conn,products,transactionId, function() {
                         console.log("sending email");
                         sendEmail();
                         callback(null,transactionId);
                       })
                       //callback(null,true);
                     }else {

                     };
                   });

                 }else {
                   callback({code:400, message:"not available quantity of products"}, null);
                 }
               } );
             }
             else {
               callback({code:401, message:"invalid user"},null);
             }
           }
           else
           {

           }
         });
    }
    else
    {
      //Not products there
    }
  }
};

function checkFruitsQuantity(conn, products, callback) {
  var fruitsQuantity = [];
  var fruitsIdString = "";
  for (var i = 0; i< products.length; i++) {
    var fruit = products[i];
    var fruitId = fruit["fruitId"];
    fruitsQuantity[i] = fruit["quantity"];;
    fruitsIdString = fruitsIdString + fruitId;
     if (i != products.length-1) {
       fruitsIdString = fruitsIdString + "|| id =";
     }
  }
  getAllFruitsQuantity(conn,fruitsIdString, fruitsQuantity, function(error, results) {
    if (!error) {
      console.log("query return ");

      var goAhead = true;
      for (var i = 0; i<results.length; i++) {
        var result = results[i];
        var quantity = result["quantity"];

        if ((quantity - fruitsQuantity[i]) < 0) {
          goAhead = false;
          break;
        }
      }
      callback(goAhead);
    }else {
        callback(false);
    }
  });

}

function getAllFruitsQuantity(connection, fruitString,quantities, callback) {
  var query = "SELECT name, quantity, id FROM fruit WHERE id = "+ fruitString + " ORDER BY id";
  console.log(query);
  connection.query( query,
     null,
     function(err, results) {
       if (!err) {
         if (quantities.length == results.length) {
           for (var i =0; i< results.length; i++)
           {
             fruitsPurchased = fruitsPurchased + results[i]["name"] + "\n";
           }
            callback(null,results);

         }else {
           callback(1);
         }

       }else {
         console.log(err);
         callback(err, null);
       }

     });
}

function createTransactionAndMakePayment(connection, credictCardNumber, userId,callback) {
  var query = "INSERT INTO transaction(user,creditCardNumber) VALUES(" + mysql.escape(userId) + ", "+  mysql.escape(credictCardNumber) +")";
  connection.query(query, null, function(err, result) {
    if (!err) {
      console.log(result);
      callback(null,result);
    }else {
      console.log(err);
      callback({code:500, message: "Internal error"},null);
    }
  });
};


function insertSales(conn,products, transactionId, block) {
  // 1st para in async.each() is the array of items
  async.each(products,
  // 2nd param is the function that each item is passed to
  function(product, callback){
    var fruitId = product["fruitId"];
    var quantity = product["quantity"];
    insertSale(conn,fruitId, quantity,transactionId, function() {
      callback();
    });
  },
  // 3rd param is the function to call when everything's done
  function(err){
    block(transactionId);
  });

}

function insertSale(conn,fruitId, quantity,transactionId, callback) {
  var query = "INSERT INTO sale(fruit, quantity, transaction) VALUES(" + mysql.escape(fruitId) + ", "+  mysql.escape(quantity) + ", "+ mysql.escape(transactionId) +")";
  console.log(query);
  conn.query(query,
    null,
    function(err, session) {
      if(!err) {

      }else {
        console.log(err);
      }
      callback();
    });

}

function sendEmail()
{
  var emailBody = "Gracias por comprar las frutas" + "\n" + fruitsPurchased;
  console.log("email with body:");
  console.log(emailBody);

  var transporter = nodemailer.createTransport(smtpTransport({
    host: '127.0.0.1',
    port: 25
  }));
  transporter.sendMail({
    from: 'usuario10a@orificio.ecci.ucr.ac.cr',
    to: 'usuario10@orificio.ecci.ucr.ac.cr',
    subject: 'Nueva compra hecha a Fruities',
    text: emailBody
  }, function(error, info){
    if(error){
        console.log("error enviando email: ")
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

 //  server.send({
 //   text:    emailBody,
 //   from:    "neilliga@gmail.com",
 //   to:      "ngarcia@soin.co.cr",
 //   cc:      "",
 //   subject: "testing emailjs"
 // }, function(err, message) { console.log(err || message); });

}
