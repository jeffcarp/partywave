var app = require('../app');
var expect = require('expect.js');
var request = require('request');
var browserify = require('browserify');
var fs = require('fs');
var utils = require('../utils');

var port = 3005;
var server;

before(function(done) {
  server = app.listen(port, done);
});

after(function(done) {
  server.close(done);
});

process.on('exit', function() {
  // Last ditch effort if tests fail
  try { server.close(); } catch (e) {};
});

describe('GET /', function() {

  it('returns an explanation of the service', function(done) {

    request.get(url('/'), function(err, res, body) {
      if (err) console.error(err);

      expect(res.statusCode).to.equal(200);
      expect(res.headers['content-type']).to.contain('text/html');
      expect(body).to.contain('Party Wave');
      done();
    });
  });

});

describe('GET *', function() {

  it('returns an "installing" message if you ask for a library it does not have', function(done) {
    utils.uninstallLibrary('archy', function() {
      fetch('archy', function(res, body) {

        expect(res.statusCode).to.equal(503);
        expect(res.headers['content-type']).to.contain('application/javascript');
        expect(body).to.contain('not installed');

        done();
      });
    });
  });

  it('returns one library', function(done) {

    var libraries = [
      'array-map'
    ];

    fetch(libraries, function(res, body) {
      expect(res.statusCode).to.equal(200);
      expect(res.headers['content-type']).to.contain('application/javascript');

      utils.bundle(libraries, function(bundledStr) {
        expect(body).to.equal(bundledStr);
        done();
      });
    });
  });

  it('returns two libraries', function(done) {

    var libraries = [
      'array-map',
      'array-reduce'
    ];

    fetch(libraries, function(res, body) {
      expect(res.statusCode).to.equal(200);
      expect(res.headers['content-type']).to.contain('application/javascript');

      utils.bundle(libraries, function(bundledStr) {
        expect(body).to.equal(bundledStr);
        done();
      });
    });

  });

});

var url = function(path) {
  return 'http://localhost:' + port + path;
};

var fetch = function(query, callback) {

  if (query instanceof Object) {
    query = query.join('+');
  }

  request.get(url('/'+query), function(err, res, body) {
    if (err) console.error(err);

    callback(res, body);
  });
};

