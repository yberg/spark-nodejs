var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/:thr', function(req, res, next) {
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: 'http://localhost:8090/jobs?appName=sql&classPath=spark.jobserver.CassandraQuery&context=cassandra-context&sync=true',
    body: "query=\"SELECT * FROM reddit.comments WHERE link_id = '" + req.params.thr + "'\""
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.render('thread', {
        results: JSON.parse(body).result
      });
    };
  });
});

module.exports = router;
