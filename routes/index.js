var express = require('express');
var router = express.Router();

var status_log = [];

/* GET apiStatus page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

module.exports = router;
