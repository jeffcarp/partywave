var express = require('express');
var u = require('./utils');
var fs = require('fs');
var app = module.exports = express();

app.get('/', function (req, res) {
  res.header('Content-Type', 'application/javascript');
  res.send('console.log("Welcome to the Party Wave. Usage described here: http://www.partywavejs.org/"); \n')
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
    res.status(202);
    res.send('console.error("Sorry, one or more of those libraries are not installed yet. If they are valid npm packages, they will be installed momentarily. Check back in 30 seconds.");');

    unavailable.forEach(u.installLibrary);
    return;
  }

  u.bundle(libraries, function(bundledStr) {
    res.send(bundledStr);
    fs.writeFileSync(filename, bundledStr);
  });
});
