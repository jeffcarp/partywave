var app = require('../app');
var expect = require('expect.js');
var request = require('superagent');

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

describe('GET /', function() {
  it('does stuff', function(done) {
    request.get(url('/')).end(function(res) {

      expect(res.status).to.equal(200);
      expect(res.text).to.contain('ConcatJS');

      done();
    });
  });
});
