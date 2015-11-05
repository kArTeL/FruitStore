module.exports = {
  redirect : function(response) {
    //console.log("No request handler found for " + pathname);
     response.writeHead(401, {"Content-Type": "text/plain"});
     response.write("Permissions denied");
     response.end();

  }

};
