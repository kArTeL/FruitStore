/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/fruits',  require('./Api/fruit'));
  app.use('/api/login',  require('./Api/login'));
  app.use('/api/login',  require('./Api/login'));

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/login.html');
    });
};





//
// var url  = require('url');
//
//
// /** Helper Modules
// */
// var tokenGenerator = require('./Tokengenerator.js');
// var notFoundRouter = require('./NotFound.js');
// var login          = require('./Login.js');
// var fruit          = require('./Fruits.js');
//
// module.exports = {
//   route : function(request, response) {
//     //url parts
//     //request.setCharacterEncoding("UTF-8");
//     var url_parts = url.parse(request.url);
//     //sys.puts(url_parts.pathname);
//
//     //Routing
//     switch(url_parts.pathname) {
//     case '/':
//       //sys.puts("display root");
//       notFoundRouter.redirect(response);
//     break;
//     case '/login':
//       if (request.method == 'POST') {
//          login.login(request, response);
//
//       }
//       else {
//         console.log(request.method);
//         console.log("requesting a get");
//         notFoundRouter.redirect(response);
//       }
//       //sys.puts("display create");
//     break;
//     case '/fruits':
//       if (request.method == 'POST') {
//         fruit.getFruits(request,response);
//       }
//       else
//       {
//           notFoundRouter.redirect(response);
//       }
//
//     break;
//     case '/buyFruit':
//       if (request.method == 'POST') {
//         fruit.buyFruit(request, response);
//       }else {
//         notFoundRouter.redirect(response);
//       }
//     break;
//     default:
//       notFoundRouter.redirect(response);
//     }
//
//   }

//};
