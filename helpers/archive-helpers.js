var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');

var urlList = [];

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public/'),
  archivedSites: path.join(__dirname, '../archives/sites/'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function() {
  // go into sites.txt
  fs.readFile(this.paths.list, function(err, data) {
    if (err) {
      console.log('Site list not found!!!!1! X-0');
    } else {
      urlList = data.split('\n');
    }
  });
  // save to outside scope an array of urls
};

exports.isUrlInList = function(url) {
  return urlList.indexOf(url) !== -1;
};

exports.addUrlToList = function(url) {
  fs.appendFile(this.paths.list, url + '\n', function(err) {
    if (err) {
      console.log(url + ' could not be appended to file.');
    }
  });
};

exports.isUrlArchived = function(url, trueCallback, falseCallback) {
  fs.stat(this.paths.archivedSites, function(err, stats){
    if(err) {
      console.log('Error checking archived sites.');
    } else {
      if(stats.isFile()){
        trueCallback(url);
      } else {
        falseCallback(url);
      }
    }
  });
};

exports.downloadUrls = function() {
  _.each(urlList, function(url){
    this.isUrlArchived(url, function(){/* Do nothing if already archived */}, this.downloadUrl(url));
  }.bind(this));
};

exports.downloadUrl = function(url){
  http.get('http://' + url, function(err, res){
    if(err){
      console.log(url + ' could not be loaded.')
    } else {
      fs.writeFile(path.join(this.paths.archivedSites, url), res.buffer.toString(), function(err){
        console.log('File could not write.');
      });
    }
  }.bind(this));
};
