var path = require('path');
var fs = require('fs');
var mime = require('mime');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  var self = this;
  fs.readFile(path.join(__dirname, asset), function(err, data) {
    if (err) {
      console.log('ERROR!!1!');
      res.writeHead(404, self.headers);
      res.end();
    } else {
      // self.headers['Content-Type'] = mime.lookup(asset); // Won't work for www.google.com as asset
      res.writeHead(200, self.headers);
      res.end(data);
    }
  });


};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
