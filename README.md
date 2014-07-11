# CatJS

A CDN that serves all your libraries in one file.

a.k.a Browserify-as-a-service

So much time is spent during development installing and building external libraries like Angular or React. Using CatJS means you're only building your application's code, meaning dev time is faster and you don't have to worry about serving large JS files full of library code.

Right now only libraries on NPM are available. The next step is to add GitHub repo names.

## TODO

- [ ] Get caching back up and operational
- [ ] Allow version selection
- [ ] Get HTTPS working
- [ ] Allow sources other than npm

## Usage

Just specify what dependencies you want in a `+` separated URL.

```html
<script src="http://cdn.catjs.org/jquery+angular+underscore"></script>
<script>
var angular = require('angular');
var $ = require('jquery');
var _ = require('underscore');

var app = angular.module('app', []);

app.controller('QuesadillaCtrl', function() {
...
</script>
```

## Run it locally

```bash
git clone git@github.com:jeffcarp/catjs.git
npm install
npm start
```

Run those tests

```bash
npm start
```
