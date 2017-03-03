var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */


exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html'),
  loading: path.join(__dirname, '../web/public/loading.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {
      throw err;
    }
    var array = data.toString().split('\n');
    callback(array);
  }); 
  //return array of urls
};

exports.isUrlInList = function(url, callback) {
  
  exports.readListOfUrls(function(urlArray) {
    if (urlArray.indexOf(url) > -1 ) {
      callback(true);
    } else {
      callback(false); 
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(err, data) {
    if (err) {
      throw err;
    }
    callback(); 
  });
};

exports.isUrlArchived = function(url, callback) {
  //check if archives/sites includes file name = url
  fs.readdir(exports.paths.archivedSites, function(err, data) {
    if (err) {
      throw err;
    }
    if (data.indexOf(url) > -1) {
      callback(true);     
    } else {
      callback(false);
    }
  });

};

exports.downloadUrls = function(urls) {
  //iterate over urls array
  urls.forEach(function(urlElement) {
    var absPath = exports.paths.archivedSites + '/' + urlElement;
    exports.isUrlArchived(urlElement, function(boolean) {
      if (boolean === false) {
        fs.openSync(absPath, 'wx'); 
        request('http://' + urlElement).pipe(fs.createWriteStream(absPath));
      }
    });
  });
}; 
      
      // var options = {
      //   host: urlElement,
      //   port: 80,
      //   path: '/index.html'
      // };


    //pass in the element(url) into isUrlArchived(url, function(boolean))
      //if boolean is not true
        //create file with url as the name of that file
        //some how get the html from that website
        //fs.appendFile html source code
