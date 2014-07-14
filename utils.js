var utils = module.exports = {};
var browserify = require('browserify');
var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');

utils.moduleInstalled = function(name) {
  return fs.existsSync('./node_modules/'+name);
};

utils.removeModuleDir = function(name) {
  return rimraf.sync('./node_modules/' + name);
};

utils.installLibrary = function(name, callback) {
  var npm = require('npm');

  npm.load(null, function(err, npm) {
    npm.install(name, function() {
      if (typeof callback == 'function') {
        callback();
      }
    });
  });
};

utils.uninstallLibrary = function(name, callback) {
  var npm = require('npm');

  npm.load(null, function(err, npm) {
    npm.uninstall(name, function() {
      utils.removeModuleDir(name);
      if (typeof callback == 'function') {
        callback();
      }
    });
  });
};

utils.bundle = function(libraries, callback) {

  var b = browserify();
  libraries.forEach(function(libName) {
    b.require(libName);
  });

  b.bundle({}, function(err, src) {
    if (err) console.error(err);

    callback(src);
  });
};
