var app = require('../app');
var expect = require('expect.js');
var request = require('request');
var browserify = require('browserify');

var port = 3005;
var server;

var url = function(path) {
  return 'http://localhost:' + port + path;
};

before(function(done) {
  server = app.listen(port, done);
});

after(function(done) {
  server.close(done);
});

describe('home', function() {
  it('renders the home page', function(done) {

    request({
      uri: url('/'),
      method: 'GET'
    }, function(err, res, body) {
      expect(res.statusCode).to.equal(200);
      expect(body).to.contain('ConcatJS');
      done();
    });

  });
});

describe('GET /.+ (libraries)', function() {

  it('returns one library', function(done) {
    testLibraries('array-map', done);
  });

  it('returns two libraries', function(done) {
    testLibraries('array-map+array-reduce', done);
  });

  it('returns an error if one library is not specified', function(done) {

    var query = 'array-map+array-reduce+stimpyjcat';

    request.get(url('/'+query), function(err, res, body) {
      if (err) console.log(err);

      var libraries = query.split('+').sort();

      expect(res.statusCode).to.equal(404);
      expect(res.headers['content-type']).to.contain('application/javascript');
      expect(body).to.contain('Module stimpyjcat was not found.');

      done();
    });

  });

});

var testLibraries = function(libraryStr, callback) {

  request.get(url('/'+libraryStr), function(err, res, body) {
    if (err) console.log(err);

    var libraries = libraryStr.split('+').sort();

    expect(res.statusCode).to.equal(200);
    expect(res.headers['content-type']).to.contain('application/javascript');

    var b = browserify();
    libraries.forEach(function(libName) {
      b.require(libName);
    });

    b.bundle({}, function(err, src) {
      expect(body).to.equal(src);

      callback();
    });
  });

};
