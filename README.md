# Party Wave

A CDN that serves all your libraries in one file.

a.k.a Browserify-as-a-service

So much time is spent during development installing and building external libraries like Angular or React. Using Party Wave means you're only building your application's code, meaning dev time is faster and you don't have to worry about serving large JS files full of library code.

Right now only libraries on NPM are available. The next step might be to add GitHub repo names or Bower names.

## TODO

- [x] Get caching back up and operational
- [ ] Deploy to cdn.partywavejs.org
- [ ] Allow version selection
- [ ] Get HTTPS working
- [ ] Allow sources other than npm

## Usage

Just specify what dependencies you want in a `+` separated URL.

```html
<script src="http://cdn.partywavejs.org/jquery+angular+underscore"></script>
<script>
var angular = require('angular');
var $ = require('jquery');
var _ = require('underscore');

var app = angular.module('app', []);

app.controller('QuesadillaCtrl', function() {
...
</script>
```

Hey look another example

```html
<html>
  <head>
  </head>
  <body>

    <h1>Welcome</h1>

    <div id="container"></div>

    <script src="http://localhost:3000/react"></script>
    <script>

    var React = require('react');

    var Tweets = React.createClass({
      render: function() {
        return React.DOM.div(null, 'why hello there');
      }
    });

    var container = document.getElementById('container');
    React.renderComponent(Tweets(), container);

    </script>
  </body>
</html>
```

## Run it locally

```bash
git clone git@github.com:jeffcarp/partywave.git
npm install
npm start
```

Run those tests

```bash
npm test 
```
