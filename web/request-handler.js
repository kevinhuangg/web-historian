var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var headers = require('./http-helpers.js').headers; //might need it?
var serveAssets = require('./http-helpers.js').serveAssets;

// http://127.0.0.1:8080/
exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);

  var statusCode;

  //declare variable to hold index.html data

  //declare variable to hold loading.html data
  var loading = fs.readFileSync(archive.paths.loading);
  
  // fs.readFile(archive.paths.index, function(err, data) {
  //   if (err) {
  //     statusCode = 404; 
  //   }
  //   index = data;
  // }).readFile(archive.paths.loading, function(err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   loading = data;
  // });

  req.on('error', function() {
    statusCode = 404;
  });
  
  //GET method
  if (req.method === 'GET') { 
    
    statusCode = 200; 
    
    if (req.url === '/') { //if going to homepage
      fs.readFile(archive.paths.index, function(err, data) {
        if (err) {
          throw err;
        }
        res.writeHead(statusCode, headers); 
        // console.log(data);
        res.end(data);
      });

    } else { //if going directly to archived site
   
      fs.readFile(archive.paths.archivedSites + req.url, function(err, data) {
        if (err) {
          statusCode = 404;
        }
        res.writeHead(statusCode, headers); 
        res.end(data);  
      });  

    }
  }

  if (req.method === 'POST') {
    statusCode = 201;
    var url = '';
    //receive data convert to string and add to archives if its not in there
    req.on('error', function(err) {
      console.log(err);
    }).on('data', function(data) {
      url += data; //url=www.example.com
      fs.readFile(archive.paths.list, function(err, data) {
        if (err) {
          throw err;
        }
        var array = data.toString().split('\n');

        if (array.indexOf(url.slice(4)) === -1) { //if we can't find it
          statusCode = 302;

          fs.appendFile(archive.paths.list, url.slice(4) + '\n', function(err, data) {
            if (err) {
              throw err;
            }
            console.log('The url was appended to file!');
          });
          
          res.writeHead(statusCode, headers); 
          res.end(loading);
        }
      }); 
    });
  //   res.writeHead(statusCode, headers);
  //   res.end();
  // }
  }



};





