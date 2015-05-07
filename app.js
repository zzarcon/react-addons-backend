var restify = require('restify');
var npm = require("npm");
var searchTerms = ["react"];
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
var PORT = 8080;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.fullResponse());

server.get('/packages', function (req, res, next) {
  // var url = req.params.url;
  npm.load({
    dev: true
  }, function() {
    npm.commands.search(searchTerms, true, function(_, response) {      
      var addons = [];

      for (var prop in response) {
        addons.push(response[prop]);
      }

      res.send({
        addons: addons
      });
    });
  });
});

server.listen(PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});