var express = require('express');
var fs = require('fs');
var browserify = require('browserify');
var app = module.exports = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('*', function (req, res) {
  res.header('Content-Type', 'application/javascript');

  var query = req.path.slice(1);
  var libraries = query.split('+').sort();
  var b = browserify();

  var notFound = [];
  libraries.forEach(function(libName) {
    try {
      require.resolve(libName);
    } catch(e) {
      notFound.push(libName);
    }
  });

  if (notFound.length) {

    notFound = notFound.pop();

    console.log('notFound', notFound);

    var npm = require('npm');
    npm.load(null, function(err, npm) {
      npm.install(notFound, function() {
        console.log('installed', arguments);
      });
      res.send('ok');
    });

//    var msg = 'Module ' + notFound.join(', ') + ' was not found.\n';
//    res.status(404);
 //   res.send(msg);
    return;
  }

  libraries.forEach(function(libName) {
    b.require(libName);
  });

  b.bundle({}, function(err, src) {
    res.send(src);
  });
});

/*
app.get('*', function (req, res) {

  //var query = 'react+angular';
  var query = req.path.slice(1);

  var libraries = query.split('+').sort();

  res.header("Content-Type", "application/javascript");
  var filename = './builds/'+libraries.join('+');

  if (fs.existsSync(filename)) {
    sendFile(req, res, filename);
    console.log(filename, 'existing file found, sending');
    return;
  }

  var notFound = [];
  libraries.forEach(function(libName) {
    try {
      require.resolve(libName);
    } catch(e) {
      notFound.push(libName);
    }
  });

  if (notFound.length) {
    var msg = 'Unable to find ' + notFound.join(', ');
    console.log(filename, msg);
    res.send(msg);
    return;
  }

  libraries.forEach(function(libName) {
    b.require(libName);
  });

  console.log('about to create ', filename);
  var file = fs.createWriteStream(filename);
  var writePipe = b.bundle().pipe(file).on('end', function() {
    console.log('ended yes');
  });

  if (fs.existsSync(filename)) {
    sendFile(req, res, filename);
    return;
  }

  // TODO: Use new way of stringifying browserify output
  // TODO: Write cache file after you send the response
});

var sendFile = function(req, res, filename) {
  var fileContents = fs.readFileSync(filename, 'utf8');
  res.send(fileContents);
};
*/
