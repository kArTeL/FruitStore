/**
 * Module for export to not found path
 * @type {NotFound}
 */
module.exports = {
  redirect : function(response) {
    //console.log("No request handler found for " + pathname);
     response.writeHead(404, {"Content-Type": "text/plain"});
     response.write("404 Not found");
     response.end();

  }

};
