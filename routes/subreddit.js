var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/:sub', function(req, res, next) {
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: 'http://localhost:8090/jobs?appName=sql&classPath=spark.jobserver.GetThreads&context=cassandra-context&sync=true',
    body: ""
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('subreddit', {
        results: JSON.parse(body).result
      });
    };
  });
});

module.exports = router;
