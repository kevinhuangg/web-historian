var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var headers = require('./http-helpers.js').headers; //might need it?
var serveAssets = require('./http-helpers.js').serveAssets;

// require more modules/folders here!
// http://127.0.0.1:8080/
exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);

  var statusCode;
  var body = [];
  
  req.on('error', function() {
    statusCode = 404;
  });

  if (req.method === 'GET') {
    statusCode = 200; 
    fs.readFile(archive.paths.index, function(err, data) {
      if (err) {
        throw err;
      }
      res.writeHead(statusCode, headers); 
      res.end(data);

    });
  }

  if (req.method === 'POST') {
    req.on('data', function(chunk) {
      statusCode = 201; 
      // console.log(chunk);
      var jsonString = '';
      jsonString += chunk; //output: url=www.example.com
      // console.log(jsonString, 'JSONSTRING');
    }).on('end', function() {
      //invoke readListOfUrls
        //if (!isUrlInList)
          //invoke addUrlToList
    });
      
      //store jsonString inside of archives/sites/sites.txt

      //assuming we have the correct output
      //check if the output is in archives/sites/sites.txt

  }

  //get url from body of request
    //if url is in sites/sites.txt 
      //send back sites/url.js
  // res.writeHead(statusCode, headers); 
};
