var utils = require('../utils');
var expect = require('expect.js');
var browserify = require('browserify');

describe('utils', function() {

  describe('moduleInstalled', function() {

    it('should detect an installed module', function() {
      var exists = utils.moduleInstalled('mocha');
      expect(exists).to.be(true);
    });

    it('should report an non-installed module', function() {
      var exists = utils.moduleInstalled('bogusbogus');
      expect(exists).to.be(false);
    });

  });

  describe('installLibrary', function() {

    before(function(done) {
      utils.uninstallLibrary('archy', done);
    });

    it('should successfully install a library', function(done) {
      utils.installLibrary('archy', function() {
        var exists = utils.moduleInstalled('archy');
        expect(exists).to.be(true);
        done();
      });
    });

  });

  describe('uninstallLibrary', function() {

    before(function(done) {
      utils.installLibrary('archy', done);
    });

    it('should successfully uninstall a library', function(done) {
      utils.uninstallLibrary('archy', function() {
        var exists = utils.moduleInstalled('archy');
        expect(exists).to.be(false);
        done();
      });
    });

  });

  describe('bundle', function() {
    it('successfully bundles a few packages', function(done) {

      var libraries = [
        'array-map',
        'array-reduce'
      ];

      var b = browserify();
      libraries.forEach(function(libName) {
        b.require(libName);
      });

      utils.bundle(libraries, function(utilsBundledStr) {

        b.bundle({}, function(err, bundledStr) {
          if (err) console.error(err);

          expect(utilsBundledStr).to.equal(bundledStr);
          done();
        });

      });

    });
  });

});
