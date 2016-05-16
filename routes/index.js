var express = require('express');
var router = express.Router();
var request = require('request');
var cassandra = require('cassandra-driver');

var globals = require('../globals');

var client = new cassandra.Client({contactPoints: ['192.168.0.109']}); // ip here if not localhost
client.connect(function(err, res) {
  console.log('index: cassandra connected');
});

/* GET home page. */
router.get('/s', function(req, res, next) {
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: 'http://' + globals.ip + ':8090/jobs?appName=sql&classPath=spark.jobserver.GetSubreddits&context=cassandra-context&sync=true',
    body: ""
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('index', {
        results: JSON.parse(body).result
      });
    };
  });
});

router.get('/q', function(req, res, next) {
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: 'http://' + globals.ip + ':8090/jobs?appName=sql&classPath=spark.jobserver.GetSubredditsDistinct&context=cassandra-context&sync=true',
    body: ""
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('index', {
        results: JSON.parse(body).result
      });
    };
  });
});

router.get('/', function(req, res, next) {
  var query = "SELECT DISTINCT subreddit FROM reddit.comments";
  console.log(req.query.search);
  if (req.query.search !== undefined && req.query.search !== "")
    query += " WHERE subreddit = '" + req.query.search + "'";
  client.execute(query, [], function(err, result) {
    //var end = now();
    //var time = (end-start).toFixed(1);
    res.render('index', {
      results: result.rows
    });
  });
});

module.exports = router;
