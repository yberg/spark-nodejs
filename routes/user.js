var express = require('express');
var router = express.Router();
var request = require('request');

var globals = require('../globals');

/* GET home page. */
router.get('/:usr', function(req, res, next) {
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: 'http://' + globals.ip + ':8090/jobs?appName=sql&classPath=spark.jobserver.GetUser&context=cassandra-context&sync=true',
    body: "author=" + req.params.usr
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('user', {
        results: JSON.parse(body).result,
        user: req.params.usr
      });
    };
  });
});

module.exports = router;
