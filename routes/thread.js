var express = require('express');
var router = express.Router();
var request = require('request');

var globals = require('../globals');

/* GET home page. */
router.get('/:thr', function(req, res, next) {
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: 'http://' + globals.ip + ':8090/jobs?appName=sql&classPath=spark.jobserver.GetComments&context=cassandra-context&sync=true',
    body: "link_id=" + req.params.thr
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('thread', {
        results: JSON.parse(body).result,
        thread: req.params.thr
      });
    };
  });
});

module.exports = router;
