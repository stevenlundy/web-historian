var fs = require('fs');
var path = require('path');

exports.log = function (error) {
  var date = new Date();

  fs.appendFile(path.join(__dirname,'/error-log'), date.toLocaleString()+' '+error+'\n', function(err) {
    if (err) {
      console.log(url + ' could not be appended to file.');
    }
  });
  console.log(date.toLocaleString()+' '+error);
};