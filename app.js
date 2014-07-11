var express = require('express');
var u = require('./utils');
var fs = require('fs');
var app = module.exports = express();

app.get('/', function (req, res) {
  res.send('Welcome to the Party Wave. Usage described here: http://partywavejs.org/ \n')
});

app.get('*', function (req, res) {
  res.header('Content-Type', 'application/javascript');

  var query = req.path.slice(1);
  var libraries = query.split('+').sort();
  var filename = './builds/'+libraries.join('+');

  if (fs.existsSync(filename)) {
    var fileContents = fs.readFileSync(filename, 'utf8');
    res.send(fileContents);
    return;
  }

  var unavailable = libraries.filter(function(lib) {
    return !u.moduleInstalled(lib);
  });

  if (unavailable.length) {
    res.status(503);
    res.send('Sorry, one or more of the libraries is not installed yet. If it is a valid npm package, they will be installed momentarily.');

    unavailable.forEach(u.installLibrary);
    return;
  }

  u.bundle(libraries, function(bundledStr) {
    res.send(bundledStr);
    fs.writeFileSync(filename, bundledStr);
  });
});
