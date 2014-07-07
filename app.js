var express = require('express');
var fs = require('fs');
var app = module.exports = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('*', function (req, res) {
  res.header("Content-Type", "application/javascript");
  var text = fs.readFileSync('./test.js');
  res.send(text);
});
