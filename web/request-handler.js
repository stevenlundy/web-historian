var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');
var error = require('./log-helper');
// require more modules/folders here!

var directoryContents = [];
    // fs.readDir() to read files in web/public and then use contains function to see if one of the files matches
fs.readdir(path.join(__dirname, '/public/'), function(err, files) {
  if (err) {
    error.log('Could not retrieve those files');
  } else {
    directoryContents = files;
  }
})

exports.handleRequest = function (req, res) {
  
  if (req.method === 'GET') {
    var pathName = url.parse(req.url).pathname.slice(1);

    if(pathName === ''){
      pathName = 'index.html';
    }
    // if directoryContents matches asset url, set directory to web/public, otherwise it remains archives/sites/
    var directory = archive.paths.archivedSites; 
    if (directoryContents.indexOf(pathName) !== -1) {
      directory = archive.paths.siteAssets;
    }
    httpHelpers.serveAssets(res, directory + pathName, 200);
    
  }
  if (req.method === 'POST') {
    debugger;
    httpHelpers.readData(req, function(data){
      var query = url.parse('?' + data, true).query;
      if(query.url !== undefined){
        if(!archive.isUrlInList(query.url)){
          archive.addUrlToList(query.url);
        }
        archive.isUrlArchived(query.url, function(url){
          httpHelpers.redirect(res, req.headers.origin + '/' + url);
        }, function(url){
          httpHelpers.redirect(res, req.headers.origin + '/' + 'loading.html');
        });
      }
    });
  }

  // res.end(archive.paths.list);
};
