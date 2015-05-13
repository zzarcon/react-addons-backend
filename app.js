var restify = require('restify');
var npm = require("npm");
var searchTerms = ["react"];
var server = restify.createServer({
  name: 'react-addons',
  version: '1.0.0'
});
var PORT = process.env.PORT || 8080;
var cache = null;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.fullResponse());

server.get('/packages', function (req, res, next) {
  npm.load({
    dev: true
  }, function() {
    if (cache) {
      res.send({packages: cache});
      return;
    }

    npm.commands.search(searchTerms, true, function(_, response) {
      var addons = [];

      for (var prop in response) {
        addons.push(response[prop]);
      }

      cache = addons;
      res.send({packages: addons});
    });
  });
});

server.listen(PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});