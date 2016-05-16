var express = require('express');
var router = express.Router();
var request = require('request');

var globals = require('../globals');

/* GET home page. */
router.get('/:sub', function(req, res, next) {
  var body = "subreddit=" + req.params.sub;
  if (req.query.page !== undefined)
    body += ",page=" + req.query.page;
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: 'http://' + globals.ip + ':8090/jobs?appName=sql&classPath=spark.jobserver.GetThreads&context=cassandra-context&sync=true',
    body: body
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('subreddit', {
        results: JSON.parse(body).result,
        subreddit: req.params.sub
      });
    };
  });
});

module.exports = router;
