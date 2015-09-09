var path = require('path');
var archive = require('../helpers/archive-helpers');
var assetServer = require('./http-helpers');
var fs = require('fs');
var url = require('url') 
// require more modules/folders here!

var directoryContents = [];
    // fs.readDir() to read files in web/public and then use contains function to see if one of the files matches
fs.readdir(path.join(__dirname, '/public/'), function(err, files) {
  if (err) {
    console.log('Could not retrieve those files');
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
    var directory = '/../archives/sites/'; 
    if (directoryContents.indexOf(pathName) !== -1) {
      directory = '/public/';
    }
    assetServer.serveAssets(res, directory + pathName);
    
  }
  if (req.method === 'POST') {

  }

  // res.end(archive.paths.list);
};
