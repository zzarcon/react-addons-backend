var restify = require('restify');
var npm = require("npm");
var fs = require('fs');
var server = restify.createServer({
  name: 'react-addons',
  version: '1.0.0'
});
var PORT = process.env.PORT ||  8080;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.fullResponse());

server.get('/packages', function(req, res, next) {
  // fetchPackages(res);
  getPackages(res);
});

server.get('/test', function(req, res, next) {
  res.send({test: "This is a test response"});
});

server.listen(PORT, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function getPackages(res) {
  var file = __dirname + '/react-packages.json';

  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }

    data = JSON.parse(data);

    res.send(data);
  });

}

function fetchPackages(res) {
  var searchTerms = ["react-component"];
  var cache = null;

  if (cache) {
    res.send({packages: cache});
    return;
  }

  npm.load({
    dev: false
  }, function() {
    npm.commands.search(searchTerms, true, false, function(_, response) {
      var addons = [];

      for (var prop in response) {
        addons.push(response[prop]);
      }

      cache = addons;
      res.send({packages: addons});
    });
  });
}